import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ msg: 'Sesión cerrada exitosamente' })

  // Para cerrar la sesión, simplemente eliminamos el token de la cookie
  res.cookies.set('token', '', {
    httpOnly: true,
    maxAge: 0, // Establece la edad máxima en 0 para que la cookie expire de inmediato
    path: '/',
  })

  return res
}
