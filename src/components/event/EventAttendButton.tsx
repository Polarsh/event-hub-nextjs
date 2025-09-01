'use client'

import React from 'react'
import Button, { ButtonStyle } from '../common/Button'
import httpHelper from '@/utils/httpHelper'
import { useAuthenticator } from '@/context/AuthenticatorContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import LoadingModal from '../common/Loaders/LoadingModal'

type AttendButtonProps = {
  eventId: string
}

// Servicio para verificar el estado de asistencia
const fetchAttendanceStatus = async (eventId: string) => {
  if (!eventId) return { isAttending: false }
  const response = await httpHelper.get(`/attendances?eventId=${eventId}`)
  return response
}

// Servicio para registrar/cancelar asistencia
const toggleAttendance = async (eventId: string) => {
  const response = await httpHelper.post('/attendances', { eventId })
  return response.msg === 'Asistencia confirmada'
}

export default function AttendButton({ eventId }: AttendButtonProps) {
  const { currentUser } = useAuthenticator()
  const queryClient = useQueryClient()

  // Consulta el estado inicial de la asistencia
  const { data, isLoading } = useQuery({
    queryKey: ['attendance', eventId],
    queryFn: async () => {
      return await fetchAttendanceStatus(eventId)
    },
    enabled: !!currentUser, // Solo si el usuario está autenticado
  })

  // Mutación para manejar la confirmación/cancelación de asistencia
  const mutation = useMutation({
    mutationFn: toggleAttendance,
    onSuccess: () => {
      // Invalida la consulta para que se vuelva a ejecutar automáticamente
      void queryClient.invalidateQueries({ queryKey: ['attendance', eventId] })
    },
  })

  const handleAttend = () => {
    if (!currentUser) {
      return
    }

    mutation.mutate(eventId)
  }

  const buttonLabel = data?.isAttending ? 'Asistiendo' : 'Asistir'
  const buttonDisabled = !currentUser || mutation.isPending

  return (
    <>
      <Button
        label={buttonLabel}
        onClick={handleAttend}
        disabled={buttonDisabled}
        fullWidth={true}
        variant={ButtonStyle.Fill}
      />
      <LoadingModal isOpen={isLoading} />
    </>
  )
}
