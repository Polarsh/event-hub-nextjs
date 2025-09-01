import mongoose, { Schema, type Model, type Document } from 'mongoose'

// Define la interfaz para los datos de la categoría
export interface ICategory extends Document {
  text: string
}

// Define el esquema de la categoría
const categorySchema = new Schema<ICategory>({
  text: { type: String, required: true, unique: true },
})

// Exporta el modelo. Si ya existe, lo usa; si no, lo crea.
const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>('Category', categorySchema, 'categories')

export default Category
