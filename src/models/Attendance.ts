import { Schema, models, model } from 'mongoose'

const attendanceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Referencia al modelo de Usuario
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event', // Referencia al modelo de Evento
      required: true,
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
  }
)

// Se crea un índice compuesto para asegurar que un usuario solo pueda confirmar asistencia una vez por evento
attendanceSchema.index({ userId: 1, eventId: 1 }, { unique: true })

const Attendance = models.Attendance || model('Attendance', attendanceSchema)

export default Attendance
