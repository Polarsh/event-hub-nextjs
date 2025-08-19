'use client'

import React, { useState } from 'react'
import { Heart, Share2, Users } from 'lucide-react' // Iconos de Lucide

type EventActionsCardProps = {
  eventId: string
  eventName: string
  eventStats?: {
    attendees: number
    likes: number
    shares: number
  }
}

export default function EventActionsCard({
  eventId,
  eventName,
  eventStats,
}: EventActionsCardProps) {
  // Estado para manejar si el evento tiene like
  const [liked, setLiked] = useState(false)

  // Función para alternar el estado del like
  const toggleLike = () => {
    setLiked(prev => !prev)
  }

  // Función para compartir el evento en WhatsApp
  const handleShare = () => {
    const eventUrl = `${window.location.origin}/events/${eventId}` // URL del evento
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `¡Mira este evento! ${eventName}: ${eventUrl}`
    )}`

    window.open(whatsappUrl, '_blank') // Abre WhatsApp en una nueva ventana
  }

  const actions = [
    {
      icon: <Heart className='h-8 w-8' />,
      isActive: liked,
      action: toggleLike,
      label: 'Like',
      count: eventStats?.likes && 0,
    },
    {
      icon: <Users className='h-6 w-6' />,
      label: 'Attendees',
      count: eventStats?.attendees && 0,
    },
    {
      icon: <Share2 className='h-6 w-6' />,
      action: handleShare,
      label: 'Share',
    },
  ]

  return (
    <div className='flex flex-col items-start '>
      {/* Contenedor de los botones de acción y estadísticas */}
      <div className='flex justify-around w-full items-center'>
        {actions.map(({ icon, action, label, count, isActive }, index) => (
          <button
            key={index}
            onClick={action}
            className={`flex flex-col items-center gap-2 text-textColor hover:text-primaryColor transition-colors ${isActive ? 'text-primaryColor' : ''}`}>
            {icon}
            {count !== undefined && (
              <span className='text-xs text-muted-foreground'>{count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
