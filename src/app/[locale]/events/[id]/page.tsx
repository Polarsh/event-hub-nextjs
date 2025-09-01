import { formatEvent } from '@/utils/formatters/event'
import type { Event, EventDataProps } from '@/types/Event'
import { ArrowLeft, CalendarDays, ShieldAlert, Tag } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import EventCardMap from '@/components/event/EventCardMap'

// La URL de tu API externa.
// No uses `NEXT_PUBLIC_` aquí porque este código se ejecuta en el servidor.
const API_BASE_URL = process.env.API_URL ?? 'http://localhost:3000/api'

// Define el tipo de los parámetros de la ruta.
interface EventPageProps {
  params: Promise<{ id: string }> // Declara que params es una promesa
}

function getYouTubeId(url?: string) {
  if (!url) return null
  const m = url.match(/(?:v=|be\/|embed\/)([A-Za-z0-9_-]{11})/)
  return m?.[1] ?? null
}

// Este es un componente de servidor asíncrono.
export default async function EventDetailPage({ params }: EventPageProps) {
  const { id } = await params

  if (!id) {
    return <div>ID de evento no proporcionado.</div>
  }

  // Llama a la API externa directamente desde el servidor.
  const res = await fetch(`${API_BASE_URL}/events/${id}`)

  if (!res.ok) {
    // Maneja el error, por ejemplo, mostrando un mensaje o una página 404.
    return <div>Error al cargar el evento.</div>
  }

  // Los datos se obtienen del servidor.
  const rawData: EventDataProps = await res.json()
  const event: Event = formatEvent(rawData)

  const ytId = getYouTubeId((event as any).videoUrl)

  return (
    <main className='mx-auto max-w-6xl px-4 py-8'>
      {/* Volver */}
      <div className='mb-6'>
        <Link
          href='/events'
          className='inline-flex items-center gap-2 text-primaryColor hover:underline'>
          <ArrowLeft className='h-4 w-4' />
          Volver a eventos
        </Link>
      </div>

      {/* Hero */}
      <article className='overflow-hidden rounded-2xl border border-strokeColor/60 bg-backgroundColor shadow-sm'>
        <div className='relative aspect-[16/9] w-full'>
          <Image
            src={event.imageUrl || '/svgs/placeholder.svg'}
            alt={`Banner del evento ${event.title}`}
            fill
            className='object-cover'
            sizes='(max-width: 1024px) 100vw, 1024px'
            priority
          />
          {/* Gradiente para legibilidad */}
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent' />

          {/* Badges arriba */}
          <div className='absolute left-4 right-4 top-4 flex flex-wrap items-center gap-2'>
            {(event as any).category && (
              <span className='inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur px-3 py-1 text-xs font-semibold text-white'>
                <Tag className='h-3.5 w-3.5' />
                {(event as any).category}
              </span>
            )}
            {(event as any).restriction && (
              <span className='inline-flex items-center gap-1 rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white'>
                <ShieldAlert className='h-3.5 w-3.5' />
                {(event as any).restriction}
              </span>
            )}
          </div>

          {/* Fecha pill */}
          <div className='absolute bottom-4 left-4'>
            <span className='inline-flex items-center gap-1.5 rounded-full bg-white/90 text-black backdrop-blur px-3 py-1 text-xs font-semibold shadow'>
              <CalendarDays className='h-3.5 w-3.5' />
              {event.date}
            </span>
          </div>
        </div>

        {/* Contenido */}
        <div className='grid grid-cols-1 gap-8 p-6 lg:grid-cols-3'>
          {/* Columna principal */}
          <div className='lg:col-span-2 space-y-6'>
            <header>
              <h1 className='text-titleColor text-3xl md:text-4xl font-bold'>
                {event.title}
              </h1>
              {(event as any).summary && (
                <p className='mt-2 text-textColor/80'>
                  {(event as any).summary}
                </p>
              )}
            </header>

            {ytId && (
              <div className='overflow-hidden rounded-xl border border-strokeColor/50'>
                <iframe
                  className='aspect-video w-full'
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title='Video del evento'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                />
              </div>
            )}

            {event.description && (
              <section>
                <h2 className='text-titleColor text-2xl font-semibold mb-2'>
                  Descripción
                </h2>
                <p className='text-textColor whitespace-pre-line'>
                  {event.description}
                </p>
              </section>
            )}
          </div>

          {/* Columna lateral (metadatos simples) */}
          <aside className='lg:col-span-1 space-y-4'>
            <div className='rounded-xl border border-strokeColor/60 p-4 bg-backgroundColor/60'>
              <h3 className='text-titleColor font-semibold mb-3'>Detalles</h3>
              <ul className='text-sm text-textColor space-y-2'>
                {event.date && (
                  <li className='flex items-center gap-2'>
                    <CalendarDays className='h-4 w-4 text-primaryColor' />
                    <span>{event.date}</span>
                  </li>
                )}
                {(event as any).category && (
                  <li className='flex items-center gap-2'>
                    <Tag className='h-4 w-4 text-primaryColor' />
                    <span>{(event as any).category}</span>
                  </li>
                )}
                {(event as any).restriction && (
                  <li className='flex items-center gap-2'>
                    <ShieldAlert className='h-4 w-4 text-primaryColor' />
                    <span>{(event as any).restriction}</span>
                  </li>
                )}
                {(event as any).user && (
                  <li className='flex items-center gap-2'>
                    <span className='inline-flex h-4 w-4 items-center justify-center rounded-full bg-primaryColor/15 text-[10px] text-primaryColor font-bold'>
                      {(event as any).user?.[0]?.toUpperCase?.() ?? 'U'}
                    </span>
                    <span>Organiza: {(event as any).user}</span>
                  </li>
                )}
              </ul>
            </div>

            <EventCardMap event={event} />
          </aside>
        </div>
      </article>
    </main>
  )
}
