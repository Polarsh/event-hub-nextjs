'use client'

import React from 'react'

import Page from '@/components/common/Page'
import EventsGrid from '@/components/event/EventGrid'
import useEvent from '@/hooks/useEvent'

export default function EventHome() {
  const { eventList, isPendingEventList } = useEvent()

  return (
    <Page>
      <h1 className='sr-only hidden'>Eventos</h1>
      <EventsGrid
        title={'Buscar'}
        events={eventList}
        isLoading={isPendingEventList}
      />
    </Page>
  )
}
