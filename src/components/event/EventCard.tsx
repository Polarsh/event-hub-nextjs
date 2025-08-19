'use client'

import { Link, useRouter } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import type { Event } from '@/types/Event'
import TagPill from './TagPill'
import ImageComponent from '../common/Image'

export default function EventCard({ event }: { event: Event }) {
  const { id, name, date, tags, imageUrl } = event

  const router = useRouter()

  return (
    <div
      onClick={() => {
        router.push(`/events/${id}`)
      }}
      className='group hover:cursor-pointer relative flex flex-col overflow-hidden rounded-[4px] border-2 border-strokeColor bg-backgroundColor shadow-md transition hover:shadow-lg focus-within:ring-2 focus-within:ring-my-purple/60'>
      {/* Imagen */}
      <div className='relative h-[200px] w-full'>
        <ImageComponent imageUrl={imageUrl} name={name} />

        {/* Gradiente sutil para legibilidad y brillo al hover */}
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90' />
      </div>
      {/* Contenido */}
      <div className='flex flex-col gap-4 p-4 '>
        <h3 className='text-h3 line-clamp-1 text-titleColor font-bold'>
          {name}
        </h3>

        {/* Tags - Pills */}
        <TagPill tags={tags.slice(0, 3)} />

        <div className='flex items-center justify-between'>
          {/* Fecha */}
          <span className='rounded-[4px] text-small font-medium text-textColor'>
            {date}
          </span>

          {/* Boton */}
          <div className='flex items-center justify-end'>
            <Link
              href={`events/${id}`}
              className='inline-flex items-center gap-2 rounded-[4px] bg-primaryColor px-3 py-2 text-small font-bold text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7f5af0] focus-visible:ring-offset-zinc-900'>
              Ver detalles
              <ArrowRight className='text-white h-6 w-6' />
            </Link>
          </div>
        </div>
      </div>

      {/* Borde brillante sutil al hover */}
      <div className='pointer-events-none absolute inset-0 rounded-[4px] ring-1 ring-white/5 transition group-hover:ring-white/10' />
    </div>
  )
}
