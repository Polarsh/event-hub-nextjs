import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Event from '@/models/Event'
import { getUserIdFromToken } from '@/utils/auth'

export async function GET() {
  const creator = await getUserIdFromToken()

  // Si no se encuentra el ID, el usuario no está autenticado
  if (!creator) {
    return NextResponse.json({ msg: 'No autorizado' }, { status: 401 })
  }

  try {
    await connectDB()

    // Buscamos solo los eventos que coincidan con el ID del creador
    const myEvents = await Event.find({ creator, isDeleted: false }).populate([
      'creator',
      'category',
      'restriction',
    ])

    return NextResponse.json(myEvents, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al obtener tus eventos' },
      { status: 500 }
    )
  }
}
