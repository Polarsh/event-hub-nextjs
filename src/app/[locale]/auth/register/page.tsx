import { useTranslations } from 'next-intl'

import RegisterForm from '@/components/auth/RegisterForm'
import ThirdPartyLogin from '@/components/auth/ThirdPartyLogin'

import Card from '@/components/common/Card'
import ButtonLink from '@/components/common/ButtonLink'
import IconLogo from '@/components/common/IconLogo'

export default function RegisterPage() {
  const tAuth = useTranslations('AUTH')

  return (
    <div className='space-y-6'>
      <IconLogo size='large' className='mx-auto' />

      <h2 className='text-center text-h2 font-bold tracking-tight text-textColor'>
        {tAuth('REGISTER')}
      </h2>

      <Card className='flex flex-col gap-6'>
        <RegisterForm />
        <ThirdPartyLogin />

        <p className='text-center text-body text-textColor'>
          {tAuth('NO_ACCOUNT')}{' '}
          <ButtonLink label={tAuth('LOGIN_HERE')} href='/auth/login' />
        </p>
      </Card>
    </div>
  )
}
