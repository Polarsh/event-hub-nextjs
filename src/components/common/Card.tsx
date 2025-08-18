import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-backgroundColorLight p-4 md:p-6 lg:p-8 rounded-[4px] space-y-4 md:space-y-6 lg:space-y-8 ${className ?? ''}`}>
      {children}
    </div>
  )
}
