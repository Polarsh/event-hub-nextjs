'use client'

import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import { getRegisterValidationSchema } from '@/utils/schemas/authSchemas'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterForm() {
  const tAuth = useTranslations('AUTH')
  const tForm = useTranslations('COMMON.FORM')

  // Obtenemos el esquema de validación con las traducciones
  const validationSchema = getRegisterValidationSchema(tForm)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema), // Usamos el esquema con traducciones
  })

  const onSubmit = (data: any) => {
    console.log('Form data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <InputField
        name='username'
        type='text'
        label='Nombre'
        placeholder='Ingresa tu nombre'
        register={register}
        error={errors.username}
      />

      <InputField
        name='email'
        type='email'
        label={tForm('EMAIL')}
        placeholder={tForm('EMAIL_ENTER')}
        register={register}
        error={errors.email}
      />

      <InputField
        name='password'
        type='password'
        label={tForm('PASSWORD')}
        placeholder={tForm('PASSWORD_ENTER')}
        register={register}
        error={errors.password}
      />

      <Button label={tAuth('REGISTER')} type='submit' />
    </form>
  )
}
