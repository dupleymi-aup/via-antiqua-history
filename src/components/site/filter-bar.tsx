'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface FilterOption {
  key: string
  label: string
  color?: string
}

interface FilterBarProps {
  options: FilterOption[]
  active: string
  onChange: (key: string) => void
  className?: string
}

export const FilterBar = React.memo(function FilterBar({
  options,
  active,
  onChange,
  className,
}: FilterBarProps) {
  return (
    <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${className ?? ''}`}>
      {options.map((opt) => (
        <button
          type="button"
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={cn(
            'px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
            active === opt.key
              ? 'text-white border-transparent'
              : 'bg-card border-border hover:border-primary/40'
          )}
          style={
            active === opt.key && opt.color
              ? { backgroundColor: opt.color }
              : opt.color
                ? { color: opt.color }
                : undefined
          }
        >
          {opt.color && (
            <span
              className="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full mr-1.5"
              style={{
                backgroundColor:
                  active === opt.key ? 'white' : opt.color,
              }}
            />
          )}
          {opt.label}
        </button>
      ))}
    </div>
  )
})
