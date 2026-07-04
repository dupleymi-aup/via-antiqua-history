'use client'

import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const WORDS_PER_MINUTE = 200

interface ReadingTimeProps {
  text: string | string[]
  className?: string
}

export function ReadingTime({ text, className }: ReadingTimeProps) {
  const words = Array.isArray(text) ? text.join(' ').length : text.length
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
  const wordSuffix = minutes === 1 ? 'слово' : minutes < 5 ? 'слова' : 'слов'

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 text-xs text-muted-foreground/70',
        className
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      <span>
        ~{minutes} {minutes === 1 ? 'мин' : minutes < 5 ? 'мин' : 'мин'} · {words} {wordSuffix}
      </span>
    </div>
  )
}
