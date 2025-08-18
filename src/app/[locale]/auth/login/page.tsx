import { useTranslations } from 'next-intl'

import LoginForm from '@/components/auth/LoginForm'
import ThirdPartyLogin from '@/components/auth/ThirdPartyLogin'

import Card from '@/components/common/Card'
import ButtonLink from '@/components/common/ButtonLink'
import IconLogo from '@/components/common/IconLogo'

export default function LoginPage() {
  const tAuth = useTranslations('AUTH')

  return (
    <div className='space-y-6'>
      <IconLogo size='large' className='mx-auto' />

      <h2 className='text-center text-h2 font-bold tracking-tight text-textColor'>
        {tAuth('LOGIN')}
      </h2>

      <Card>
        <LoginForm />
        <ThirdPartyLogin />

        <p className='text-center text-body text-textColor'>
          {tAuth('NO_ACCOUNT')}{' '}
          <ButtonLink label={tAuth('REGISTER_HERE')} href='/auth/register' />
        </p>
      </Card>
    </div>
  )
}
