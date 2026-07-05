'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface SectionHeaderProps {
  icon: React.ReactNode
  label: string
  title: string
  description?: string
  readingTime?: React.ReactNode
  className?: string
}

export const SectionHeader = React.memo(function SectionHeader({
  icon,
  label,
  title,
  description,
  readingTime,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`mb-6 sm:mb-8 md:mb-10 text-center ${className ?? ''}`}
    >
      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-3 sm:mb-4">
        {icon}
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-medium">
          {label}
        </span>
      </div>
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
      {readingTime}
    </motion.div>
  )
})
