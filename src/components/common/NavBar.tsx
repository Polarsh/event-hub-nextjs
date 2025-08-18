'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from '@/i18n/navigation'
import { MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import LanguageSwitcher from '@/components/common/LanguageSwitcher'

export default function Navbar() {
  const pathname = usePathname()
  const tNavBar = useTranslations('NAVBAR')

  const [isOpen, setIsOpen] = useState(false)

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
    {
      title: tNavBar('PROFILE'),
      href: '/user/profile',
    },
  ]

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
