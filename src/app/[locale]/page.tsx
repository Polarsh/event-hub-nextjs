'use client'

import React from 'react'

import EventsGrid from '@/components/event/EventGrid'
import Page from '@/components/common/Page'

import useEvent from '@/hooks/useEvent'

export default function EventHome() {
  const { eventList, isPendingEventList } = useEvent()

  return (
    <Page>
      <h1 className='sr-only hidden'>Eventos</h1>

      <EventsGrid
        title={'Eventos destacados'}
        events={eventList.slice(0, 3)}
        isLoading={isPendingEventList}
      />
      <EventsGrid
        title={'Ultimos eventos'}
        events={eventList.slice(0, 6)}
        isLoading={isPendingEventList}
      />
    </Page>
  )
}
