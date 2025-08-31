// src/middleware/authMiddleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

// Función para verificar la autenticación
const verifyAuth = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value

  // Pero necesitamos manejar los prefijos de idioma.
  const pathWithLang = req.nextUrl.pathname.split('/').filter(Boolean)
  const lang = pathWithLang[0]
  const pathWithoutLang = '/' + pathWithLang.slice(1).join('/')

  // Verifica si el path sin idioma es parte del área protegida
  const isAccountPath = pathWithoutLang.startsWith('/account')
  if (isAccountPath) {
    if (!token) {
      // Si no hay token, redirige a la página de login con el idioma correcto
      return NextResponse.redirect(new URL(`/${lang}/auth/login`, req.url))
    }

    // Si hay un token, verifica su validez
    try {
      await jose.jwtVerify(token, JWT_SECRET)
      // Si es válido, permite el acceso
      return NextResponse.next()
    } catch (error) {
      // Si es inválido (expirado, etc.), redirige a login
      console.log('Token inválido o expirado')
      return NextResponse.redirect(new URL(`/${lang}/auth/login`, req.url))
    }
  }

  // Permite el acceso a todas las demás rutas
  return NextResponse.next()
}

export default verifyAuth
