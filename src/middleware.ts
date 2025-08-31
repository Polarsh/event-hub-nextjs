import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/i18n/routing'

import verifyAuth from './middlewares/authMiddleware'

const handleI18nRouting = createMiddleware(routing)

// 2. Exporta un middleware que combine ambos
export default async function middleware(req: NextRequest) {
  // Primero, maneja la internacionalización
  const i18nResponse = handleI18nRouting(req)

  // Luego, maneja la autenticación si la respuesta de i18n lo permite
  // Si i18n ya redirigió (ej. a una ruta sin idioma), no hacemos nada más.
  if (i18nResponse.headers.get('location')) {
    return i18nResponse
  }

  // Si no hay una redirección de i18n, continuamos con la autenticación
  const authResponse = await verifyAuth(req)

  // Si el middleware de autenticación redirigió, devuelve esa respuesta
  if (authResponse.headers.get('location')) {
    return authResponse
  }

  // Si no hay redirección, devuelve la respuesta del middleware de i18n
  return i18nResponse
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
