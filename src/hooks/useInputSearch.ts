import { useState, useEffect, useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const DEBOUNCE_TIME = 500 // milisegundos
const SEARCH_INPUT_KEY = ['searchInput'] // La clave única para guardar en la caché

export const useInputSearch = () => {
  const queryClient = useQueryClient()

  // 1. Usa useQuery para leer el valor actual de la caché
  const { data: cachedSearchQuery = '' } = useQuery<string>({
    queryKey: SEARCH_INPUT_KEY,
    queryFn: async () =>
      await (queryClient.getQueryData(SEARCH_INPUT_KEY) ?? ''), // Lee de la caché, o devuelve un valor por defecto
    staleTime: Infinity, // El valor de la caché nunca se considera "stale"
  })

  // 2. Estado local para el valor del input, se actualiza en cada tecla
  const [inputSearch, setInputSearch] = useState<string>(cachedSearchQuery)

  // 3. Efecto para sincronizar el estado local con la caché, con debouncing
  useEffect(() => {
    // Si el input está vacío, limpiamos la caché inmediatamente
    if (inputSearch === '') {
      queryClient.setQueryData(SEARCH_INPUT_KEY, '')
      return
    }

    const handler = setTimeout(() => {
      // Actualiza la caché de Tanstack Query con el valor debounceado
      queryClient.setQueryData(SEARCH_INPUT_KEY, inputSearch)
    }, DEBOUNCE_TIME)

    // Función de limpieza
    return () => {
      clearTimeout(handler)
    }
  }, [inputSearch, queryClient])

  // Funciones para manejar el input
  const onChangeInput = useCallback((e: any) => {
    setInputSearch(e.target.value)
  }, [])

  const clearInput = useCallback(() => {
    setInputSearch('')
    queryClient.setQueryData(SEARCH_INPUT_KEY, '')
  }, [queryClient])

  return {
    inputSearch, // El valor inmediato para el input de la UI
    searchQuery: cachedSearchQuery, // El valor debounceado, leído de la caché
    onChangeInput,
    clearInput,
  }
}
