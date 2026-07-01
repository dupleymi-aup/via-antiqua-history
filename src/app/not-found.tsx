'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Compass, Home, Landmark } from 'lucide-react'

export default function NotFound() {
  return (
    <main role="alert" className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="text-center max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <Landmark className="h-5 w-5" />
          </motion.span>
        </Link>

        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 14, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-muted border border-border">
            <Compass className="h-8 w-8 text-muted-foreground" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="font-display text-5xl sm:text-6xl font-semibold mb-2 gold-text"
        >
          404 — Путь не найден
        </motion.h1>



        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-muted-foreground mb-8 leading-relaxed"
        >
          Эта страница затерялась в лабиринте истории. Возможно, она никогда не
          существовала или была разрушена временем.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-10 sm:h-11 px-5 sm:px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base"
          >
            <Home className="h-4 w-4" />
            Вернуться к началу
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
