'use client'

import EventsGrid from '@/components/event/EventGrid'
import useEventsList from '@/hooks/useEventsList'
import React from 'react'

export default function MyEvents() {
  const { myEvents, isPendingMyEvents } = useEventsList()

  return (
    <div>
      <EventsGrid
        title='Mis eventos'
        events={myEvents}
        isEditMode={true}
        isLoading={isPendingMyEvents}
      />
    </div>
  )
}
