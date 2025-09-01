import FilterForBigScreen from './FilterForBigScreen'

export default function DinamicFilter({
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
  return (
    <div className='flex w-full justify-end items-center'>
      {/* Filtros para pantalla grande (xm:flex) */}
      <FilterForBigScreen
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        activeFilters={activeFilters}
        activeSorts={activeSorts}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
        isFilterActive={isFilterActive}
        isLoading={isLoading}
        isSortActive={isSortActive}
        clearFilters={clearFilters}
      />
    </div>
  )
}
