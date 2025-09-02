import '../../styles/globals.css'
import type { Metadata } from 'next'

import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

import AppConfig from '@/config/AppConfig'
import { routing } from '@/i18n/routing'

import Navbar from '@/components/common/NavBar'
import ClientProvidersWrapper from '@/context/ClientProvidersWrapper'
import Footer from '@/components/common/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(AppConfig.API_BASE_URL),
  title: {
    default: AppConfig.APP_NAME,
    template: `%s | ${AppConfig.APP_NAME}`,
  },
  description: AppConfig.APP_DESCRIPTION,
  icons: { icon: AppConfig.ICON_PATH },
  alternates: { canonical: '/' },
  openGraph: {
    title: AppConfig.APP_NAME,
    description: AppConfig.APP_DESCRIPTION,
    url: '/',
    siteName: AppConfig.APP_NAME,
    type: 'website',
    images: [AppConfig.ICON_PATH],
  },
  twitter: {
    card: 'summary_large_image',
    title: AppConfig.APP_NAME,
    description: AppConfig.APP_DESCRIPTION,
    images: [AppConfig.ICON_PATH],
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
      <body className='antialiased h-full'>
        <NextIntlClientProvider>
          <ClientProvidersWrapper>
            {/* Este wrapper ES el contenedor que scrollea */}
            <div className='flex h-full flex-col overflow-y-auto'>
              {/* Navbar sticky dentro del MISMO contenedor que scrollea */}
              <header className='sticky top-0 inset-x-0 z-50 bg-white/90 backdrop-blur'>
                <Navbar />
              </header>

              <main className='flex-1'>
                <div className='max-w-[1920px] mx-auto'>{children}</div>
              </main>

              <Footer />
            </div>
          </ClientProvidersWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
