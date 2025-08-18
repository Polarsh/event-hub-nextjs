import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('Home')

  return (
    <main className='p-8'>
      <h1 className='text-3xl font-bold'>{t('title')}</h1>
      <p className='mt-2 text-gray-600'>{t('description')}</p>
    </main>
  )
}
