// Este es usado para mostrar informacion
export type Event = {
  id: string
  user: string
  title: string
  category: string
  summary: string
  description: string
  videoUrl: string
  imageUrl: string
  date: string
  restriction: string
}

// Este es para el modo creación y edición
export type EventDataProps = {
  _id?: string
  title: string
  category: string
  summary: string
  description: string
  videoUrl: string
  imageUrl: string
  date: Date
  restriction: string
}
