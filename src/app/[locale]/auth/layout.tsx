import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full mx-auto md:max-w-md pt-[64px] px-4 md:px-0 '>
      {children}
    </div>
  )
}
