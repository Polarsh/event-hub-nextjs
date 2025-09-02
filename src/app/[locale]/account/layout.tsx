'use client'
import React from 'react'

import Page from '@/components/common/Page'
import { SidebarUser } from '@/components/common/SidebarUser'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full min-h-screen flex'>
      {/* Sidebar sticky con top 80px y scroll interno */}
      <aside className='w-[350px] md:sticky md:top-[72px] self-start md:h-[calc(100vh-72px)] overflow-y-auto'>
        <SidebarUser />
      </aside>

      {/* Contenido */}
      <main className='flex-1'>
        <Page className='mx-auto w-full'>{children}</Page>
      </main>
    </div>
  )
}
