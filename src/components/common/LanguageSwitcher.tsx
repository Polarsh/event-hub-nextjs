'use client'

import { usePathname } from '@/i18n/navigation'
import { useState } from 'react'
import Flag from 'react-world-flags'

export default function LanguageSwitcher() {
  const pathname = usePathname()

  // Estado para controlar el idioma seleccionado
  const [selectedLanguage, setSelectedLanguage] = useState(
    pathname.startsWith('/en') ? 'en' : 'es'
  )

  // Función para cambiar el idioma y la ruta
  const handleLanguageChange = (lang: string) => {
    const newPathname = pathname.replace(/^\/(en|es)/, `/${lang}`)
    setSelectedLanguage(lang)
    window.location.href = newPathname // Redirigir a la nueva URL con el idioma seleccionado
  }

  return (
    <div className='flex gap-4 items-center'>
      {/* Selector con banderas */}
      {/* <select
        value={selectedLanguage}
        onChange={e => {
          handleLanguageChange(e.target.value)
        }}
        className='border rounded-md px-2 py-1'>
        <option value='es' className='text-sm'>
          <Flag code='ES' className='inline-block w-6 h-4 mr-2' /> Español
        </option>
        <option value='en' className='text-sm'>
          <Flag code='US' className='inline-block w-6 h-4 mr-2' /> English
        </option>
      </select> */}

      {/* Opción alternativa con iconos de banderas */}
      <div className='flex gap-2 items-center'>
        <div
          className='cursor-pointer'
          onClick={() => {
            handleLanguageChange('es')
          }}>
          <Flag code='ES' className='w-8 h-5' />
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            handleLanguageChange('en')
          }}>
          <Flag code='US' className='w-8 h-5' />
        </div>
      </div>
    </div>
  )
}
