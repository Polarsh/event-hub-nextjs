import { Search, XIcon } from 'lucide-react'

interface SearchBoxProps {
  value: string
  onChange: (e: any) => void
  onClear: () => void
}

export const SearchBox = ({
  value,
  onChange,
  onClear,
}: SearchBoxProps) => {
  return (
    <div
      className={`w-full rounded flex justify-start items-center px-4 gap-4 h-[56px] bg-zinc-100`}>
      <Search className='w-6 h-6 text-primaryColor' />
      <input
        value={value}
        onInput={onChange}
        className='w-full focus:outline-none text-neutral-main bg-transparent font-content text-body'
        placeholder='Estoy buscando ...'
      />
      {value && (
        <XIcon
          onClick={onClear}
          className='w-[24px] h-[24px] cursor-pointer text-[#067CBC] hover:text-primaryColor'
        />
      )}
    </div>
  )
}
