'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import Flag from 'react-world-flags'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  // Función para cambiar el idioma
  const handleLanguageChange = (lang: string) => {
    // La función `router.push()` cambia la URL sin recargar la página
    router.push(pathname, { locale: lang })
  }

  return (
    <div className='flex gap-4 items-center'>
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
