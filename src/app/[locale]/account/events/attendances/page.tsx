'use client'

import React from 'react'

import EventsGrid from '@/components/event/EventGrid'
import useEventView from '@/hooks/useMyEvent'

export default function MyEvents() {
  const { attendingEvents, isPendingAttendingEvents } = useEventView()

  return (
    <div>
      <EventsGrid
        title='Mis participaciones'
        events={attendingEvents}
        isLoading={isPendingAttendingEvents}
      />
    </div>
  )
}
