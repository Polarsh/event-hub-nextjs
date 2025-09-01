'use client'

import React from 'react'

import { Link } from '@/i18n/navigation'
import { ArrowLeft, CalendarDays, ShieldAlert, Tag } from 'lucide-react'

import useEventView from '@/hooks/useEventView'
import LoadingScreen from '@/components/common/Loaders/LoadingScreen'
import ImageComponent from '@/components/common/Image'

function getYouTubeId(url?: string) {
  if (!url) return null
  const m = url.match(/(?:v=|be\/|embed\/)([A-Za-z0-9_-]{11})/)
  return m?.[1] ?? null
}

export default function DetailEvent() {
  const { myEvent, isPendingMyEventDetail } = useEventView()

  if (isPendingMyEventDetail) {
    return <LoadingScreen />
  }

  if (!myEvent) {
    return (
      <section className='mx-auto '>
        <Link
          href='/events'
          className='inline-flex items-center gap-2 text-primaryColor hover:underline'>
          <ArrowLeft className='h-4 w-4' /> Volver a eventos
        </Link>
        <h1 className='mt-6 text-h1 text-titleColor'>Evento no encontrado</h1>
        <p className='mt-2 text-textColor'>
          Puede que el evento haya sido eliminado o no exista.
        </p>
      </section>
    )
  }

  const {
    id,
    title,
    summary,
    description,
    imageUrl,
    videoUrl,
    date,
    category,
    restriction,
    user, // "administrator" en tu ejemplo
  } = myEvent

  const ytId = getYouTubeId(videoUrl)

  return (
    <section className='flex flex-col gap-6'>
      <div className='flex flex-row justify-between'>
        {/* Título */}
        <h1 className='text-h1 text-titleColor'>Detalles del evento</h1>
        {/* CTA primaria */}
        <div className='flex flex-wrap items-center gap-2 pt-2'>
          <Link
            href={`/account/events/${id}/edit`}
            className='inline-flex items-center rounded-[8px] bg-primaryColor px-4 py-2 text-sm font-bold text-white hover:brightness-110'>
            Editar
          </Link>
        </div>
      </div>

      {/* Hero */}
      <article>
        <div className='relative aspect-[16/9] w-full'>
          <ImageComponent imageUrl={imageUrl} name={title} />
          {/* Gradiente para legibilidad */}
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent' />
          {/* Badges encima */}
          <div className='absolute left-4 right-4 top-4 flex flex-wrap items-center gap-2'>
            {category && (
              <span className='inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur px-3 py-1 text-xs font-semibold text-white'>
                <Tag className='h-3.5 w-3.5' />
                {category}
              </span>
            )}
            {restriction && (
              <span className='inline-flex items-center gap-1 rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white'>
                <ShieldAlert className='h-3.5 w-3.5' />
                {restriction}
              </span>
            )}
          </div>
          {/* Fecha */}
          <div className='absolute bottom-4 left-4'>
            <span className='inline-flex items-center gap-1.5 rounded-full bg-white/90 text-black backdrop-blur px-3 py-1 text-xs font-semibold shadow'>
              <CalendarDays className='h-3.5 w-3.5' />
              {date}
            </span>
          </div>
        </div>

        {/* Contenido */}
        <div className='space-y-6 p-6'>
          <header className='space-y-2'>
            <h1 className='text-h1 text-titleColor'>{title}</h1>
            <div className='text-sm text-textColor/80'>
              {user ? (
                <>
                  Publicado por <span className='font-semibold'>{user}</span>
                </>
              ) : null}
            </div>
          </header>

          {summary && <p className='text-lg text-textColor'>{summary}</p>}

          {/* Video (si es YouTube, embeber; si no, mostrar link) */}
          {videoUrl &&
            (ytId ? (
              <div className='overflow-hidden rounded-xl border border-strokeColor/50'>
                <iframe
                  className='aspect-video w-full'
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title='Video del evento'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                />
              </div>
            ) : (
              <div className='text-sm'>
                Video:{' '}
                <a
                  href={videoUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='text-primaryColor underline'>
                  {videoUrl}
                </a>
              </div>
            ))}

          {description && (
            <div className='prose prose-invert max-w-none text-textColor'>
              <p className='whitespace-pre-line'>{description}</p>
            </div>
          )}
        </div>
      </article>
    </section>
  )
}
