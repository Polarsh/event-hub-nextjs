import { NextResponse } from 'next/server'
import Event from '@/models/Event'
import connectDB from '@/lib/mongodb'

export async function POST(req: Request) {
  try {
    await connectDB()

    const { searchQuery, filters } = await req.json()

    const { sort } = filters

    // 1. Construir el objeto de consulta para MongoDB
    const query: any = {}

    // Aplicar filtros de categorías si existen
    if (filters?.categories?.length > 0) {
      query.category = { $in: filters.categories }
    }

    // Aplicar filtros de restricciones si existen
    if (filters?.restrictions?.length > 0) {
      query.restriction = { $in: filters.restrictions }
    }

    // Aplicar búsqueda por texto si existe
    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: 'i' }
    }

    // 2. Construir el objeto de ordenamiento
    const sortOptions: any = {}

    if (sort) {
      if (sort.alphabetical) {
        sortOptions.title = sort.alphabetical === 'asc' ? 1 : -1
      }
      if (sort.date) {
        sortOptions.date = sort.date === 'latest' ? -1 : 1
      }
    }

    // 3. Ejecutar la consulta con filtros y ordenamiento
    const events = await Event.find(query)
      .sort(sortOptions)
      .populate(['creator', 'category', 'restriction'])

    return NextResponse.json(events, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Error al obtener los eventos' },
      { status: 500 }
    )
  }
}
