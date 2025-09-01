'use client'

import React from 'react'
import { ArrowRight, CalendarDays, ShieldAlert, Tag } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Event } from '@/types/Event'
import ImageComponent from '../common/Image'

type EventCardProps = {
  event: Event
  isEditMode?: boolean
}

export default function EventCard({
  event,
  isEditMode = false,
}: EventCardProps) {
  const { id, title, date, category, imageUrl, restriction } = event

  return (
    <Link
      href={isEditMode ? `/account/events/${id}/detail` : `/events/${id}`}
      aria-label={
        isEditMode
          ? `Editar evento: ${title}`
          : `Ver detalles del evento: ${title}`
      }
      className='
        group relative flex flex-col overflow-hidden rounded-2xl
        bg-backgroundColor border border-strokeColor/60
        shadow-sm transition-[transform,box-shadow,filter] duration-300
        motion-safe:hover:scale-[1.02] hover:shadow-lg
        focus:outline-none focus-visible:ring-2 focus-visible:ring-my-purple/60
      '>
      {/* Glow / borde degradado al hover */}
      <div
        className='
          pointer-events-none absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          ring-1 ring-transparent
          [background:linear-gradient(120deg,rgba(127,90,240,.15),rgba(255,255,255,0))_padding-box,linear-gradient(120deg,rgba(127,90,240,.4),rgba(127,90,240,0))_border-box]
          border border-transparent
        '
      />

      {/* Media */}
      <div className='relative w-full aspect-[16/9] overflow-hidden'>
        <ImageComponent imageUrl={imageUrl} name={title} />
        {/* Zoom suave de imagen */}
        <div className='absolute inset-0 will-change-transform transition-transform duration-500 motion-safe:group-hover:scale-105' />

        {/* Gradiente para legibilidad */}
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent' />

        {/* Badges sobre la imagen */}
        <div className='absolute left-3 right-3 top-3 flex items-center gap-2'>
          <span className='inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur px-2.5 py-1 text-xs font-semibold text-white'>
            <Tag className='h-3.5 w-3.5' />
            {category}
          </span>
          {restriction && (
            <span className='inline-flex items-center gap-1 rounded-full bg-red-600/90 px-2.5 py-1 text-xs font-semibold text-white'>
              <ShieldAlert className='h-3.5 w-3.5' />
              {restriction}
            </span>
          )}
        </div>

        {/* Fecha pill */}
        <div className='absolute bottom-3 left-3'>
          <span className='inline-flex items-center gap-1.5 rounded-full bg-white/90 text-black backdrop-blur px-2.5 py-1 text-xs font-semibold shadow'>
            <CalendarDays className='h-3.5 w-3.5' />
            {date}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className='p-4'>
        <h3
          title={title}
          className='text-titleColor line-clamp-1 text-base md:text-lg font-bold'>
          {title}
        </h3>

        <div className='mt-3 flex items-center justify-end'>
          <span
            className='
                inline-flex items-center gap-2 rounded-[8px] bg-primaryColor
                px-3 py-2 text-sm font-bold text-white
                transition-[transform,filter] duration-200
                group-hover:brightness-110 motion-safe:group-hover:-translate-y-0.5
              '>
            Ver detalles
            <ArrowRight className='h-5 w-5' />
          </span>
        </div>
      </div>
    </Link>
  )
}
