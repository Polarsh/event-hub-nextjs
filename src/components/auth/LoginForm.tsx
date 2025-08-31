'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'

import Button from '@/components/common/Button'
import ButtonLink from '../common/ButtonLink'
import InputField from '../common/Form/InputField'
import { getLoginValidationSchema } from '@/utils/schemas/authSchemas'
import { useAuthenticator } from '@/context/AuthenticatorContext'
import type { LoginCredentials } from '@/types/AuthContext'

export default function LoginForm() {
  const tAuth = useTranslations('AUTH')
  const tForm = useTranslations('COMMON.FORM')

  // Obtenemos el esquema de validación con las traducciones
  const validationSchema = getLoginValidationSchema(tForm)

  const { login: loginUser } = useAuthenticator()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(validationSchema),
  })

  // Tipar el onSubmit con SubmitHandler
  const onSubmit = async (data: LoginCredentials) => {
    try {
      await loginUser({
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      console.error('Error de login:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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

      <div className='flex items-center justify-end'>
        <ButtonLink href='#' label={tAuth('FORGOT_PASSWORD')} />
      </div>

      <Button label={tAuth('LOGIN')} type='submit' />
    </form>
  )
}
