'use client'

import { useAuthenticator } from '@/context/AuthenticatorContext'
import { Link, usePathname } from '@/i18n/navigation'
import {
  Calendar,
  CircleUser,
  LayoutGrid,
  LogOut,
  Plus,
  Settings,
} from 'lucide-react'

type SidebarRoute = {
  key: string
  path: string
  Icon: React.ElementType // Para componentes como los íconos
  disabled?: boolean
}

type SidebarItemProps = {
  label: string
  path: string
  Icon: React.ElementType
  disabled?: boolean
  isActive?: boolean
  onClick?: () => Promise<void>
}

export const sidebarRoutes: SidebarRoute[] = [
  {
    key: 'Dashboard',
    path: '/account/dashboard',
    Icon: LayoutGrid,
  },
  {
    key: 'Mis Eventos',
    path: '/account/events/my-events',
    Icon: Calendar,
  },
  {
    key: 'Crear Evento',
    path: '/account/events/create',
    Icon: Plus,
  },
  {
    key: 'Configuración',
    path: '/account/settings',
    Icon: Settings,
    disabled: true,
  },
]

export const SidebarUser = () => {
  const pathname = usePathname()

  const { currentUser, isLoading, logout } = useAuthenticator()

  return (
    <aside
      className={`w-full h-full bg-[#f4f4f6] transition-all duration-300 ease-in-out`}>
      <div className='flex flex-col flex-grow h-full'>
        <div className='flex flex-col gap-[24px] lg:gap-[32px] w-full h-full flex-grow-0'>
          {/* UserCard */}
          <div className='bg-secondaryColor bg-opacity-25 flex flex-row items-center w-full p-4 md:p-6 lg:p-8 gap-6 lg:gap-8'>
            <CircleUser className='flex flex-shrink-0 w-[48px] h-[48px] text-primaryColor' />
            <div>
              <div className=' text-link'>{currentUser?.username}</div>
              <div className=' text-small overflow-hidden'>
                {currentUser?.email}
              </div>
            </div>
          </div>
          {/* Rutas */}
          <div className='flex flex-col gap-[24px] xl:gap-[32px] pl-4 md:pl-6 lg:pl-8'>
            {sidebarRoutes.map(({ key, path, Icon, disabled }) => (
              <SidebarItem
                key={key}
                label={key}
                path={path}
                Icon={Icon}
                disabled={disabled}
                isActive={pathname === path} // Verificar si el item está activo
              />
            ))}
          </div>
        </div>
        {/* Botones inferiores */}
        <div className='pl-4 md:pl-6 lg:pl-8 mt-auto'>
          <SidebarItem
            label='Cerrar Sesión'
            path='#' // No es una ruta, se maneja con un evento
            Icon={LogOut}
            disabled={isLoading}
            onClick={logout} // Llama a la función de logout del contexto
          />
        </div>
      </div>
    </aside>
  )
}

// Actualiza el componente SidebarItem para que acepte un onClick
const SidebarItem = ({
  label,
  path,
  Icon,
  disabled,
  isActive,
  onClick, // Agrega la prop onClick
}: SidebarItemProps & { onClick?: () => void }) => {
  return (
    <Link
      href={path}
      onClick={async e => {
        if (onClick) {
          e.preventDefault() // Evita la navegación si hay un evento de click
          void onClick()
        }
      }}
      className={`flex items-center xl:justify-start gap-6 px-4 py-2 rounded-tl rounded-bl transition-all duration-300
        ${isActive ? 'bg-secondaryColor text-primary-main font-bold border-r-4 border-primaryColor' : 'text-secondary-main'}
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      aria-label={label}>
      <Icon className='w-8 h-8' />
      <span
        className={`xl:block font-content text-link leading-[22.5px] transition-opacity duration-1000 ease-in-out delay-500`}>
        {label}
      </span>
    </Link>
  )
}
