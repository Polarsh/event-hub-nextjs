'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  format,
  addDays,
  isBefore,
  isAfter,
  startOfDay,
  type Locale,
} from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { enUS, es } from 'date-fns/locale'
import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

type DatePickerProps = {
  name: string
  label: string
  required?: boolean
  minDate?: string | Date
  maxDate?: string | Date
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

export default function DatePickerField({
  label,
  name,
  required,
  minDate,
  maxDate,
  setValue,
  watch,
  error,
}: DatePickerProps) {
  const popoverRef = useRef<HTMLDivElement>(null)

  const loadedDate = new Date(watch(name))

  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    loadedDate || null
  )
  // Siempre inicializa currentMonth con una fecha válida
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  const errorMessage = (error as FieldError)?.message

  // Mapear el idioma de i18n a los locales de date-fns
  const locales: Record<string, Locale> = {
    en: enUS,
    es,
  }
  // const { i18n } = useTranslation();
  // const locale = locales[i18n.language] || enUS;
  const locale = es

  // Convertir minDate y maxDate en fechas reales
  const parseDate = (date: string | Date | undefined) => {
    if (!date) return undefined
    if (date === '0') return startOfDay(new Date())
    if (typeof date === 'string' && !isNaN(Number(date))) {
      return addDays(new Date(), Number(date))
    }
    return new Date(date)
  }

  const minDateParsed = parseDate(minDate)
  const maxDateParsed = parseDate(maxDate)

  // Lógica para cerrar el calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [popoverRef])

  const changeMonth = (offset: number) => {
    setCurrentMonth(prev => new Date(prev.setMonth(prev.getMonth() + offset)))
  }

  const generateDays = () => {
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    )
    const lastDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    )
    const daysArray = []

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null)
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      )
      daysArray.push(day)
    }

    return daysArray
  }

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    format(new Date(2024, 2, i + 3), 'EE', { locale }).replace(
      /^\w/,
      (c: string) => c.toUpperCase()
    )
  )

  const isMonthDisabled = (offset: number) => {
    const targetMonth = new Date(currentMonth)
    targetMonth.setMonth(targetMonth.getMonth() + offset)

    let checkDate
    if (offset > 0) {
      checkDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1)
    } else {
      checkDate = new Date(
        targetMonth.getFullYear(),
        targetMonth.getMonth() + 1,
        0
      )
    }

    return (
      (minDateParsed && isBefore(checkDate, minDateParsed)) ||
      (maxDateParsed && isAfter(checkDate, maxDateParsed))
    )
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    setValue(name, date)
    setIsOpen(false)
  }

  return (
    <div className='w-full flex flex-col gap-[16px]'>
      {/* Etiqueta */}
      <label htmlFor={name} className='text-body font-bold text-titleColor'>
        {label} {required && <span className='text-errorColor'>*</span>}
      </label>

      {/* Botón de apertura y Popover manual */}
      <div className='relative' ref={popoverRef}>
        <button
          type='button'
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className={`border-b-2 p-2 text-left text-textColor focus:outline-none placeholder:text-neutral-300 
            w-full overflow-hidden whitespace-normal text-wrap
            ${errorMessage ? 'text-errorColor border-errorColor' : 'border-gray-300'}
            focus:border-primaryColor`}>
          {selectedDate ? format(selectedDate, 'dd/MM/y') : 'DD/MM/YY'}
        </button>

        {isOpen && (
          <div
            className='absolute top-full mt-2 bg-white shadow-lg rounded-lg md:w-[400px] lg:w-[400px] px-[32px] py-4 border z-50'
            style={{
              // Estilos para centrar o posicionar el calendario
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
            {/* Encabezado de mes */}
            <div className='flex justify-between items-center gap-[10px] py-[16px]'>
              <button
                type='button'
                onClick={() => {
                  changeMonth(-1)
                }}
                className={`p-1 ${
                  isMonthDisabled(-1) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isMonthDisabled(-1)}>
                <ChevronLeftIcon className='h-6 w-6 text-gray-600 pointer-events-none' />
              </button>
              <span className='text-textColor font-bold text-body'>
                {format(currentMonth, 'MMMM yyyy', {
                  locale,
                }).replace(/^\w/, (c: string) => c.toUpperCase())}
              </span>
              <button
                type='button'
                onClick={() => {
                  changeMonth(1)
                }}
                className={`p-1 ${
                  isMonthDisabled(1) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isMonthDisabled(1)}>
                <ChevronRightIcon className='h-6 w-6 text-gray-600' />
              </button>
            </div>

            {/* Días de la semana */}
            <div className='grid grid-cols-7 text-center py-[8px]'>
              {daysOfWeek.map((day, index) => (
                <span key={index} className='text-sm font-medium text-gray-600'>
                  {day}
                </span>
              ))}
            </div>

            {/* Días del mes */}
            <div className='grid grid-cols-7 gap-1 py-2'>
              {generateDays().map((date, index) => {
                const isDisabled =
                  (minDateParsed && isBefore(date, minDateParsed)) ||
                  (maxDateParsed && isAfter(date, maxDateParsed))

                return (
                  <button
                    key={index}
                    type='button'
                    className={`flex h-[42px] items-center justify-center text-body text-textColor transition
                      ${
                        date
                          ? isDisabled
                            ? 'opacity-20 cursor-not-allowed'
                            : selectedDate?.toDateString() ===
                                date.toDateString()
                              ? 'bg-primaryColor text-white'
                              : 'hover:bg-secondaryColor'
                          : 'opacity-0'
                      }`}
                    onClick={() => {
                      if (!isDisabled) {
                        handleDayClick(date)
                      }
                    }}
                    disabled={!date || isDisabled}>
                    {date ? date.getDate() : ''}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <span className='text-errorColor text-sm'>{errorMessage}</span>
      )}
    </div>
  )
}
