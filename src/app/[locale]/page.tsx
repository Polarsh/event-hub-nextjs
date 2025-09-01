'use client'

import React from 'react'

import EventsGrid from '@/components/event/EventGrid'
import Page from '@/components/common/Page'

import useEventSummary from '@/hooks/useEventSummary'

export default function Home() {
  const { lastestEvent, upcomingEvents, isPending } = useEventSummary()

  return (
    <Page>
      <h1 className='sr-only hidden'>Eventos</h1>

      <EventsGrid
        title={'Recien creados'}
        events={lastestEvent}
        isLoading={isPending}
      />

      <EventsGrid
        title={'Próximos eventos'}
        events={upcomingEvents}
        isLoading={isPending}
      />
    </Page>
  )
}
