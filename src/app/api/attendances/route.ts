import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Attendance from '@/models/Attendance'
import { getUserIdFromToken } from '@/utils/auth'

// Endpoint para verificar si un usuario asiste a un evento
export async function GET(request: Request) {
  const userId = await getUserIdFromToken()
  if (!userId) {
    return NextResponse.json({ msg: 'No autorizado' }, { status: 401 })
  }

  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('eventId')

    if (!eventId || !userId) {
      return NextResponse.json(
        {
          isAttending: false,
          msg: 'Se requieren el ID del evento y del usuario',
        },
        { status: 400 }
      )
    }

    const attendance = await Attendance.findOne({ eventId, userId })

    return NextResponse.json({ isAttending: !!attendance }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { isAttending: false, msg: 'Error al verificar la asistencia' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const userId = await getUserIdFromToken()
  if (!userId) {
    return NextResponse.json({ msg: 'No autorizado' }, { status: 401 })
  }

  try {
    await connectDB()

    const { eventId } = await req.json()

    if (!eventId) {
      return NextResponse.json(
        { msg: 'Se requieren el ID del evento' },
        { status: 400 }
      )
    }

    // Intenta encontrar y eliminar una confirmación de asistencia existente
    const existingAttendance = await Attendance.findOneAndDelete({
      eventId,
      userId,
    })

    if (existingAttendance) {
      // Si existía, significa que el usuario está cancelando su asistencia
      return NextResponse.json({ msg: 'Asistencia cancelada' }, { status: 200 })
    } else {
      // Si no existía, crea un nuevo registro de asistencia
      const newAttendance = await Attendance.create({
        eventId,
        userId,
      })

      return NextResponse.json(
        { msg: 'Asistencia confirmada', data: newAttendance },
        { status: 201 }
      )
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
