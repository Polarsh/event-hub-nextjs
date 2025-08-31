import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Event from '@/models/Event'
import { getUserIdFromToken } from '@/utils/auth'

export async function GET() {
  const creatorId = await getUserIdFromToken()

  // Si no se encuentra el ID, el usuario no está autenticado
  if (!creatorId) {
    return NextResponse.json({ msg: 'No autorizado' }, { status: 401 })
  }

  try {
    await connectDB()

    // Buscamos solo los eventos que coincidan con el ID del creador
    const myEvents = await Event.find({ creatorId, isDeleted: false })

    return NextResponse.json(myEvents, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al obtener tus eventos' },
      { status: 500 }
    )
  }
}
