import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(req) {
  await connectDB()

  const { username, email, password } = await req.json()

  console.log(await req.json())

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      return NextResponse.json({ msg: 'El usuario ya existe' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: password,
    })

    await newUser.save()
    return NextResponse.json(
      { msg: 'Usuario creado correctamente' },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al crear el usuario' },
      { status: 500 }
    )
  }
}
