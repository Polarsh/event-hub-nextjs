const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Función para manejar las respuestas
const handleResponse = async response => {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.msg || 'Error al hacer la solicitud')
  }
  return data
}

// Función para hacer solicitudes GET
const get = async (url, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers, // Puedes pasar headers adicionales si es necesario
      },
      credentials: 'include', // Esto asegura que las cookies se envíen automáticamente
    })
    return handleResponse(response)
  } catch (error) {
    throw new Error(error.message)
  }
}

// Función para hacer solicitudes POST
const post = async (url, body, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
      credentials: 'include', // Enviar las cookies con la solicitud
    })
    return handleResponse(response)
  } catch (error) {
    throw new Error(error.message)
  }
}

// Función para hacer solicitudes PUT
const put = async (url, body, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
      credentials: 'include',
    })
    return handleResponse(response)
  } catch (error) {
    throw new Error(error.message)
  }
}

// Función para hacer solicitudes DELETE
const del = async (url, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    })
    return handleResponse(response)
  } catch (error) {
    throw new Error(error.message)
  }
}

// Exportar las funciones de manera que puedas acceder a ellas como httpHelper.get, httpHelper.post, etc.
const httpHelper = {
  get,
  post,
  put,
  del,
}

export default httpHelper
