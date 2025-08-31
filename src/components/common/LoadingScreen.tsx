import IconLogo from './IconLogo'

export default function LoadingScreen() {
  return (
    <div className='flex items-center justify-center bg-transparent min-h-[50vh]'>
      <div className='relative w-[150px] h-[150px]'>
        {/* Círculo de carga */}
        <div className='absolute top-0 left-0 w-full h-full border-8 border-gray-200 rounded-full'></div>
        <div className='absolute top-0 left-0 w-full h-full border-8 border-secondary-main border-t-transparent animate-spin rounded-full'></div>
        {/* Logo en el centro */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <IconLogo size={'large'} />
        </div>
      </div>
    </div>
  )
}
