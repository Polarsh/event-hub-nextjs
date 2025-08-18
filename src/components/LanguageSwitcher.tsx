'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const pathname = usePathname()

  return (
    <div className='flex gap-4'>
      <Link href={pathname.replace(/^\/(en|es)/, '/es')}>ES</Link>
      <Link href={pathname.replace(/^\/(en|es)/, '/en')}>EN</Link>
    </div>
  )
}
