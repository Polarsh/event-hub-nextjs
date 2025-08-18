import Image, { type ImageProps } from 'next/image'
import type { ReactElement } from 'react'

const SIZE_OPTIONS = {
  small: 24,
  medium: 48,
  large: 72,
} as const

type PresetSize = keyof typeof SIZE_OPTIONS

type IconProps = Omit<ImageProps, 'width' | 'height'> & {
  /** Tamaño predefinido o un número en px */
  size?: PresetSize | number
  className?: string
  alt?: string
  src?: string
}

export default function IconComponent({
  size = 'medium',
  className,
  alt,
  src,
  ...imgProps
}: IconProps): ReactElement {
  const computedSize =
    typeof size === 'number'
      ? size
      : (SIZE_OPTIONS[size] ?? SIZE_OPTIONS.medium)

  return (
    <Image
      alt={`${alt} Icon`}
      src={src}
      width={computedSize}
      height={computedSize}
      className={className}
      {...imgProps}
    />
  )
}
