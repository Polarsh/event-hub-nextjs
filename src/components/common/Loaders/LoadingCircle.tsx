import React from 'react'

export default function LoadingCircle() {
  return (
    <div className='w-full flex justify-center items-center min-h-[400px]'>
      <div className='w-16 h-16 rounded-full border-t-4 border-primaryColor border-solid animate-spin' />
    </div>
  )
}
