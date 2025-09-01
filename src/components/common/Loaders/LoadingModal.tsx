'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type LoadingModalProps = {
  isOpen: boolean
  message?: string
  subMessage?: string
}

const LoadingModal = ({
  isOpen,
  message = 'Cargando...',
  subMessage = 'Esto puede tardar unos segundos.',
}: LoadingModalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen || !mounted) return null

  const modal = (
    <div
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/50'
      role='dialog'
      aria-modal='true'
      aria-label='Cargando'>
      <div className='bg-white rounded-xl shadow-2xl p-8 transform scale-100 transition-transform duration-300 ease-in-out'>
        <div className='flex flex-col items-center'>
          <div className='w-16 h-16 rounded-full border-t-4 border-primaryColor border-solid animate-spin' />

          <span className='mt-4 text-center text-lg font-medium text-gray-700'>
            {message}
          </span>
          <span className='mt-1 text-sm text-gray-500' aria-live='polite'>
            {subMessage}
          </span>
        </div>
      </div>
    </div>
  )

  // Portal al body: evita stacking contexts de ancestros
  return createPortal(modal, document.body)
}

export default LoadingModal
