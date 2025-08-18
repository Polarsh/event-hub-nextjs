import { useTranslations } from 'next-intl'

import RegisterForm from '@/components/auth/RegisterForm'
import ThirdPartyLogin from '@/components/auth/ThirdPartyLogin'

import Card from '@/components/common/Card'
import ButtonLink from '@/components/common/ButtonLink'
import IconLogo from '@/components/common/IconLogo'

export default function RegisterPage() {
  const tAuth = useTranslations('AUTH')

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <IconLogo size='large' className='mx-auto' />
        <h2 className='mt-6 text-center text-h2 font-bold tracking-tight text-textColor'>
          {tAuth('REGISTER')}
        </h2>
      </div>

      <Card className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] space-y-6'>
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
