import EventCard from './EventCard'

import type { Event } from '@/types/Event'

type EventsGridProps = {
  title: string
  events: Event[]
}

export default function EventsGrid({ title, events }: EventsGridProps) {
  return (
    <div className='space-y-6 '>
      <h2 className='text-h2'>{title}</h2>

      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
