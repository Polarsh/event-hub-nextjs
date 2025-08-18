import Link, { type LinkProps } from 'next/link'
import type { ReactElement } from 'react'

type ButtonLinkProps = LinkProps & {
  label: string
  className?: string
}

export default function ButtonLink({
  href,
  label,
  className = 'underline text-link text-primaryColor hover:opacity-80',
  ...props
}: ButtonLinkProps): ReactElement {
  return (
    <Link href={href} className={className} {...props}>
      {label}
    </Link>
  )
}
