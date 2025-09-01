'use client'

import React from 'react'

import Page from '@/components/common/Page'
import EventsGrid from '@/components/event/EventGrid'
import useEvent from '@/hooks/useEvent'

import DinamicFilter from '@/components/common/DinamicFilter/DinamicFilter'
import { SearchBox } from '@/components/common/SearchBox'
import { useInputSearch } from '@/hooks/useInputSearch'
import { useDynamicFilters } from '@/hooks/useDinamicFilter'

export default function EventHome() {
  const { inputSearch, searchQuery, onChangeInput, clearInput } =
    useInputSearch()

  const {
    filterOptions,
    sortOptions,
    activeFilters,
    activeSorts,
    handleFilterChange,
    handleSortChange,
    clearFilters,
    isFilterActive,
    isSortActive,
    isLoading,
    debouncedFilters,
  } = useDynamicFilters()

  const filters = {
    searchQuery,
    filters: debouncedFilters,
  }

  const { eventList, isPendingEventList } = useEvent({ filters })

  return (
    <Page>
      <h1 className='sr-only hidden'>Eventos</h1>

      <SearchBox
        value={inputSearch}
        onChange={onChangeInput}
        onClear={clearInput}
      />
      <DinamicFilter
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
      <EventsGrid
        title={'Eventos'}
        events={eventList}
        isLoading={isPendingEventList}
      />
    </Page>
  )
}
