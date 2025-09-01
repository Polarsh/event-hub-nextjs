import mongoose from 'mongoose'
import { ensureModelsAreLoaded } from './loadModels'

const MONGO_URI = process.env.MONGO_URI

// Conexión a MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Ya estás conectado a la base de datos')
    return
  }

  try {
    ensureModelsAreLoaded()
    await mongoose.connect(MONGO_URI)
    console.log('Conexión a MongoDB establecida')
  } catch (error) {
    console.error('Error al conectar a MongoDB', error)
    process.exit(1) // Detener el proceso si no se puede conectar
  }
}

export default connectDB
