'use client'
import React from 'react'

import Page from '@/components/common/Page'
import { SidebarUser } from '@/components/common/SidebarUser'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=' w-full h-full flex'>
      <div className='w-[350px] h-full'>
        <SidebarUser />
      </div>
      <div className='flex flex-grow'>
        <Page className='mx-auto w-full'>{children}</Page>
      </div>
    </div>
  )
}
