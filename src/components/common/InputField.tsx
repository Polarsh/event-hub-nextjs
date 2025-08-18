import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { useState } from 'react'
import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form'

type InputFieldProps = {
  label: string
  name: string
  register?: UseFormRegister<any>
  required?: boolean
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
} & React.InputHTMLAttributes<HTMLInputElement>

export default function InputField({
  label,
  type = 'text',
  name,
  register,
  required,
  disabled,
  error,
  ...props
}: InputFieldProps) {
  const errorMessage = (error as FieldError)?.message

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  // Si es password y el usuario quiere ver o esconder
  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type

  return (
    <div className='flex flex-col gap-[16px] '>
      {label && (
        <label htmlFor={name} className='text-body font-bold text-titleColor'>
          {label} {required && <span className='text-errorColor'>*</span>}
        </label>
      )}
      <div className='relative'>
        <input
          id={name}
          type={inputType}
          disabled={disabled}
          {...(register ? register(name as any) : {})}
          className={`p-2 text-titleColor focus:outline-none placeholder:text-textColor
          w-full overflow-hidden whitespace-normal text-wrap
          ${errorMessage ? 'text-errorColor border-errorColor' : ''}
          ${disabled ? 'bg-backgroundColorWhite text-backgroundColor placeholder:text-backgroundColor cursor-not-allowed' : ''}
        `}
          {...props}
        />
        {/* Ícono para mostrar/ocultar password */}
        {type === 'password' && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700'
            aria-label={
              showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }>
            {showPassword ? (
              <EyeIcon className='h-6 w-6' />
            ) : (
              <EyeClosedIcon className='h-6 w-6' />
            )}
          </button>
        )}
      </div>
      {errorMessage && (
        <p className=' text-small text-errorColor'>{errorMessage}</p>
      )}
    </div>
  )
}
