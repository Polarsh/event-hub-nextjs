import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Event from '@/models/Event'
import { getUserIdFromToken } from '@/utils/auth'

export async function GET(req: any, { params }: { params: any }) {
  try {
    const { id } = await params

    await connectDB()

    // Busca el evento y verifica que no esté borrado
    const event = await Event.findOne({ _id: id, isDeleted: false }).populate([
      'creator',
      'category',
      'restriction',
    ])

    if (!event) {
      return NextResponse.json({ msg: 'Evento no encontrado' }, { status: 404 })
    }

    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al obtener el evento' },
      { status: 500 }
    )
  }
}

export async function PUT(req: any, { params }: { params: any }) {
  const creator = await getUserIdFromToken()
  if (!creator) {
    return NextResponse.json({ msg: 'No autorizado' }, { status: 401 })
  }

  try {
    await connectDB()
    const { id } = params
    const updatedData = await req.json()

    const eventToUpdate = await Event.findOne({
      _id: id,
      creator,
      isDeleted: false,
    })
    if (!eventToUpdate) {
      return NextResponse.json(
        { msg: 'No autorizado para editar este evento' },
        { status: 403 }
      )
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
    if (!updatedEvent) {
      return NextResponse.json({ msg: 'Evento no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ id: updatedEvent._id }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al actualizar el evento' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: any, { params }: { params: any }) {
  const creator = await getUserIdFromToken()
  if (!creator) {
    return NextResponse.json({ msg: 'No autorizado' }, { status: 401 })
  }

  try {
    await connectDB()
    const { id } = params

    const eventToDelete = await Event.findOne({
      _id: id,
      creator,
      isDeleted: false,
    })
    if (!eventToDelete) {
      return NextResponse.json(
        { msg: 'No autorizado para eliminar este evento' },
        { status: 403 }
      )
    }

    // Realiza el borrado lógico
    const deletedEvent = await Event.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true } // Para obtener el documento actualizado
    )

    if (!deletedEvent) {
      return NextResponse.json({ msg: 'Evento no encontrado' }, { status: 404 })
    }

    return NextResponse.json(
      { success: true, msg: 'Evento eliminado lógicamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al eliminar el evento' },
      { status: 500 }
    )
  }
}
