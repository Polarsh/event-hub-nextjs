import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({
  children,
  className = 'bg-backgroundColorLight',
}: CardProps) {
  return (
    <div
      className={`${className ?? ''} p-4 md:p-6 lg:p-8 rounded-[4px] shadow-sm`}>
      {children}
    </div>
  )
}
