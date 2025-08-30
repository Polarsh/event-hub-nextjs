'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthenticatorProvider } from '@/context/AuthenticatorContext'

const queryClient = new QueryClient()

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticatorProvider>{children}</AuthenticatorProvider>
    </QueryClientProvider>
  )
}

export default ClientProviders
