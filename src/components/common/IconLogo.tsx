import Image, { type ImageProps } from 'next/image'
import AppConfig from '@/config/AppConfig'
import type { ReactElement } from 'react'

const SIZE_OPTIONS = {
  small: 24,
  medium: 48,
  large: 72,
} as const

type PresetSize = keyof typeof SIZE_OPTIONS

type IconProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  size?: PresetSize | number
  className?: string
}

export default function IconLogo({
  size = 'medium',
  className,
  ...imgProps
}: IconProps): ReactElement {
  const computedSize =
    typeof size === 'number'
      ? size
      : (SIZE_OPTIONS[size] ?? SIZE_OPTIONS.medium)

  return (
    <Image
      alt={`${AppConfig.APP_NAME} Icon`}
      src={AppConfig.ICON_PATH}
      width={computedSize}
      height={computedSize}
      className={className}
      {...imgProps}
    />
  )
}
