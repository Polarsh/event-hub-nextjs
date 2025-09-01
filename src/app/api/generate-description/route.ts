import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import path from 'path'
import { existsSync } from 'fs'

export async function POST(req: Request) {
  try {
    const { title, summary } = await req.json()

    if (!title || !summary) {
      return NextResponse.json(
        { error: 'Se requiere un título y un resumen.' },
        { status: 400 }
      )
    }

    // Identifica el path del ejecutable de Python en el entorno virtual
    const pythonExecutable =
      process.platform === 'win32'
        ? path.join(process.cwd(), 'venv', 'Scripts', 'python.exe')
        : path.join(process.cwd(), 'venv', 'bin', 'python3')

    // Verifica que el ejecutable de Python exista.
    if (!existsSync(pythonExecutable)) {
      console.error(
        'El ejecutable de Python no se encontró en el entorno virtual.'
      )
      return NextResponse.json(
        {
          error:
            'Faltan las dependencias de Python. Por favor, asegúrate de que el entorno virtual esté activado y que las dependencias estén instaladas.',
        },
        { status: 500 }
      )
    }

    // Construye el comando para ejecutar el script de Python con el ejecutable correcto.
    const scriptPath = path.join(
      process.cwd(),
      'scripts',
      'generate_description.py'
    )
    const command = `${pythonExecutable} ${scriptPath} "${title}" "${summary}"`

    // Ejecuta el script de Python y espera su respuesta.
    const result = await new Promise<string>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el script de Python: ${stderr}`)
          reject(new Error('Falló la generación de la descripción.'))
          return
        }
        resolve(stdout)
      })
    })

    const parsedResult = JSON.parse(result)

    return NextResponse.json(parsedResult)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
