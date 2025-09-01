import { NextResponse } from 'next/server'

import Category from '@/models/Category'
import Restriction from '@/models/Restriction'
import connectDB from '@/lib/mongodb'

export async function GET() {
  try {
    await connectDB()

    // Obtener todas las categorías y restricciones
    const categories = await Category.find({})
    const restrictions = await Restriction.find({})

    // Transformar los datos al formato { value, label }
    const formattedCategories = categories.map(cat => ({
      value: cat._id,
      label: cat.text,
    }))

    const formattedRestrictions = restrictions.map(res => ({
      value: res._id,
      label: res.text,
    }))

    return NextResponse.json({
      categories: formattedCategories,
      restrictions: formattedRestrictions,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Error al obtener los filtros de la base de datos' },
      { status: 500 }
    )
  }
}
