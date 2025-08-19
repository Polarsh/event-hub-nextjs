'use server'

import Image from 'next/image'
import type { Event } from '@/types/Event'

import { UserCircle } from 'lucide-react'

import Page from '@/components/common/Page'
import EventCardMap from '@/components/event/EventCardMap'
import TagPill from '@/components/event/TagPill'
import EventDisclaimer from '@/components/event/EventDisclaimer'

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  const { eventId } = await params

  // Aquí podrías hacer una llamada a una API para obtener el evento por su ID
  const event: Event = {
    id: eventId,
    user: { userId: '1', name: 'Usuario Ejemplo' },
    name: 'Concierto de Rock en Vivo',
    description:
      'Dolor ipsum est ipsum commodo aliquip duis esse exercitation ex culpa qui duis. Veniam ex ea veniam aliqua esse pariatur dolor deserunt. Consectetur non officia culpa laboris pariatur.\n\nUllamco elit nulla veniam labore nulla laborum nisi do est sunt. Dolore adipisicing ullamco Lorem et consectetur cupidatat est officia cupidatat irure mollit occaecat eiusmod. Non ea voluptate non proident sit. Commodo dolor cupidatat irure cupidatat exercitation duis sit ipsum ut pariatur proident id. Elit excepteur tempor eiusmod aute ullamco veniam amet excepteur ad nulla Lorem dolor.\n\nAute adipisicing proident exercitation consectetur eu cupidatat irure ullamco. Elit nisi dolor amet consectetur eu. Ut eu non ad ea do veniam. Do nostrud non proident dolore commodo cupidatat enim consectetur proident qui officia sit amet. Ex non labore laborum velit ut fugiat commodo tempor excepteur reprehenderit quis elit. Amet et do cillum non ullamco est adipisicing deserunt voluptate exercitation non.',
    location: 'Auditorio Principal',
    latitude: '-12.096147173557606',
    longitude: '-77.0406560162601',
    date: '15 de octubre de 2023 | 20:00',
    imageUrl: '/svgs/placeholder.svg', // Imagen principal para el banner
    tags: ['Música', 'Rock', 'Concierto'],
  }

  return (
    <Page>
      {/* Contenido principal */}
      <Image
        src={event.imageUrl}
        alt={`Banner del evento ${event.name}`}
        width={1200}
        height={300}
        className='w-full h-[300px] object-cover rounded-lg'
        priority
        sizes='100vw'
      />

      {/* Información del evento y mapa */}
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Información principal del evento */}
        <div className='text-titleColor w-full lg:w-2/3 flex flex-col gap-8 '>
          {/* Título y detalles clave */}
          <div>
            <h1 className='text-4xl font-bold text-titleColor'>{event.name}</h1>
            <div className='h-[1px] rounded w-[80px] bg-primaryColor pt-2' />
          </div>

          {/* Tags */}
          <TagPill tags={event.tags} />

          {/* Información del organizador */}
          <div className='flex items-center gap-4 text-textColor'>
            <UserCircle className='flex-shrink-0 text-primaryColor h-10 w-10' />
            <div>
              <p className='font-semibold text-sm'>Organizado por:</p>
              <p className='font-medium text-base'>{event.user.name}</p>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h2 className='text-2xl font-semibold mb-2'>Descripción</h2>
            <p className='text-body text-textColor'>{event.description}</p>
          </div>

          {/* Añadir el descargo de responsabilidad al final */}
          <EventDisclaimer organizerName={event.user.name} />
        </div>

        {/* Mapa interactivo y acciones */}
        <div className='w-full lg:w-1/3'>
          <EventCardMap event={event} />
        </div>
      </div>
    </Page>
  )
}
