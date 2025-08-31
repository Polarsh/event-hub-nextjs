import { Link } from '@/i18n/navigation'
import type { ReactElement } from 'react'

export type LinkProps = React.ComponentProps<typeof Link>

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
    // Agregamos el prefetch explícitamente y con un valor booleano
    <Link href={href} className={className} prefetch={false} {...props}>
      {label}
    </Link>
  )
}
