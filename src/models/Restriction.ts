import mongoose, { Schema, type Model, type Document } from 'mongoose'

// Define la interfaz para los datos de la restricción
export interface IRestriction extends Document {
  text: string
}

// Define el esquema de la restricción
const restrictionSchema = new Schema<IRestriction>({
  text: { type: String, required: true, unique: true },
})

// Exporta el modelo. Si ya existe, lo usa; si no, lo crea.
const Restriction: Model<IRestriction> =
  mongoose.models.Restriction ||
  mongoose.model<IRestriction>('Restriction', restrictionSchema, 'restrictions')

export default Restriction
