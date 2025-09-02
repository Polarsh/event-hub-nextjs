import FilterForBigScreen from './FilterForBigScreen'
import FilterForSmallScreen from './FilterForSmallScreen'

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
    <div className='flex w-full justify-end items-center xm:flex-col'>
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

      {/* Para pantalla pequeña */}
      <FilterForSmallScreen
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        activeFilters={activeFilters}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
        isFilterActive={isFilterActive}
        isLoading={isLoading}
        isSortActive={isSortActive}
        handleClearAll={clearFilters}
      />
    </div>
  )
}
