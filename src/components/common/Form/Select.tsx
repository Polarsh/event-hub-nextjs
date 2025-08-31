/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, XIcon } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import type {
  UseFormRegister,
  FieldError,
  UseFormSetValue,
  Merge,
  FieldErrorsImpl,
  UseFormWatch,
} from 'react-hook-form'

type Option = {
  value: string
  label: string
}

type SelectProps = {
  label: string
  name: string
  options: Option[]
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  required?: boolean
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  disabled?: boolean
  multiple?: boolean
}

export default function CustomSelect({
  label,
  name,
  options,
  register,
  setValue,
  watch,
  required,
  error,
  multiple = false,
  disabled = false,
}: SelectProps) {
  const errorMessage = (error as FieldError)?.message

  const [selected, setSelected] = useState<string | string[] | null>(
    multiple ? [] : null
  )
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const fieldValue = watch(name)

  const isDisabled = disabled || options.length === 0

  useEffect(() => {
    if (multiple) {
      if (Array.isArray(fieldValue)) {
        const filtered = fieldValue.filter(val =>
          options.some(opt => opt.value === val)
        )
        setSelected(filtered.length ? filtered : [])
      } else {
        setSelected([])
      }
    } else {
      if (
        typeof fieldValue === 'string' &&
        options.some(opt => opt.value === fieldValue)
      ) {
        setSelected(fieldValue)
      } else {
        setSelected(null)
      }
    }
  }, [fieldValue, options, multiple])

  useEffect(() => {
    register(name, { required: required ? 'This field is required' : false })
  }, [register, name, required])

  // Click fuera para cerrar dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsOpen(false)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOptionClick = (value: string) => {
    if (isDisabled) return // Si está deshabilitado, no hace nada

    if (multiple) {
      if (!Array.isArray(selected)) {
        setSelected([value])
        setValue(name, [value])
      } else {
        if (selected.includes(value)) {
          const newSelected = selected.filter(v => v !== value)
          setSelected(newSelected)
          setValue(name, newSelected)
        } else {
          const newSelected = [...selected, value]
          setSelected(newSelected)
          setValue(name, newSelected)
        }
      }
    } else {
      setSelected(value)
      setValue(name, value)
      setIsOpen(false)
    }
  }

  // Quitar tag
  const removeTag = (value: string) => {
    if (!Array.isArray(selected)) return
    const newSelected = selected.filter(v => v !== value)
    setSelected(newSelected)
    setValue(name, newSelected)
  }

  const renderSelectedText = () => {
    if (multiple) {
      return 'Por favor seleccione una opción'
    } else {
      if (!selected) return 'Por favor seleccione una opción'
      return options.find(opt => opt.value === selected)?.label
    }
  }

  return (
    <div className='flex flex-col gap-[16px]' ref={selectRef}>
      <label className='text-body font-bold text-titleColor'>
        {label} {required && <span className='text-errorColor'>*</span>}
      </label>

      <div
        className={`relative w-full border-b-2 p-2 flex items-center justify-between
          ${error ? 'border-errorColor' : 'border-gray-300'}
          ${isDisabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white cursor-pointer '}
          focus-within:border-secondary-main`}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}>
        <span className={`text-textColor ${!selected ? 'text-gray-400' : ''}`}>
          {renderSelectedText()}
        </span>
        <ChevronDown
          className={`transition-transform text-primaryColor ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </div>

      {/* Mostrar tags seleccionados en multiple */}
      {multiple && Array.isArray(selected) && selected.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-2'>
          {selected.map(val => {
            const label = options.find(opt => opt.value === val)?.label
            return (
              <div
                key={val}
                className='flex items-center bg-primaryColor text-white rounded-full px-3 py-1 text-sm'>
                {label}
                <button
                  type='button'
                  className='ml-2 focus:outline-none'
                  disabled={isDisabled}
                  onClick={e => {
                    e.stopPropagation()
                    removeTag(val)
                  }}>
                  <XIcon />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {isOpen && !isDisabled && (
        <div
          className='fixed bg-white border border-gray-300 shadow-md rounded-md z-50 max-h-[300px] overflow-y-auto'
          style={{
            top: selectRef.current
              ? selectRef.current.getBoundingClientRect().bottom + 5
              : 'auto',
            left: selectRef.current
              ? selectRef.current.getBoundingClientRect().left
              : 'auto',
            width: selectRef.current
              ? `${selectRef.current.offsetWidth}px`
              : 'auto',
          }}>
          {options.map(option => {
            const isSelected = multiple
              ? Array.isArray(selected) && selected.includes(option.value)
              : selected === option.value
            return (
              <div
                key={option.value}
                className={`p-2 cursor-pointer hover:bg-secondary transition ${
                  isSelected ? 'bg-primaryColor text-white' : ''
                }`}
                onClick={() => handleOptionClick(option.value)}>
                {option.label}
              </div>
            )
          })}
        </div>
      )}

      {errorMessage && (
        <span className='text-errorColor text-sm'>{errorMessage}</span>
      )}
    </div>
  )
}
