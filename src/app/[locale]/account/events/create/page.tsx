'use client'

import React from 'react'

import EventForm from '@/components/event/EventForm'
import useEventManagement, { eventMockValues } from '@/hooks/useEventManagement'
import type { EventDataProps } from '@/types/Event'

export default function AddEvent() {
  // Llama al hook sin un ID.
  const { addEvent } = useEventManagement({})

  const handleSubmit = async (formData: EventDataProps) => {
    // Llama a la mutación con los datos del formulario
    await addEvent(formData)
  }

  return (
    <section className='flex flex-col gap-6'>
      {/* Título */}
      <h1 className='text-h1 text-titleColor'>Crear evento</h1>

      {/* PostForm */}
      <EventForm
        onSubmit={handleSubmit}
        defaultValues={eventMockValues}
        mode={'add'}
      />

      {/* <LoadingModal open={loadingSubmit} message='Creating post...' /> */}
    </section>
  )
}
