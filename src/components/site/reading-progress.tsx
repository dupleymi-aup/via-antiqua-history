'use client'

import * as React from 'react'

export function ReadingProgress() {
  const [percentage, setPercentage] = React.useState(0)
  const lastPercentRef = React.useRef(0)

  React.useEffect(() => {
    let rafId: number | null = null
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
          if (scrollHeight > 0) {
            const next = Math.round((window.scrollY / scrollHeight) * 100)
            if (next !== lastPercentRef.current) {
              lastPercentRef.current = next
              setPercentage(next)
            }
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const isVisible = percentage > 5

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 h-1 z-[40] origin-left bg-primary transition-[transform] duration-150 ease-out"
        style={{ transform: `scaleX(${percentage / 100})` }}
      />
      {isVisible && (
        <div
          className="fixed top-12 sm:top-14 right-2 sm:right-3 h-5 sm:h-6 text-[9px] sm:text-[10px] font-medium text-muted-foreground bg-card border border-border px-1 sm:px-1.5 py-0.5 rounded shadow-sm z-40 leading-none flex items-center"
          role="status"
          aria-label={`Прочитано ${percentage}%`}
        >
          {percentage}%
        </div>
      )}
    </>
  )
}
