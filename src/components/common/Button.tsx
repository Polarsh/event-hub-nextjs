import {
  cloneElement,
  createElement,
  isValidElement,
  type ComponentType,
  type ReactElement,
  type SVGProps,
} from 'react'

type IconPosition = 'left' | 'right'

enum ButtonStyle {
  Fill = 'fill',
  Outline = 'outline',
  Text = 'text',
  Cancel = 'cancel',
  Submit = 'submit',
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
      'bg-yellow-400 text-white hover:bg-yellow-400 focus-visible:outline-primary',
    [ButtonStyle.Outline]:
      'bg-transparent text-yellow-400 border border-yellow-400 hover:bg-yellow-400 focus-visible:outline-yellow-400',
    [ButtonStyle.Text]:
      'text-yellow-400 hover:bg-yellow-400 focus-visible:outline-yellow-400',
    [ButtonStyle.Cancel]:
      'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600',
    [ButtonStyle.Submit]:
      'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-700',
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
      className={`${baseStyles} ${variants[variant]} ${className} ${fullWidth ? 'w-full' : 'w-fit'}`}>
      {iconPosition === 'left' && renderIcon()}
      <span>{label}</span>
      {iconPosition === 'right' && renderIcon()}
    </button>
  )
}
