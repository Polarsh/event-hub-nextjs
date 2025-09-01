import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Event from '@/models/Event'
import Attendance from '@/models/Attendance'

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

    // Obtener los 3 eventos con mayor número de participantes
    const mostAttended = await Attendance.aggregate([
      {
        $group: {
          _id: '$eventId',
          participantCount: { $sum: 1 },
        },
      },
      {
        $match: {
          participantCount: { $gt: 0 },
        },
      },
      {
        $sort: { participantCount: -1 },
      },
      {
        $limit: 3,
      },
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: '_id',
          as: 'eventDetails',
        },
      },
      {
        $unwind: '$eventDetails',
      },
      {
        $replaceRoot: { newRoot: '$eventDetails' },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creator',
        },
      },
      {
        $unwind: '$creator',
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $lookup: {
          from: 'restrictions',
          localField: 'restriction',
          foreignField: '_id',
          as: 'restriction',
        },
      },
      {
        $unwind: '$restriction',
      },
    ])

    return NextResponse.json(
      { latestCreated, upcomingEvents, mostAttended },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al obtener los eventos' },
      { status: 500 }
    )
  }
}
