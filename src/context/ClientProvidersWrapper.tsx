'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

// Importar dinámicamente el componente ClientProviders, solo en el cliente
const ClientProviders = dynamic(
  async () => await import('@/context/ClientProviders'),
  { ssr: false }
)

const ClientProvidersWrapper = ({ children }: { children: ReactNode }) => {
  return <ClientProviders>{children}</ClientProviders>
}

export default ClientProvidersWrapper
