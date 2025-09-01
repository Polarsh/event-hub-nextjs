/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@/i18n/navigation'

import {
  createEvent,
  delEvent,
  getEventData,
  updateEvent,
} from '@/services/EventServices'
import type { EventDataProps } from '@/types/Event'

// Define las claves de consulta para el cacheo
const QUERY_KEYS = {
  eventDetail: (id: any) => ['event-detail', id],
  eventsList: ['events'],
}

// Asume que eventMockValues es un objeto que representa un evento
export const eventMockValues = {
  // ... propiedades del evento mock
  id: '',
  title: '',
  summary: '',
  description: '',
  imageUrl: 'https://picsum.photos/1000/600',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // URL de ejemplo
  date: new Date('2025-09-01T09:00:00Z'),
  category: '',
  restriction: '',
}

export default function useEventManagement({ id }: { id?: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  // --- Consulta de datos (se activa solo si hay un ID) ---
  const {
    data: eventDetail,
    isPending: isGetting,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.eventDetail(id),
    queryFn: async () => {
      return await getEventData(id!)
    },
    enabled: !!id,
  })

  // --- 2. Crear un nuevo evento (useMutation) ---
  const { mutateAsync: addEvent, isPending: isCreating } = useMutation<
    string,
    unknown,
    EventDataProps
  >({
    mutationFn: async rawEventData => {
      return await createEvent(rawEventData)
    },
    onSuccess: id => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.eventsList })
      router.push(`/account/events/${id}/detail`)
    },
    onError: error => {
      console.log(error)
      // handleApiError(error, 'Error al crear el evento.')
    },
  })

  // --- 3. Editar un evento existente (useMutation) ---
  const { mutateAsync: editEvent, isPending: isEditing } = useMutation<
    string,
    unknown,
    { id: string; updatedData: EventDataProps }
  >({
    mutationFn: async ({ id, updatedData }) => {
      return await updateEvent(id, updatedData)
    },
    onSuccess: id => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.eventDetail(id),
      })
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.eventsList })
      router.push(`/account/events/${id}/detail`)
    },
    onError: error => {
      console.log(error)
      // handleApiError(error, 'Error al actualizar el evento.')
    },
  })

  // --- 4. Eliminar un evento (useMutation) ---
  const { mutateAsync: deleteEvent, isPending: isDeleting } = useMutation<
    boolean,
    unknown,
    string
  >({
    mutationFn: async id => {
      return await delEvent(id)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.eventsList })
      router.push(`/account/events`)
    },
    onError: error => {
      console.log(error)
      // handleApiError(error, 'Error al eliminar el evento.')
    },
  })

  const isLoading = isGetting || isCreating || isEditing || isDeleting

  return {
    eventDetail,
    addEvent,
    editEvent,
    deleteEvent,
    isLoading,
    isError,
  }
}
