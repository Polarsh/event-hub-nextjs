'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchEventSummary } from '@/services/EventServices'

export default function useEventSummary() {
  const { data: events, isPending } = useQuery({
    queryKey: ['event-summary'],
    queryFn: async () => {
      return await fetchEventSummary()
    },
  })

  return {
    lastestEvent: events?.latestCreated ?? [],
    upcomingEvents: events?.upcomingEvents ?? [],
    mostAttended: events?.mostAttended ?? [],
    isPending,
  }
}
