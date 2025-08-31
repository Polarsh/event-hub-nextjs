import mongoose, { Schema, type Model, type Document } from 'mongoose'

// Define la interfaz para los datos del evento
export interface IEvent extends Document {
  title: string
  categoryId: string
  summary: string
  description: string
  imageUrl: string
  videoUrl?: string
  date: Date
  restrictionId: string
  creatorId: mongoose.Schema.Types.ObjectId
  isDeleted: boolean
}

// Define el esquema del evento
const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    categoryId: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String, required: false },
    date: { type: Date, required: true },
    restrictionId: { type: String, required: true },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
)

// Exporta el modelo. Si ya existe, lo usa; si no, lo crea.
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema)

export default Event
