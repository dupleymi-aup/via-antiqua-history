'use client'

import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const WORDS_PER_SECOND = 3.3
const SECONDS_PER_MINUTE = 60

interface ReadingTimeProps {
  text: string | string[]
  className?: string
}

export function ReadingTime({ text, className }: ReadingTimeProps) {
  const raw = Array.isArray(text) ? text.join(' ') : text
  const wordCount = raw === '' ? 0 : raw.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / (WORDS_PER_SECOND * SECONDS_PER_MINUTE)))

  const minuteLabel = minutes % 10 === 1 && minutes % 100 !== 11
    ? 'минута'
    : minutes % 10 >= 2 && minutes % 10 <= 4 && (minutes % 100 < 10 || minutes % 100 >= 20)
      ? 'минуты'
      : 'минут'

  const wordLabel = wordCount % 10 === 1 && wordCount % 100 !== 11
    ? 'слово'
    : wordCount % 10 >= 2 && wordCount % 10 <= 4 && (wordCount % 100 < 10 || wordCount % 100 >= 20)
      ? 'слова'
      : 'слов'

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 text-xs text-muted-foreground/70',
        className
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      <span>
        ~{minutes} {minuteLabel} · {wordCount} {wordLabel}
      </span>
    </div>
  )
}
