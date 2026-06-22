'use client'

import * as React from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const [percentage, setPercentage] = React.useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setPercentage(Math.round(latest * 100))
  })

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 z-[60] origin-left"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed top-0 right-0 text-[10px] font-medium text-muted-foreground bg-card/80 backdrop-blur-sm px-2 py-0.5 rounded-bl z-[61]"
        initial={{ opacity: 0 }}
        animate={{ opacity: percentage > 5 ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {percentage}%
      </motion.div>
    </>
  )
}
