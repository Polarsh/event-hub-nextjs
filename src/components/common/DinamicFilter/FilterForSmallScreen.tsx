import { useRef, useState } from 'react'
import { Check, ChevronDownIcon, Filter, XIcon } from 'lucide-react'
import Button, { ButtonStyle } from '../Button'

export default function FilterForSmallScreen({
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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Función para abrir/cerrar el drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <div className='flex lg:hidden justify-end items-center'>
      {/* Título */}
      <Button
        variant={ButtonStyle.Outline}
        onClick={toggleDrawer}
        className=' p-2 gap-4 max-h-[44px]'
        icon={Filter}
        iconPosition='left'
        label='Filtrar y ordenar'
      />

      {/* Drawer Overlay (Fondo oscuro) */}
      {isDrawerOpen && (
        <div
          className='fixed inset-0 flex flex-col z-50 bg-black bg-opacity-50 transition-opacity duration-300'
          onClick={toggleDrawer}>
          <div
            // Usamos una clase condicional para el ancho
            className={`fixed top-0 right-0 w-full h-full bg-white overflow-scroll transition-transform duration-300 transform ${
              isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={e => {
              e.stopPropagation()
            }} // Evita que el click en el drawer cierre el overlay
          >
            <div className=' p-[24px] flex flex-col gap-[32px]'>
              {/* Título */}
              <div className='flex justify-between gap-[32px] items-center pb-4 border-b border-grey-main'>
                <h2 className='text-h2 text-titleColor'>
                  Filtros y ordenamiento
                </h2>
                <div className='flex gap-6'>
                  {activeFilters.length > 0 && (
                    <button
                      type='button'
                      onClick={clearFilters}
                      className='font-content text-body text-neutral-main hover:underline'>
                      Limpiar filtros
                    </button>
                  )}
                  <XIcon
                    onClick={toggleDrawer}
                    className=' text-secondary-main w-6 h-6 hover:cursor-pointer'
                  />
                </div>
              </div>

              {/* Filtros aplicados */}
              <div className='flex flex-col gap-[32px]'>
                <h3 className=' font-content text-link text-neutral-main'>
                  Filtros aplicados
                </h3>
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
                                className='px-2 py-1 rounded-[4px] border border-grey-main bg-white group'
                                aria-label={`Remove filter: ${filter.value}`}>
                                <span className=' text-neutral-main group-hover:font-semibold  text-body font-content flex flex-row justify-between items-center gap-2'>
                                  {filter.label}
                                  <XIcon className='w-2 h-2 text-neutral-main group-hover:text-secondary-main' />
                                </span>
                              </button>
                            )
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Filtros */}
              <div className='flex flex-col gap-[32px]' ref={menuRef}>
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
                              flex items-center justify-between w-full h-[48px] p-2 pb-4 border-b border-primaryColor
                              text-link font-bold text-textColor hover:text-primaryColor
                              ${openMenu === category.name && 'bg-primaryColor text-white hover:text-white'}
                              ${isCategoryFiltered && 'bg-primaryColor text-white hover:text-white'}
                            `}>
                        {/* Texto e ícono */}
                        <span className='inline-flex items-center gap-2'>
                          <category.icon className='h-6 w-6' />
                          {category.name}
                        </span>

                        {/* Flecha */}
                        <ChevronDownIcon
                          className={`h-6 w-6 transform transition-transform duration-300 ${
                            openMenu === category.name
                              ? 'rotate-180'
                              : 'rotate-0'
                          }`}
                        />
                      </button>

                      {/* Panel dropdown */}
                      {openMenu === category.name && (
                        <div
                          className=' w-full overflow-auto bg-white pt-2'
                          role='menu'>
                          <ul className='flex flex-col gap-2 p-2'>
                            {category.children.map((filter: any) => {
                              const active = isFilterActive(
                                category.id,
                                filter.value
                              )
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
                                        handleFilterChange(
                                          category.id,
                                          filter.value
                                        )
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

              {/* Sort By */}
              <div className='flex flex-col gap-[32px]'>
                <h3 className=' font-content text-link text-neutral-main'>
                  Ordenar por
                </h3>
                <ul role='listbox' className=' w-full bg-white'>
                  {sortOptions.map((opt: any) => {
                    const selected = isSortActive(opt.value)
                    return (
                      <li key={opt.value}>
                        <button
                          role='option'
                          type='button'
                          onClick={() => {
                            handleSortChange(opt.value)
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
