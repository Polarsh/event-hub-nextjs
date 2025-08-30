// app/api/verify/route.js

import jwt from 'jsonwebtoken'
import { NextResponse, type NextRequest } from 'next/server'

import connectDB from '@/lib/mongodb'
import User from '@/models/User'

interface JwtPayload {
  id: string
}

export async function GET(req: NextRequest) {
  await connectDB()

  try {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ msg: 'No autorizado' }, { status: 401 })
    }

    // Almacena la variable de entorno en una constante
    const secret = process.env.JWT_SECRET

    // Verifica explícitamente si la clave secreta existe antes de usarla
    if (!secret) {
      throw new Error(
        'JWT_SECRET no está definido en las variables de entorno.'
      )
    }

    const decodedToken = jwt.verify(token, secret) as JwtPayload

    const user = await User.findById(decodedToken.id).select('-password')

    if (!user) {
      return NextResponse.json(
        { msg: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ msg: 'Token inválido' }, { status: 401 })
  }
}
