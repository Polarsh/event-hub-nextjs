import type { Event } from '@/types/Event'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatEvent = (eventData: any): Event => {
  const {
    _id,
    title,
    category,
    restriction,
    summary,
    description,
    videoUrl,
    imageUrl,
    date,
    creator,
  } = eventData

  const formattedDate = format(date, "dd 'de' MMMM 'de' yyyy", { locale: es })

  return {
    id: _id,
    title,
    summary,
    description,
    videoUrl,
    imageUrl,
    date: formattedDate,
    user: creator.username,
    category: category.text,
    restriction: restriction.text,
  }
}
