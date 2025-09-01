'use client'

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import InputField from '../common/Form/InputField'
import Button, { ButtonStyle } from '../common/Button'
import TextAreaField from '../common/Form/TextAreaField'
import DatePickerField from '../common/Form/DatePickerField'
import CustomSelect from '../common/Form/Select'
import { eventSchema } from '@/utils/schemas/eventSchema'
import type { EventDataProps } from '@/types/Event'
import { Link } from '@/i18n/navigation'
import { Wand2 } from 'lucide-react'
import LoadingModal from '../common/Loaders/LoadingModal'

type EventFormProps = {
  onSubmit: (data: any) => void
  defaultValues: EventDataProps | undefined
  mode: 'add' | 'edit'
}

export default function EventForm({
  onSubmit,
  defaultValues,
  mode,
}: EventFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventDataProps>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  })

  // Esta es la función que llama a la API de Python
  const generateDescription = async () => {
    setIsLoading(true)

    try {
      const { title, summary } = watch()

      if (!title || !summary) {
        alert('Por favor, ingresa un título y un resumen primero.')
        return
      }

      const res = await fetch('/api/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, summary }),
      })

      if (!res.ok) {
        throw new Error('Error al generar la descripción.')
      }

      const data = await res.json()

      setValue('description', data.description)
    } catch (error) {
      console.error(error)
      alert('Error al generar la descripción. Por favor, inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-2 gap-6'>
        <InputField
          name='title'
          type='text'
          label='Nombre del evento'
          placeholder='Dale un nombre corto y llamativo'
          register={register}
          required
          error={errors.title}
        />

        <CustomSelect
          label={'Categoria'}
          name='category'
          options={[
            { value: '1', label: 'A' },
            { value: '2', label: 'B' },
            { value: '3', label: 'C' },
            { value: '4', label: 'D' },
          ]}
          register={register}
          setValue={setValue}
          watch={watch}
          required
          error={errors.category}
        />
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <DatePickerField
          label={'Fecha del evento'}
          name='date'
          required
          minDate={'0'}
          setValue={setValue}
          watch={watch}
          error={errors.date}
        />

        <CustomSelect
          label={'Restricción'}
          name='restriction'
          options={[
            { value: '1', label: 'A' },
            { value: '2', label: 'B' },
            { value: '3', label: 'C' },
            { value: '4', label: 'D' },
          ]}
          register={register}
          setValue={setValue}
          watch={watch}
          required
          error={errors.restriction}
        />
      </div>

      <TextAreaField
        name='summary'
        label='Resumen del evento'
        placeholder='Escribe un párrafo corto y potente'
        register={register}
        required
        error={errors.summary}
      />

      {/* Nuevo botón para la generación con IA */}
      <Button
        label='Generar Descripción con IA'
        onClick={generateDescription}
        type='button'
        variant={ButtonStyle.Outline}
        icon={<Wand2 className='w-4 h-4' />}
      />

      <TextAreaField
        name='description'
        label='Descripción del evento'
        placeholder='Dale la información detallada a los usuarios'
        register={register}
        required
        error={errors.description}
      />

      <div className='grid grid-cols-2 gap-6'>
        <InputField
          name='imageUrl'
          type='text'
          label='Imagen'
          placeholder='Enlace de imagen del evento'
          register={register}
          required
          error={errors.title}
        />

        <InputField
          name='videoUrl'
          type='text'
          label='Video'
          placeholder='Enlace de Youtube del evento'
          register={register}
          required
          error={errors.title}
        />
      </div>

      <div className=' w-full flex justify-end gap-6'>
        {mode === 'edit' && (
          <Link href={`/account/events/${defaultValues?._id}/detail`}>
            <Button label='Ver Detalles' variant={ButtonStyle.Outline} />
          </Link>
        )}
        <Button
          label={mode === 'edit' ? 'Editar' : 'Crear'}
          type='submit'
          fullWidth={false}
        />
      </div>
      <LoadingModal isOpen={isLoading} message='Generando descripción...' />
    </form>
  )
}
