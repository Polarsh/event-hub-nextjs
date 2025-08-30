import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function authenticate(req) {
  const token = req.cookies.get('token') // Obtener el token desde la cookie

  if (!token) {
    return NextResponse.json({ msg: 'No autorizado' }, { status: 401 })
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Almacenar la información del usuario en la solicitud
    return NextResponse.next()
  } catch (error) {
    return NextResponse.json({ msg: 'Token inválido' }, { status: 403 })
  }
}
