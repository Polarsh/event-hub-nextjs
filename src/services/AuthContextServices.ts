import type { LoginCredentials, RegisterCredentials } from '@/types/AuthContext'

import httpHelper from '@/utils/httpHelper'

// Función para hacer login
export const loginUser = async (credentials: LoginCredentials) => {
  const data = await httpHelper.post('/users/login', credentials)
  console.log(data)

  return data
}

// Función para hacer registro
export const registerUser = async (credentials: RegisterCredentials) => {
  const data = await httpHelper.post('/users/register', credentials)
  console.log(data)

  return data
}

// Función para hacer logout
export const logoutUser = async () => {
  await httpHelper.post('/users/logout')
}

// Función para verificar el usuario (validar sesión)
export const verifyUser = async () => {
  const data = await httpHelper.get('/users/verify')
  return data
}
