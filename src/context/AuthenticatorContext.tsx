'use client'

import { type ReactNode, createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from '@/services/AuthContextServices'

import type {
  RegisterCredentials,
  AuthenticatorContextType,
  LoginCredentials,
  User,
} from '@/types/AuthContext'
import { useRouter } from '@/i18n/navigation'

// --- Contexto y Provider ---
const AuthenticatorContext = createContext<
  AuthenticatorContextType | undefined
>(undefined)

export const AuthenticatorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  // 1. Query para verificar la sesión del usuario (es la ÚNICA fuente de verdad).
  const {
    data: user,
    isPending: isVerifying,
    refetch: refetchUserSession,
  } = useQuery<User | null>({
    queryKey: ['verifyUser'],
    queryFn: verifyUser,
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  // 2. Mutación para el Login, usando mutateAsync
  const { mutateAsync: performLoginAsync, isPending: isLoggingIn } =
    useMutation<User, Error, LoginCredentials>({
      mutationFn: loginUser,
      onSuccess: loggedInUser => {
        queryClient.setQueryData(['verifyUser'], loggedInUser)
        router.push('/account/dashboard')
      },
      onError: error => {
        console.error(error)
        queryClient.setQueryData(['verifyUser'], null)
      },
    })

  // 3. Mutación para el Logout, usando mutateAsync
  const { mutateAsync: performLogoutAsync, isPending: isLoggingOut } =
    useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {
        queryClient.setQueryData(['verifyUser'], null)
        router.push('/')
      },
    })

  // 4. Mutación para el Registro, usando mutateAsync
  const { mutateAsync: performRegisterAsync, isPending: isRegistering } =
    useMutation<User, Error, RegisterCredentials>({
      mutationFn: registerUser,
      onSuccess: newUser => {
        queryClient.setQueryData(['verifyUser'], newUser)
        router.push('/account/dashboard')
      },
      onError: error => {
        queryClient.setQueryData(['verifyUser'], null)
        console.error(error)
      },
    })

  const isLoading = isVerifying || isLoggingIn || isLoggingOut || isRegistering

  // Valor del contexto
  const contextValue: AuthenticatorContextType = {
    currentUser: user ?? null,
    refetchUserSession,
    // Exponemos las funciones async para que puedan ser usadas con 'await'
    login: performLoginAsync,
    logout: performLogoutAsync,
    register: performRegisterAsync,

    isLoading,
  }

  return (
    <AuthenticatorContext.Provider value={contextValue}>
      {children}
    </AuthenticatorContext.Provider>
  )
}

// Hook personalizado para consumir el contexto
export const useAuthenticator = (): AuthenticatorContextType => {
  const context = useContext(AuthenticatorContext)
  if (!context) {
    throw new Error(
      'useAuthenticator debe ser usado dentro de un AuthenticatorProvider'
    )
  }
  return context
}
