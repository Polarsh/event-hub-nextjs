'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchFilteredEvents, getEventDetail } from '@/services/EventServices'
import type { Event } from '@/types/Event'
import { useParams } from 'next/navigation'

export default function useEvent({ filters }: any) {
  const { id } = useParams()

  // Consulta 1: Obtiene el detalle de un evento
  const {
    data: eventDetail,
    isPending: isPendingEventDetail,
    isError: isErrorEventDetail,
    error: errorEventDetail,
  } = useQuery({
    queryKey: ['event-detail', id],
    queryFn: async () => {
      const eventId = id as string

      return await getEventDetail(eventId)
    },
    enabled: !!id,
  })

  // Consulta 2: Obtiene la lista de eventos
  const {
    data: eventList,
    isPending: isPendingEventList,
    isError: isErrorEventList,
    error: errorEventList,
  } = useQuery<Event[]>({
    queryKey: ['event-list', filters],
    queryFn: async () => {
      return await fetchFilteredEvents(filters)
    },
  })

  return {
    eventDetail,
    isPendingEventDetail,
    isErrorEventDetail,
    errorEventDetail,
    eventList: eventList ?? [],
    isPendingEventList,
    isErrorEventList,
    errorEventList,
  }
}
