'use client'

import React from 'react'
import { Github, Linkedin } from 'lucide-react'
import AppConfig from '@/config/AppConfig'
import { Link } from '@/i18n/navigation'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='w-full mt-auto bg-slate-950 text-secondaryColor p-8 md:p-12 rounded-t-3xl'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16'>
        {/* Sección de la compañía y descripción */}
        <div className='flex flex-col items-start'>
          <h3 className='text-backgroundColor text-2xl font-bold mb-3'>
            {AppConfig.APP_NAME}
          </h3>
          <p className='text-sm leading-relaxed'>{AppConfig.APP_DESCRIPTION}</p>
        </div>

        {/* Sección de enlaces de navegación */}
        <div className='flex flex-col items-start'>
          <h4 className='text-backgroundColor font-semibold mb-4'>
            Navegación
          </h4>
          <ul className='space-y-2'>
            <li>
              <Link
                href='/'
                className='hover:text-backgroundColor transition-colors duration-200'>
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href='/events'
                className='hover:text-backgroundColor transition-colors duration-200'>
                Eventos
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección de redes sociales y contacto */}
        <div className='flex flex-col items-start'>
          <h4 className='text-backgroundColor font-semibold mb-4'>Conéctate</h4>
          <div className='flex space-x-4 mb-4'>
            <a
              href={AppConfig.AUTHOR_GITHUB_URL}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'>
              <Github className='w-6 h-6 text-secondaryColor hover:text-backgroundColor transition-colors duration-200' />
            </a>
            <a href={AppConfig.AUTHOR_LINKEDIN_URL} aria-label='LinkedIn'>
              <Linkedin className='w-6 h-6 text-secondaryColor hover:text-backgroundColor transition-colors duration-200' />
            </a>
          </div>
          <p className='text-sm'>
            Correo de soporte: <br />
            <a
              href='mailto:soporte@eventhub.com'
              className='hover:text-backgroundColor transition-colors duration-200'>
              soporte@eventhub.com
            </a>
          </p>
        </div>
      </div>

      {/* Sección de derechos de autor */}
      <div className='mt-8 pt-6 border-t border-strokeColor text-center text-sm'>
        <p>
          &copy; {currentYear} {AppConfig.APP_NAME}. Todos los derechos
          reservados.
        </p>
        <p className='mt-1'>
          Diseñado y creado por{' '}
          <a
            href={AppConfig.AUTHOR_GITHUB_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-secondaryColor hover:text-backgroundColor underline'>
            {AppConfig.AUTHOR_NAME}
          </a>
        </p>
      </div>
    </footer>
  )
}
