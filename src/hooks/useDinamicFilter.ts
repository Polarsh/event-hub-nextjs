/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useState, useCallback, useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Shield, Tag } from 'lucide-react'

// Interfaces de tipos
interface Child {
  id: string
  name: string
}

interface FilterOption {
  id: 'categories' | 'restrictions'
  icon: React.ElementType
  name: string
  children: Child[]
}

interface ActiveFilter {
  id: 'categories' | 'restrictions'
  children: Array<{ id: string }>
}

interface SortOption {
  label: string
  value: string
  type: string
}

// Opciones de orden (sort)
const sortOptions: SortOption[] = [
  {
    label: 'Alfabético (A-Z)',
    value: JSON.stringify({ alphabetical: 'asc' }),
    type: 'alphabetical',
  },
  {
    label: 'Alfabético (Z-A)',
    value: JSON.stringify({ alphabetical: 'desc' }),
    type: 'alphabetical',
  },
  {
    label: 'Próximos (más cercanos)',
    value: JSON.stringify({ date: 'oldest' }),
    type: 'date',
  },
  {
    label: 'Futuros (más lejanos)',
    value: JSON.stringify({ date: 'latest' }),
    type: 'date',
  },
]

// Función para obtener los filtros de la API y unificarlos
const fetchFilterOptions = async () => {
  const response = await fetch('/api/filters')
  if (!response.ok) {
    throw new Error('Error al obtener los filtros de la API')
  }
  const data = await response.json()
  return {
    categories: data.categories as Child[],
    restrictions: data.restrictions as Child[],
  }
}

export const useDynamicFilters = () => {
  // Obtener los datos de la API
  const { data: filterOptions, isLoading } = useQuery<FilterOption[]>({
    queryKey: ['dynamic-filters'],
    queryFn: async () => {
      const rawData = await fetchFilterOptions()

      // Formatear los datos de la API en el formato de array que necesitas
      const formattedFilters = [
        {
          id: 'categories',
          icon: Tag,
          name: 'Categorías',
          children: rawData.categories,
        },
        {
          id: 'restrictions',
          icon: Shield,
          name: 'Restricciones',
          children: rawData.restrictions,
        },
      ]

      return formattedFilters as FilterOption[]
    },
  })

  // Estado para los filtros activos
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])
  const [activeSorts, setActiveSorts] = useState<SortOption[]>([])

  // Formatear los filtros para el backend
  const formattedFiltersQuery = useMemo(() => {
    // Extraer los ids de los children de las categorías y restricciones activas
    const categories =
      activeFilters.find(f => f.id === 'categories')?.children.map(c => c.id) ??
      []
    const restrictions =
      activeFilters
        .find(f => f.id === 'restrictions')
        ?.children.map(c => c.id) ?? []

    // Combinar las opciones de ordenamiento en un solo objeto
    const sort = activeSorts.reduce((acc, currentSort) => {
      return { ...acc, ...JSON.parse(currentSort.value) }
    }, {})

    // Si no hay filtros activos ni orden, devuelve un objeto vacío
    if (
      categories.length === 0 &&
      restrictions.length === 0 &&
      Object.keys(sort).length === 0
    ) {
      return {}
    }

    return {
      categories,
      restrictions,
      sort: Object.keys(sort).length > 0 ? sort : null,
    }
  }, [activeFilters, activeSorts])

  // Estado y efecto para el debouncing
  const [debouncedFilters, setDebouncedFilters] = useState(
    formattedFiltersQuery
  )

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(formattedFiltersQuery)
    }, 500) // 500 milisegundos = 0.5 segundos

    return () => {
      clearTimeout(handler)
    }
  }, [formattedFiltersQuery])

  // Manejador de cambio de filtros (categorías o restricciones)
  const handleFilterChange = useCallback(
    (filterId: 'categories' | 'restrictions', childrenId: string | null) => {
      setActiveFilters(prevFilters => {
        // Si childrenId es null, significa que queremos alternar toda la categoría
        if (childrenId === null) {
          // 1. Busca la categoría en la lista de filtros iniciales.
          const categoryInInitialFilters = filterOptions?.find(
            f => f.id === filterId
          )

          if (categoryInInitialFilters) {
            // 2. Mapea todos los hijos de la categoría para crear el nuevo objeto de filtro.
            const newCategory = {
              id: categoryInInitialFilters.id,
              children: categoryInInitialFilters.children.map(child => ({
                id: child.id,
              })),
            }
            // 3. Devuelve un nuevo array que contiene ÚNICAMENTE la categoría seleccionada.
            return [newCategory]
          }
          // Si la categoría no se encuentra, no hagas nada.
          return prevFilters
        }

        const existingCategory = prevFilters.find(f => f.id === filterId)

        if (existingCategory) {
          const newFilters = prevFilters
            .map(f => {
              if (f.id === filterId) {
                const childExists = f.children.find(c => c.id === childrenId)

                if (childExists) {
                  const newChildren = f.children.filter(
                    c => c.id !== childrenId
                  )
                  if (newChildren.length === 0) {
                    return null
                  }
                  return { ...f, children: newChildren }
                } else {
                  return {
                    ...f,
                    children: [...f.children, { id: childrenId }],
                  }
                }
              }
              return f
            })
            .filter(Boolean) as ActiveFilter[]

          return newFilters
        } else {
          return [
            ...prevFilters,
            {
              id: filterId,
              children: [{ id: childrenId }],
            },
          ]
        }
      })
    },
    []
  )

  // Manejador de cambio de orden (un solo valor a la vez)
  const handleSortChange = useCallback((value: string) => {
    const newSortItem = sortOptions.find(option => option.value === value)
    if (!newSortItem) return

    setActiveSorts(prevSorts => {
      // Check if the new selection is already in the array
      const isAlreadyActive = prevSorts.some(sort => sort.value === value)
      if (isAlreadyActive) {
        // Remove the item if it's already active (toggle off)
        return prevSorts.filter(sort => sort.value !== value)
      }

      let newSorts = [...prevSorts]

      // Replace existing sort of the same type
      newSorts = newSorts.filter(sort => sort.type !== newSortItem.type)

      // Add the new item
      newSorts.push(newSortItem)

      return newSorts
    })
  }, [])

  // Función para limpiar todos los filtros y orden
  const clearFilters = useCallback(() => {
    setActiveFilters([])
    setActiveSorts([])
  }, [])

  // Verificador de filtros activos
  const isFilterActive = useCallback(
    (filterId: 'categories' | 'restrictions', childrenId: string | null) => {
      const category = activeFilters.find(f => f.id === filterId)
      return category
        ? childrenId === null
          ? category.children.length ===
            filterOptions?.find(f => f.id === filterId)?.children.length
          : category.children.some(c => c.id === childrenId)
        : false
    },
    [activeFilters, filterOptions]
  )

  // Verificador de orden activo
  const isSortActive = useCallback(
    (value: string) => activeSorts.some(sort => sort.value === value),
    [activeSorts]
  )

  return {
    filterOptions,
    sortOptions,
    activeFilters,
    activeSorts,
    handleFilterChange,
    handleSortChange,
    clearFilters,
    isFilterActive,
    isSortActive,
    isLoading,
    debouncedFilters,
  }
}
