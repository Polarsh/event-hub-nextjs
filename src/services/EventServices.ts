import type { Event, EventDataProps } from '@/types/Event'
import { formatEvent } from '@/utils/formatters/event'
import httpHelper from '@/utils/httpHelper'

// Función para obtener los detalles de un evento por ID
export const getEventData = async (id: string): Promise<EventDataProps> => {
  const data = await httpHelper.get(`/events/${id}`)

  const eventData = {
    id: data._id,
    title: data.title,
    summary: data.summary,
    description: data.summary,
    videoUrl: data.videoUrl,
    imageUrl: data.imageUrl,
    date: new Date(data.date),
    category: data.category._id,
    restriction: data.restriction._id,
  }

  return eventData
}

export const getEventDetail = async (id: string): Promise<Event> => {
  const data = await httpHelper.get(`/events/${id}`)

  return formatEvent(data)
}

// Función para crear un nuevo evento
// La API debe retornar el ID del evento creado
export const createEvent = async (
  eventData: EventDataProps
): Promise<string> => {
  const data = await httpHelper.post('/events', eventData)
  return data.id
}

// Función para actualizar un evento existente
// La API debe retornar el ID del evento actualizado
export const updateEvent = async (
  id: string,
  updatedData: EventDataProps
): Promise<string> => {
  const data = await httpHelper.put(`/events/${id}`, updatedData)
  return data.id
}

// Función para eliminar un evento por ID
export const delEvent = async (id: string): Promise<boolean> => {
  const data = await httpHelper.del(`/events/${id}`)
  return data.success
}

// Función para obtener la lista de eventos desde tu API
export const fetchAllEvents = async (): Promise<Event[]> => {
  const rawData = await httpHelper.get('/events')

  const events = rawData?.map((event: any) => formatEvent(event))

  return events
}

// Función para obtener la lista de eventos filtrado
export const fetchFilteredEvents = async (filters: any): Promise<Event[]> => {
  const rawData = await httpHelper.post('/events/filtered', filters)

  const events = rawData?.map((event: any) => formatEvent(event))

  return events
}

// Función para obtener la lista de eventos desde tu API
export const fetchEventSummary = async (): Promise<{
  latestCreated: Event[]
  upcomingEvents: Event[]
  mostAttended: Event[]
}> => {
  const rawData = await httpHelper.get('/events/summary')

  // Mapea y formatea los eventos recientes
  const latestCreated = rawData?.latestCreated?.map((event: any) =>
    formatEvent(event)
  )

  // Mapea y formatea los eventos próximos
  const upcomingEvents = rawData?.upcomingEvents?.map((event: any) =>
    formatEvent(event)
  )

  // Mapea y formatea los eventos próximos
  const mostAttended = rawData?.mostAttended?.map((event: any) =>
    formatEvent(event)
  )

  // Devuelve el objeto con los dos arrays ya formateados
  return { latestCreated, upcomingEvents, mostAttended }
}

// Función para obtener los eventos del usuario
export const fetchMyEvents = async (): Promise<Event[]> => {
  const rawData = await httpHelper.get('/events/my-events')

  const events = rawData?.map((event: any) => formatEvent(event))

  return events
}

// Función para obtener los eventos del usuario
export const fetchAttendingEvents = async (): Promise<Event[]> => {
  const rawData = await httpHelper.get('/events/attendances')

  const events = rawData?.map((event: any) => formatEvent(event))

  return events
}
