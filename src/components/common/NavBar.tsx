'use client'

import { useState } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import {
  ChevronDown,
  CircleUserIcon,
  HomeIcon,
  LoaderIcon,
  LogOutIcon,
  MenuIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import LanguageSwitcher from '@/components/common/LanguageSwitcher'
import { useAuthenticator } from '@/context/AuthenticatorContext'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const tNavBar = useTranslations('NAVBAR')

  const { currentUser, logout, isLoading } = useAuthenticator()

  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const routerNav = [
    {
      title: tNavBar('HOME'),
      href: '/',
    },
    {
      title: tNavBar('EVENTS'),
      href: '/events',
    },
  ]

  // Array de opciones para el dropdown
  const dropdownOptions = [
    {
      icon: <HomeIcon className='w-[20px] h-[20px]' />,
      label: 'Mi cuenta',
      function: () => {
        toggleDropdown()
        router.push('/account/dashboard')
      },
    },
    {
      icon: <LogOutIcon className='w-[20px] h-[20px] text-secondary-main' />,
      label: 'Cerrar sesión',
      function: logout,
    },
  ]

  // Toggle del dropdown
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev)
  }

  return (
    <nav className='bg-backgroundColor text-white p-4 shadow-md'>
      <div className='max-w-[1920px] mx-auto flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='text-titleColor text-4xl font-bold'>
          <span className=' text-primaryColor'>Event</span>Hub
        </Link>

        {/* Botón hamburguesa en móviles */}
        <button
          onClick={toggleMenu}
          className='md:hidden text-titleColor focus:outline-none'>
          <MenuIcon className='text-primaryColor h-6 w-6' />
        </button>

        {/* Links de navegación siempre visibles en pantallas grandes */}
        <div className='hidden md:flex items-center space-x-6'>
          {routerNav.map(({ href, title }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + '/')

            return (
              <Link
                key={href}
                href={href}
                className={`text-link hover:text-primaryColor hover:font-bold 
                  ${isActive ? 'text-primaryColor underline' : 'text-textColor'}`}>
                {title}
              </Link>
            )
          })}

          {!isLoading ? (
            <>
              {currentUser ? (
                <div className='relative text-textColor'>
                  <div
                    className='flex gap-[8px] items-center cursor-pointer'
                    onClick={toggleDropdown}>
                    <CircleUserIcon className='w-[24px] h-[24px] flex-shrink-0 cursor-pointer' />
                    <label className='font-content text-body font-bold text-secondary-main hidden md:flex lg:flex whitespace-nowrap'>
                      {currentUser.username}
                    </label>
                    <div className='relative hidden md:block lg:block '>
                      <ChevronDown
                        className={`w-[24px] h-[24px] flex-shrink-0 cursor-pointer transform transition-all duration-300 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                  {isDropdownOpen && (
                    <div className='absolute top-8 right-0 w-[200px] bg-white shadow-lg rounded-md overflow-hidden'>
                      <ul className='flex flex-col divide-y divide-grey-main'>
                        {dropdownOptions.map((option, index) => (
                          <li
                            key={index}
                            className='flex items-center px-2 py-4 cursor-pointer text-primary-main hover:text-secondary-main font-content text-body'
                            onClick={option.function}>
                            {option.icon}
                            <span className='ml-2'>{option.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={'/auth/login'}
                  className={`text-link hover:text-primaryColor hover:font-bold text-textColor`}>
                  Iniciar Sesión
                </Link>
              )}
            </>
          ) : (
            <LoaderIcon className='text-primaryColor animate-spin' />
          )}

          {/* LanguageSwitcher */}
          <div className='relative'>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Menú desplegable solo en móviles */}
      <div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-backgroundColor p-4`}>
        {routerNav.map(({ href, title }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')

          return (
            <Link
              key={href}
              href={href}
              className={`text-link py-4 px-8 block w-full text-center hover:text-primaryColor hover:font-bold 
                ${isActive ? 'text-primaryColor underline' : 'text-textColor'}`}>
              {title}
            </Link>
          )
        })}

        {/* LanguageSwitcher */}
        <div className='w-full flex justify-center py-4'>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  )
}
