'use client'

import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'

import Button from '@/components/common/Button'
import ButtonLink from '../common/ButtonLink'
import InputField from '../common/InputField'
import { getLoginValidationSchema } from '@/utils/schemas/authSchemas'
import { useRouter } from 'next/navigation'

interface FormData {
  email: string
  password: string
}

export default function LoginForm() {
  const tAuth = useTranslations('AUTH')
  const tForm = useTranslations('COMMON.FORM')

  const router = useRouter()

  // Obtenemos el esquema de validación con las traducciones
  const validationSchema = getLoginValidationSchema(tForm)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  })

  // Tipar el onSubmit con SubmitHandler
  const onSubmit: SubmitHandler<FormData> = data => {
    console.log('Form data:', data)
    router.push('/events')
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
