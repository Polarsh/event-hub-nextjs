import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

import Event from '@/models/Event'
import { getUserIdFromToken } from '@/utils/auth'

export async function GET() {
  try {
    await connectDB()
    const events = await Event.find({})
    return NextResponse.json(events, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al obtener los eventos' },
      { status: 500 }
    )
  }
}

export async function POST(req: any) {
  const creator = await getUserIdFromToken()
  if (!creator) {
    return NextResponse.json({ msg: 'No autorizado' }, { status: 401 })
  }

  try {
    await connectDB()

    const {
      title,
      category,
      summary,
      description,
      imageUrl,
      videoUrl,
      date,
      restriction,
    } = await req.json()

    const newEvent = new Event({
      title,
      category,
      summary,
      description,
      imageUrl,
      videoUrl,
      date: new Date(date),
      restriction,
      creator,
    })

    const savedEvent = await newEvent.save()

    return NextResponse.json({ id: savedEvent._id }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al crear el evento' },
      { status: 500 }
    )
  }
}
