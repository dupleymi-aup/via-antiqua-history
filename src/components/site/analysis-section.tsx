'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Quote, Feather } from 'lucide-react'
import { authorAnalysis } from '@/lib/history-data'
import { cn } from '@/lib/utils'

export function AnalysisSection() {
  return (
    <section
      id="analysis"
      className="py-20 md:py-28 scroll-mt-20 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, oklch(0.55 0.1 60 / 0.04) 0%, oklch(0.55 0.1 50 / 0.07) 100%)',
      }}
    >
      <div className="absolute top-0 inset-x-0 meander-border text-primary" />
      <div className="absolute bottom-0 inset-x-0 meander-border text-primary" />

      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4">
            <Feather className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs uppercase tracking-widest font-medium">
              Авторский раздел
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">
            {authorAnalysis.sectionTitle}
          </h2>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6">
            Автор: {authorAnalysis.author}
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
            {authorAnalysis.intro}
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {authorAnalysis.sections.map((section, idx) => (
            <motion.article
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="rounded-xl border border-border bg-card p-6 md:p-10 relative"
            >
              <div className="absolute top-6 left-6 hidden md:block">
                <span className="font-display text-5xl font-bold text-primary/20">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="md:pl-14">
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-4 leading-tight">
                  {section.title}
                </h3>

                <div className="mb-5 p-4 rounded-lg border-l-4 border-primary bg-primary/5">
                  <div className="flex items-start gap-2">
                    <Quote className="h-4 w-4 text-primary shrink-0 mt-1" />
                    <p className="text-base md:text-lg italic leading-relaxed text-foreground/90 font-body">
                      {section.thesis}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {section.body.map((para, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-foreground/85"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 text-sm text-muted-foreground italic">
            <span className="h-px w-12 bg-border" />
            <span className="font-body">
              Автор: {authorAnalysis.author}
            </span>
            <span className="h-px w-12 bg-border" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
