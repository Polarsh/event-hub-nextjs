'use client'

import {
  cloneElement,
  createElement,
  isValidElement,
  type ComponentType,
  type ReactElement,
  type SVGProps,
} from 'react'

type IconPosition = 'left' | 'right'

export enum ButtonStyle {
  Fill = 'fill',
  Outline = 'outline',
  Text = 'text',
  Cancel = 'cancel',
}

type IconComp = ComponentType<SVGProps<SVGSVGElement>>
type IconEl = ReactElement<SVGProps<SVGSVGElement>>
type IconProp = IconComp | IconEl

interface ButtonProps {
  type?: 'button' | 'submit'
  label: string
  variant?: ButtonStyle
  disabled?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  icon?: IconProp
  iconPosition?: IconPosition
  fullWidth?: boolean
}

export default function Button({
  type = 'button',
  label,
  variant = ButtonStyle.Fill,
  onClick,
  disabled = false,
  className = 'w-fit',
  icon,
  iconPosition = 'right',
  fullWidth = true,
}: ButtonProps) {
  const baseStyles =
    'flex gap-2 items-center justify-center disabled:cursor-not-allowed rounded-md px-2.5 py-2 text-link shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  const variants = {
    [ButtonStyle.Fill]:
      'bg-primaryColor text-white focus-visible:outline-primaryColor',
    [ButtonStyle.Outline]:
      'bg-transparent text-primaryColor border border-primaryColor hover:bg-primaryColor hover:text-white focus-visible:outline-primaryColor',
    [ButtonStyle.Text]:
      'text-primaryColor hover:bg-primaryColor hover:text-white focus-visible:outline-primaryColor',
    [ButtonStyle.Cancel]:
      'bg-errorColor text-white hover:bg-errorColor hover:text-white focus-visible:outline-errorColor',
  }

  const iconClasses = 'w-6 h-6'

  const renderIcon = () => {
    if (!icon) return null
    return isValidElement<SVGProps<SVGSVGElement>>(icon)
      ? cloneElement(icon, {
          className: `${icon.props.className ?? ''} ${iconClasses}`.trim(),
        })
      : createElement(icon, { className: iconClasses })
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${fullWidth ? 'w-full' : 'w-fit'} `}>
      {iconPosition === 'left' && renderIcon()}
      <span>{label}</span>
      {iconPosition === 'right' && renderIcon()}
    </button>
  )
}
