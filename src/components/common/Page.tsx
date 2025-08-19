import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Page({ children, className }: CardProps) {
  return (
    <div className={`p-4 md:p-6 lg:p-8 flex flex-col gap-8 ${className ?? ''}`}>
      {children}
    </div>
  )
}
