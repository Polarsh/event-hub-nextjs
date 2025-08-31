import React from 'react'
import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form'

type TextAreaFieldProps = {
  label: string
  name: string
  register?: UseFormRegister<any>
  required?: boolean
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export default function TextAreaField({
  label,
  name,
  register,
  required,
  disabled,
  error,
  ...props
}: TextAreaFieldProps) {
  const errorMessage = (error as FieldError)?.message

  return (
    <div className='flex flex-col gap-[16px]'>
      {label && (
        <label htmlFor={name} className='text-body font-bold text-titleColor'>
          {label} {required && <span className='text-errorColor'>*</span>}
        </label>
      )}
      <div className='relative'>
        <textarea
          id={name}
          disabled={disabled}
          {...(register ? register(name as any) : {})}
          className={`p-2 border-b-2 text-titleColor focus:outline-none placeholder:text-textColor
            w-full overflow-hidden whitespace-normal text-wrap
            ${errorMessage ? 'text-errorColor border-errorColor' : 'border-gray-300'}
            ${disabled ? 'bg-backgroundColorWhite text-backgroundColor placeholder:text-backgroundColor cursor-not-allowed' : ''}
          `}
          {...props}
        />
      </div>
      {errorMessage && (
        <p className=' text-small text-errorColor'>{errorMessage}</p>
      )}
    </div>
  )
}
