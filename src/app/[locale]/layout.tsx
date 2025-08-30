import '../../styles/globals.css'
import type { Metadata } from 'next'

import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

import AppConfig from '@/config/AppConfig'
import { routing } from '@/i18n/routing'

import Navbar from '@/components/common/NavBar'
import ClientProvidersWrapper from '@/context/ClientProvidersWrapper'

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
          <ClientProvidersWrapper>
            <Navbar />
            <div className='max-w-[1920px] mx-auto'>{children}</div>
          </ClientProvidersWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
