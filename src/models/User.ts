import mongoose, { type Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

// --- Corrección 1: Sintaxis de método de interfaz ---
interface IUser extends Document {
  username: string
  email: string
  password: string
  role: string
  // Usamos una propiedad de función de flecha
  matchPassword: (password: string) => Promise<boolean>
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
})

// Encriptar contraseña antes de guardarla
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next() // Llamamos a next() sin un 'return'
    return // Salimos de la función
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Comparar contraseña
UserSchema.methods.matchPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

// --- Corrección 3: Declaración y exportación del modelo ---
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
