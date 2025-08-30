// src/utils/validationSchemas.ts
import * as Yup from 'yup'

// Función que devuelve el esquema de validación para el login
export const getLoginValidationSchema = (t: (key: string) => string) => {
  return Yup.object().shape({
    email: Yup.string()
      .email(t('EMAIL_INVALID')) // Traducción para "Correo electrónico inválido"
      .required(t('EMAIL_REQUIRED')), // Traducción para "El correo electrónico es obligatorio"
    password: Yup.string()
      .min(6, t('PASSWORD_MIN')) // Traducción para "La contraseña debe tener al menos 6 caracteres"
      .required(t('PASSWORD_REQUIRED')), // Traducción para "La contraseña es obligatoria"
  })
}

// Función que devuelve el esquema de validación para el registro
export const getRegisterValidationSchema = (t: (key: string) => string) => {
  return Yup.object().shape({
    username: Yup.string().required(t('USERNAME_REQUIRED')), // Traducción para "El nombre de usuario es obligatorio"
    email: Yup.string()
      .email(t('EMAIL_INVALID')) // Traducción para "Correo electrónico inválido"
      .required(t('EMAIL_REQUIRED')), // Traducción para "El correo electrónico es obligatorio"
    password: Yup.string()
      .min(6, t('PASSWORD_MIN')) // Traducción para "La contraseña debe tener al menos 6 caracteres"
      .required(t('PASSWORD_REQUIRED')), // Traducción para "La contraseña es obligatoria"
  })
}
