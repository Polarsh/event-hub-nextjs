'use client'

import Card from '../common/Card'
import EventActionsCard from './EventActionsCard'

import type { Event } from '@/types/Event'
import AttendButton from './EventAttendButton'
import dynamic from 'next/dynamic'

const EventMap = dynamic(async () => await import('./EventMap'), { ssr: false })

export default function EventCardMap({ event }: { event: Event }) {
  const { location, latitude, longitude } = event

  return (
    <Card className='w-full space-y-6 bg-backgroundColorLight lg:p-6 shadow-lg'>
      <div className='text-center'>
        <p className='text-link text-textColor'>{location}</p>
        <p className='text-body text-textColor mt-1'>{event.date}</p>
      </div>

      <EventMap latitude={latitude} longitude={longitude} location={location} />

      <EventActionsCard
        eventId={event.id}
        eventName={event.name}
        eventStats={{ attendees: 0, likes: 0, shares: 0 }}
      />

      {/* Botón de asistencia junto con la información del organizador */}
      <AttendButton eventId={event.id} />
    </Card>
  )
}
