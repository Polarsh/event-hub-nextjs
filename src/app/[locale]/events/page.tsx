'use client'

import React from 'react'

import Page from '@/components/common/Page'
import type { Event } from '@/types/Event'
import EventsGrid from '@/components/event/EventGrid'

export default function EventHome() {
  const events: Event[] = [
    {
      id: '1',
      user: { userId: '1', name: 'Carlos Mendoza' },
      name: 'Festival de Música Electrónica',
      description:
        'Disfruta de los mejores DJ locales e internacionales en un evento sin igual.',
      location: 'Parque Central, Lima',
      latitude: '-12.0464',
      longitude: '-77.0428',
      date: '2025-05-30 | 22:00',
      imageUrl: '',
      tags: ['Música', 'Electrónica', 'Fiesta'],
    },
    {
      id: '2',
      user: { userId: '2', name: 'Ana Torres' },
      name: 'Exposición de Arte Moderno',
      description:
        'Una exposición única de arte contemporáneo en el Museo de Arte de Lima.',
      location: 'Museo de Arte de Lima, Lima',
      latitude: '-12.0434',
      longitude: '-77.0287',
      date: '2025-06-05 | 10:00',
      imageUrl: '',
      tags: ['Arte', 'Cultura', 'Exposición'],
    },
    {
      id: '3',
      user: { userId: '3', name: 'Javier Pérez' },
      name: 'Maratón de la Ciudad',
      description: 'Únete a nuestra maratón anual y corre por una buena causa.',
      location: 'Av. Pardo, Lima',
      latitude: '-12.0876',
      longitude: '-77.0364',
      date: '2025-07-10 | 07:00',
      imageUrl: '',
      tags: ['Deporte', 'Maratón', 'Salud'],
    },
    {
      id: '4',
      user: { userId: '4', name: 'Lucía Martínez' },
      name: 'Concierto de Rock en Vivo',
      description: 'Un emocionante concierto de rock con bandas locales.',
      location: 'Auditorio Principal, Lima',
      latitude: '-12.0961',
      longitude: '-77.0407',
      date: '2025-06-15 | 20:00',
      imageUrl: '',
      tags: ['Música', 'Rock', 'Concierto'],
    },
    {
      id: '5',
      user: { userId: '5', name: 'José Gómez' },
      name: 'Feria Gastronómica Internacional',
      description:
        'Ven y disfruta de lo mejor de la gastronomía mundial en un solo lugar.',
      location: 'Jockey Plaza, Lima',
      latitude: '-12.0732',
      longitude: '-77.0353',
      date: '2025-06-20 | 12:00',
      imageUrl: '',
      tags: ['Gastronomía', 'Cultura', 'Feria'],
    },
    {
      id: '6',
      user: { userId: '6', name: 'Sofia Martínez' },
      name: 'Festival de Cine Independiente',
      description:
        'Disfruta de una selección de películas independientes de todo el mundo.',
      location: 'Cine Planet, Lima',
      latitude: '-12.0750',
      longitude: '-77.0334',
      date: '2025-08-10 | 18:00',
      imageUrl: '',
      tags: ['Cine', 'Cultura', 'Festival'],
    },
    {
      id: '7',
      user: { userId: '7', name: 'Ricardo Herrera' },
      name: 'Conferencia de Innovación y Tecnología',
      description:
        'Ven a descubrir las últimas tendencias en tecnología e innovación.',
      location: 'Centro de Convenciones, Lima',
      latitude: '-12.0500',
      longitude: '-77.0335',
      date: '2025-09-12 | 09:00',
      imageUrl: '',
      tags: ['Tecnología', 'Innovación', 'Conferencia'],
    },
    {
      id: '8',
      user: { userId: '8', name: 'María Pérez' },
      name: 'Exhibición de Autos de Lujo',
      description:
        'Una exclusiva exhibición de los autos más lujosos del mercado.',
      location: 'Plaza San Martín, Lima',
      latitude: '-12.0468',
      longitude: '-77.0276',
      date: '2025-10-05 | 14:00',
      imageUrl: '',
      tags: ['Autos', 'Lujo', 'Exhibición'],
    },
    {
      id: '9',
      user: { userId: '9', name: 'Esteban Salazar' },
      name: 'Feria de Libros y Literatura',
      description:
        'Sumérgete en el mundo de los libros con más de 100 editoriales participantes.',
      location: 'Parque Kennedy, Lima',
      latitude: '-12.1040',
      longitude: '-77.0334',
      date: '2025-11-01 | 10:00',
      imageUrl: '',
      tags: ['Literatura', 'Cultura', 'Feria'],
    },
    {
      id: '10',
      user: { userId: '10', name: 'Gabriela Ruiz' },
      name: 'Torneo de Fútbol 7',
      description: 'Compite en un torneo de fútbol 7 entre equipos amateurs.',
      location: 'Estadio Municipal, Lima',
      latitude: '-12.0927',
      longitude: '-77.0330',
      date: '2025-08-20 | 15:00',
      imageUrl: '',
      tags: ['Deporte', 'Fútbol', 'Torneo'],
    },
  ]

  return (
    <Page>
      <h1 className='sr-only hidden'>Eventos</h1>
      <EventsGrid title={'Buscar'} events={events} />
    </Page>
  )
}
