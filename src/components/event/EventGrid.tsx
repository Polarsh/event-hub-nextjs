import LoadingCircle from '../common/Loaders/LoadingCircle'
import EventCard from './EventCard'

import type { Event } from '@/types/Event'

type EventsGridProps = {
  title: string
  events: Event[]
  isLoading: boolean
  isEditMode?: boolean
}

export default function EventsGrid({
  title,
  events,
  isLoading,
  isEditMode = false,
}: EventsGridProps) {
  return (
    <div className='space-y-6 '>
      <h2 className='text-h2'>{title}</h2>

      {isLoading ? (
        <LoadingCircle />
      ) : (
        <div className=' grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6'>
          {events?.map(event => (
            <EventCard key={event.id} event={event} isEditMode={isEditMode} />
          ))}
        </div>
      )}
    </div>
  )
}
