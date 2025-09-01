'use client'

import { useQuery } from '@tanstack/react-query'

import { useAuthenticator } from '@/context/AuthenticatorContext'
import { fetchMyEvents, getEventDetail } from '@/services/EventServices'
import type { Event } from '@/types/Event'
import { useParams } from 'next/navigation'

export default function useEventView() {
  const { currentUser } = useAuthenticator()

  const { id } = useParams()

  // Consulta 1: Obtiene el detalle de un evento
  const {
    data: myEventDetail,
    isPending: isPendingMyEventDetail,
    isError: isErrorMyEventDetail,
    error: errorMyEventDetail,
  } = useQuery({
    queryKey: ['my-event-detail', id],
    queryFn: async () => {
      const eventId = id as string

      return await getEventDetail(eventId)
    },
    enabled: !!id,
  })

  // Consulta 2: Obtiene la lista de eventos del usuario logueado
  const {
    data: myEvents,
    isPending: isPendingMyEvents,
    isError: isErrorMyEvents,
    error: errorMyEvents,
  } = useQuery<Event[]>({
    queryKey: ['my-events-list'],
    queryFn: fetchMyEvents,
    enabled: !!currentUser,
  })

  return {
    myEvent: myEventDetail,
    isPendingMyEventDetail,
    isErrorMyEventDetail,
    errorMyEventDetail,
    myEvents: myEvents ?? [],
    isPendingMyEvents,
    isErrorMyEvents,
    errorMyEvents,
  }
}
