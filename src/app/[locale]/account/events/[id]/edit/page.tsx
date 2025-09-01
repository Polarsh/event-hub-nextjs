'use client'

import React from 'react'

import EventForm from '@/components/event/EventForm'
import useEventManagement from '@/hooks/useEventManagement'
import type { EventDataProps } from '@/types/Event'
import { useParams } from 'next/navigation'
import LoadingScreen from '@/components/common/Loaders/LoadingScreen'
import { useRouter } from '@/i18n/navigation'

export default function EditEvent() {
  const { id } = useParams()
  const router = useRouter()

  const eventId = id as string

  const { editEvent, eventDetail, isLoading, isError } = useEventManagement({
    id: eventId,
  })

  const handleSubmit = async (formData: EventDataProps) => {
    // Llama a la mutación con los datos del formulario

    await editEvent({ id: eventId, updatedData: formData })
  }

  // Loading / Error states
  if (isLoading) {
    return <LoadingScreen />
  }

  if (isError) {
    router.push('/account/events/')
  }

  return (
    <section className='flex flex-col gap-6'>
      {/* Título */}
      <h1 className='text-h1 text-titleColor'>Editar evento</h1>

      {/* PostForm */}
      <EventForm
        onSubmit={handleSubmit}
        defaultValues={eventDetail}
        mode={'edit'}
      />
    </section>
  )
}
