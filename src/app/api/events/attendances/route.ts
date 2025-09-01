import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Event from '@/models/Event'
import Attendance from '@/models/Attendance'
import { getUserIdFromToken } from '@/utils/auth'

export async function GET(request: Request) {
  const userId = await getUserIdFromToken()

  // Si no se encuentra el ID, el usuario no está autenticado
  if (!userId) {
    return NextResponse.json({ msg: 'No autorizado' }, { status: 401 })
  }

  try {
    await connectDB()

    // 1. Encuentra todos los registros de asistencia del usuario
    const attendedEvents = await Attendance.find({ userId })

    // 2. Extrae las IDs de los eventos
    const eventIds = attendedEvents.map(att => att.eventId)

    // 3. Busca los eventos correspondientes
    const events = await Event.find({
      _id: { $in: eventIds },
    }).populate(['creator', 'category', 'restriction'])

    return NextResponse.json(events, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al obtener los eventos a los que asiste el usuario' },
      { status: 500 }
    )
  }
}
