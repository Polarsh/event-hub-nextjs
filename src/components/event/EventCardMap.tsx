'use client'

import EventActionsCard from './EventActionsCard'

import type { Event } from '@/types/Event'
import AttendButton from './EventAttendButton'
import dynamic from 'next/dynamic'

const EventMap = dynamic(async () => await import('./EventMap'), { ssr: false })

export default function EventCardMap({ event }: { event: Event }) {
  const location = 'Auditorio Principal'
  const latitude = '-12.045834647353233'
  const longitude = ' -77.03053815091477'

  return (
    <div className='rounded-xl border border-strokeColor/60 p-4 bg-backgroundColor/60 space-y-4'>
      <h3 className='text-titleColor font-semibold mb-2'>Ubicación</h3>

      <p className='text-sm text-textColor'>
        {location}
        <br />
      </p>

      <EventMap latitude={latitude} longitude={longitude} location={location} />

      <EventActionsCard
        eventId={event.id}
        eventName={event.title}
        eventStats={{ attendees: 0, likes: 0, shares: 0 }}
      />

      {/* Botón de asistencia junto con la información del organizador */}
      <AttendButton eventId={event.id} />
    </div>
  )
}
