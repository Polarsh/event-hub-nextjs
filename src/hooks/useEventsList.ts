'use client'

import { useQuery } from '@tanstack/react-query'

import { useAuthenticator } from '@/context/AuthenticatorContext'
import { fetchMyEvents } from '@/services/EventServices'
import type { Event } from '@/types/Event'

export default function useEventsList() {
  const { currentUser } = useAuthenticator()

  // Consulta 1: Obtiene la lista de todos los eventos
  /* const {
    data: events,
    isPending: isPendingEvents,
    isError: isErrorEvents,
    error: errorEvents,
  } = useQuery<EventDataProps[]>({
    queryKey: ['events-list'],
    queryFn: fetchAllEvents,
  }) */

  // Consulta 2: Obtiene la lista de eventos del usuario
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
    /*  events,
    isPendingEvents,
    isErrorEvents,
    errorEvents, */
    myEvents: myEvents ?? [],
    isPendingMyEvents,
    isErrorMyEvents,
    errorMyEvents,
  }
}
