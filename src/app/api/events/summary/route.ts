import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Event from '@/models/Event'

export async function GET() {
  try {
    await connectDB()

    // Obtener los 3 eventos más recientemente creados
    const latestCreated = await Event.find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .populate(['creator', 'category', 'restriction'])

    // Obtener los 3 eventos más próximos
    const upcomingEvents = await Event.find({
      date: { $gte: new Date() },
    })
      .sort({ date: 1 })
      .limit(3)
      .populate(['creator', 'category', 'restriction'])

    return NextResponse.json({ latestCreated, upcomingEvents }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al obtener los eventos' },
      { status: 500 }
    )
  }
}
