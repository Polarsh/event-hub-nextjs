import React from 'react'

export default function TagPill({ tags }: { tags: string[] }) {
  return (
    <>
      {tags.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {tags.map((tag: string, index: number) => (
            <span
              key={index}
              className='px-3 py-1 cursor-pointer text-small font-bold text-primaryColor bg-secondaryColor rounded-full'>
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  )
}
