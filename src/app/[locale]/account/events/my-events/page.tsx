'use client'

import React from 'react'

import EventsGrid from '@/components/event/EventGrid'
import useEventView from '@/hooks/useEventView'

export default function MyEvents() {
  const { myEvents, isPendingMyEvents } = useEventView()

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
