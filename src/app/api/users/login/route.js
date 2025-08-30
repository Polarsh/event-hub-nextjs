import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(req) {
  await connectDB()

  const { email, password } = await req.json()

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { msg: 'Usuario no encontrado' },
        { status: 400 }
      )
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json(
        { msg: 'Contraseña incorrecta' },
        { status: 400 }
      )
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })

    const res = NextResponse.json({ msg: 'Login exitoso' })
    res.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      path: '/',
    })

    return res
  } catch (error) {
    console.error(error)
    return NextResponse.json({ msg: 'Error en el servidor' }, { status: 500 })
  }
}
