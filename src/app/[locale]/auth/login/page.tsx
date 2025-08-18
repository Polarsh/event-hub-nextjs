import { useTranslations } from 'next-intl'

import LoginForm from '@/components/auth/LoginForm'
import ThirdPartyLogin from '@/components/auth/ThirdPartyLogin'

import Card from '@/components/common/Card'
import ButtonLink from '@/components/common/ButtonLink'
import IconLogo from '@/components/common/IconLogo'

export default function LoginPage() {
  const tAuth = useTranslations('AUTH')

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <IconLogo size='large' className='mx-auto' />
        <h2 className='mt-6 text-center text-h2 font-bold tracking-tight text-textColor'>
          {tAuth('LOGIN')}
        </h2>
      </div>

      <Card className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] space-y-6'>
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
