import type { Metadata } from 'next'
import '../../styles/globals.css'

import AppConfig from '@/config/AppConfig'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/common/NavBar'

export const metadata: Metadata = {
  title: AppConfig.APP_NAME,
  description: AppConfig.APP_DESCRIPTION,
  icons: {
    icon: '/svgs/icon.svg',
  },
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang='es' className='h-full'>
      <body className='antialiased'>
        <NextIntlClientProvider>
          <Navbar />
          <div className='max-w-[1920px] mx-auto'>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
