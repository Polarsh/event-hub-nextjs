import React from 'react'

type EventDisclaimerProps = {
  organizerName: string
}

export default function EventDisclaimer({
  organizerName,
}: EventDisclaimerProps) {
  // Aquí puedes personalizar el mensaje del descargo de responsabilidad
  return (
    <div className='p-4 bg-gray-100 text-gray-700 rounded shadow-md'>
      <p className='text-body'>
        <strong>Descargo de responsabilidad:</strong> Este evento es organizado
        y gestionado por <span className='font-semibold'>{organizerName}</span>.{' '}
        <strong>EventHub</strong> actúa únicamente como plataforma para la
        publicación de este evento y no es responsable de la organización ni la
        gestión de las actividades relacionadas con el evento.
      </p>
    </div>
  )
}
