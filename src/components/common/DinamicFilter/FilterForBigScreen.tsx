import { ArrowUpDown, Check, ChevronDown, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function FilterForBigScreen({
  filterOptions,
  sortOptions,
  activeFilters,
  activeSorts,
  handleFilterChange,
  handleSortChange,
  isFilterActive,
  isLoading,
  isSortActive,
  clearFilters,
}: any) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  // cierra los menús al hacer click fuera
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <div className='w-full flex flex-col gap-6'>
      {/* Título */}
      <h2 className='text-h2 text-titleColor'>Filtros</h2>

      {/* Bar: filtros (izq) + Sort by (der) */}
      <div className='flex w-full items-start justify-between gap-8'>
        {/* Pills de filtros */}
        <div className='flex items-start gap-4' ref={menuRef}>
          {filterOptions.map((category: any) => {
            const isCategoryFiltered =
              category.children.filter((f: any) =>
                isFilterActive(category.id, f.value)
              ).length > 0

            return (
              <div key={category.name} className='relative'>
                <button
                  aria-expanded={openMenu === category.name}
                  onClick={() => {
                    setOpenMenu(v =>
                      v === category.name ? null : category.name
                    )
                  }}
                  className={`
                        flex items-center justify-between w-[200px] h-[40px] p-2 rounded-[4px] border-2 
                        border-primaryColor text-link font-bold
                        text-textColor hover:text-primaryColor
                        ${openMenu === category.name && 'bg-primaryColor text-white hover:text-white'}
                        ${isCategoryFiltered && 'bg-primaryColor text-white hover:text-white'}
                      `}>
                  {/* Texto e ícono */}
                  <span className='inline-flex items-center gap-2'>
                    <category.icon className='h-6 w-6' />
                    {category.name}
                  </span>

                  {/* Flecha */}
                  <ChevronDown
                    className={`h-6 w-6 transform transition-transform duration-300 ${
                      openMenu === category.name ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {/* Panel dropdown */}
                {openMenu === category.name && (
                  <div
                    className='absolute z-30 w-[200px] overflow-auto bg-white'
                    role='menu'>
                    <ul className='flex flex-col gap-2 py-2'>
                      {category.children.map((filter: any) => {
                        const active = isFilterActive(category.id, filter.value)
                        return (
                          <li key={filter.value} className='px-2 py-1'>
                            <label
                              htmlFor={`${category.name}-${filter.value}`}
                              className='flex items-center gap-2 cursor-pointer select-none'>
                              {/* Input nativo oculto (controla el estado) */}
                              <input
                                id={`${category.name}-${filter.value}`}
                                type='checkbox'
                                checked={active}
                                onChange={() =>
                                  handleFilterChange(category.id, filter.value)
                                }
                                className='peer sr-only'
                              />

                              {/* Caja visual del checkbox */}
                              <span
                                className='w-4 h-4 rounded-[4px] flex items-center justify-center border border-gray-400 bg-white transition peer-checked:bg-primaryColor peer-checked:border-transparent'
                                aria-hidden='true'>
                                <Check className='h-3 w-3 text-white transition' />
                              </span>

                              {/* Texto */}
                              <span className='text-body text-textColor hover:text-primaryColor'>
                                {filter.label}
                              </span>
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Columna Sort by (menú) */}
        <div className='w-[186px] relative' ref={sortRef}>
          {/* Botón disparador */}
          <button
            type='button'
            aria-haspopup='listbox'
            aria-expanded={isSortOpen}
            onClick={() => {
              setIsSortOpen(v => !v)
            }}
            className='flex flex-row py-2 justify-between w-full items-center'>
            <span className=' font-content text-body font-bold text-neutral-main'>
              {activeSorts.length > 0
                ? `Ordenar por (${activeSorts.length})`
                : `Ordenar por`}
            </span>
            <ArrowUpDown className='h-5 w-5 ' />
          </button>

          {/* Popover */}
          {isSortOpen && (
            <ul role='listbox' className='absolute z-30 w-full bg-white'>
              {sortOptions.map((opt: any) => {
                const selected = isSortActive(opt.value)
                return (
                  <li key={opt.value}>
                    <button
                      role='option'
                      onClick={() => {
                        handleSortChange(opt.value)
                        /* setIsSortOpen(false); */
                      }}
                      className={`flex w-full items-center p-2 transition hover:bg-secondaryColor text-neutral-main font-content text-small
                        ${
                          selected
                            ? 'font-bold bg-primaryColor text-white hover:text-textColor'
                            : 'text-textColor'
                        }
                      `}>
                      <span className='truncate'>{opt.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Línea de chips seleccionados + Clear All */}
      {activeFilters?.length > 0 && (
        <div className='flex-wrap inline-flex w-full items-center gap-2'>
          <div className='flex flex-wrap gap-2'>
            {filterOptions.map((category: any) =>
              category.children.map(
                (filter: any) =>
                  // Solo renderiza el chip si el filtro está activo
                  isFilterActive(category.id, filter.value) && (
                    <button
                      key={filter.value} // Usamos el 'id' del filtro como clave única
                      onClick={() =>
                        handleFilterChange(category.id, filter.value)
                      }
                      className='px-2 py-1 rounded-[4px] bg-[#EEEFF1] group'
                      aria-label={`Remove filter: ${filter.value}`}>
                      <span className=' text-textColor group-hover:font-semibold text-body flex flex-row justify-between items-center gap-2'>
                        {filter.label}
                        <XIcon className='w-2 h-2 text-textColor group-hover:text-primaryColor' />
                      </span>
                    </button>
                  )
              )
            )}
          </div>

          <button
            onClick={clearFilters}
            className='text-body text-primaryColor hover:underline'>
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  )
}
