import { cookies } from 'next/headers'
import * as jose from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export const getUserIdFromToken = async (): Promise<string | null> => {
  const cookieStore = cookies()
  const token = (await cookieStore).get('token')?.value

  if (!token) {
    return null
  }

  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    // Asume que el ID del usuario está en el campo 'sub' o similar en el payload
    const userId = payload.id as string
    return userId
  } catch (error) {
    console.error('Error al verificar el token:', error)
    return null
  }
}
