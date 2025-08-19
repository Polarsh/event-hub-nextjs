'use client'

import React, { useState } from 'react'
import Button, { ButtonStyle } from '../common/Button'

type AttendButtonProps = {
  eventId: string
}

export default function AttendButton({ eventId }: AttendButtonProps) {
  const [isAttending, setIsAttending] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAttend = async () => {
    setLoading(true)
    try {
      // Aquí puedes hacer tu llamada a API para registrar asistencia
      // Por ejemplo:
      // await fetch(`/api/events/${eventId}/attend`, { method: 'POST' })

      setIsAttending(true)
    } catch (error) {
      console.error('Error al asistir al evento:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      label={isAttending ? 'Asistiendo' : 'Asistir'}
      onClick={handleAttend}
      disabled={loading || isAttending}
      fullWidth={true}
      variant={ButtonStyle.Fill}
    />
  )
}
