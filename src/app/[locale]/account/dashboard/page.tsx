'use client'

import React from 'react'
import { useRouter } from '@/i18n/navigation'
import { Calendar, LayoutGrid, Plus, Users } from 'lucide-react'

import { useAuthenticator } from '@/context/AuthenticatorContext'
import Card from '@/components/common/Card'
import Button, { ButtonStyle } from '@/components/common/Button'

// You can create a new component for the stat cards for better reusability.
const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: string
  icon: React.ElementType
}) => (
  <Card className='bg-[#f4f4f6] flex flex-row items-center gap-6'>
    <Icon className='h-8 w-8 text-primaryColor' />
    <div>
      <h3 className='text-small text-textColor'>{title}</h3>
      <p className='mt-1 text-link font-bold text-titleColor'>{value}</p>
    </div>
  </Card>
)

export default function Dashboard() {
  const { currentUser } = useAuthenticator()

  const router = useRouter()

  return (
    <div className='flex flex-col gap-8'>
      {/* Welcome Section */}
      <header>
        <h1 className='text-h1 text-titleColor'>
          Hola, {currentUser?.username}
        </h1>
        <p className='mt-2 text-gray-600'>Bienvenido a tu panel de control.</p>
      </header>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <StatCard title='Eventos Creados' value='12' icon={LayoutGrid} />
        <StatCard title='Fechas Programadas' value='45' icon={Calendar} />
        <StatCard title='Participantes' value='120' icon={Users} />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className='text-h3 text-titleColor'>Acciones Rápidas</h2>
        <div className='mt-4'>
          <Button
            type='button'
            label='Crear evento'
            variant={ButtonStyle.Outline}
            icon={Plus}
            fullWidth={false}
            onClick={() => {
              router.push('/account/events/create')
            }}
          />
        </div>
      </div>
    </div>
  )
}
