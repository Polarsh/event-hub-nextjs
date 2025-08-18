import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-backgroundColorLight p-2 md:p-4 lg:p-6 rounded-md ${className ?? ''}`}>
      {children}
    </div>
  )
}
