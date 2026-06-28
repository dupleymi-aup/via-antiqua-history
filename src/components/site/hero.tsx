'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, BookOpen, Map as MapIcon, Sparkles, Landmark, Building2, Calendar, Users, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { allRegions, timeline, persons } from '@/lib/history-data'
import { useAnimatedCounter } from '@/hooks/use-animated-counter'
import { REGION_COLORS } from '@/lib/constants'

const regionChips = [
  { label: 'Греция', color: REGION_COLORS.greece },
  { label: 'Рим', color: REGION_COLORS.rome },
  { label: 'Месопотамия', color: REGION_COLORS.mesopotamia },
  { label: 'Кубань', color: REGION_COLORS.kuban },
]

export function Hero() {
  const citiesCount = allRegions.reduce(
    (acc, r) => acc + r.cities.length,
    0
  )
  const landmarksCount = allRegions.reduce(
    (acc, r) => acc + r.cities.reduce((a, c) => a + c.landmarks.length, 0),
    0
  )

  const stats = [
    { icon: <Building2 className="h-4 w-4" />, value: citiesCount, label: 'городов' },
    { icon: <Landmark className="h-4 w-4" />, value: landmarksCount, label: 'памятников' },
    { icon: <Calendar className="h-4 w-4" />, value: timeline.length, label: 'событий' },
    { icon: <Users className="h-4 w-4" />, value: persons.length, label: 'персоналий' },
  ]

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden parchment-bg pb-8 sm:pb-12"
    >
      {/* Декоративные круги */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.6 }}
          className="absolute -top-32 -left-32 h-48 w-48 sm:h-64 sm:w-64 md:h-96 md:w-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, oklch(0.7 0.13 60 / 0.22) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="absolute -bottom-32 -right-32 h-48 w-48 sm:h-64 sm:w-64 md:h-96 md:w-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, oklch(0.5 0.12 145 / 0.18) 0%, transparent 70%)',
          }}
        />
        <div className="absolute top-12 sm:top-14 left-0 right-0 meander-border text-primary" />
        <div className="absolute bottom-24 left-0 right-0 meander-border text-primary" />
      </div>

      <div className="h-20 sm:h-24 shrink-0" />
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-[1fr,auto] gap-10 lg:gap-16 items-center">
            {/* Левая колонка — основной контент */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
                <span className="block">Исторический Лабиринт</span>
                <span className="block gold-text mt-2">
                  От Эллады до Римских Пределов
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed font-body">
                Интерактивная историческая энциклопедия античного мира — Древняя
                Греция, Римская империя, Месопотамия и Кубань как части единого
                культурно-экономического пространства. Города, памятники и авторский
                анализ того, как эти территории тысячелетиями были связаны общими
                торговыми путями, языком и культурой.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {regionChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="px-4 py-2 rounded-full text-sm font-medium border border-border bg-card/60 backdrop-blur-sm flex items-center gap-2"
                    style={{ color: chip.color }}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: chip.color }}
                    />
                    {chip.label}
                  </span>
                ))}
              </div>

              {/* Статистика */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl"
              >
                {stats.map((s, i) => (
                  <StatCard key={i} icon={s.icon} value={s.value} label={s.label} />
                ))}
              </motion.div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="#greece"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                >
                  <BookOpen className="h-4 w-4" />
                  Начать путешествие
                </Link>
                <Link
                  href="#map"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md border border-border bg-card/60 backdrop-blur-sm hover:bg-accent/10 transition-colors font-medium"
                >
                  <MapIcon className="h-4 w-4" />
                  Открыть карту
                </Link>
              </div>
            </motion.div>

            {/* Правая колонка — автор */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex flex-col items-center"
            >
              <div className="relative mb-4">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg">
                  <img
                    src="/img/dupley_maxim.png"
                    alt="Дуплей Максим Игоревич"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>

              <div className="text-center">
                <p className="font-display text-lg font-semibold">
                  Дуплей Максим Игоревич
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Образовательный ресурс
                </p>
                <a
                  href="https://github.com/QuadDarv1ne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  QuadDarv1ne
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Скролл вниз */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-12 flex justify-center lg:justify-start"
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground animate-bounce" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: number
  label: string
}) {
  const animatedValue = useAnimatedCounter(value, 1400)
  return (
    <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm px-3 py-3">
      <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
        {icon}
        <span className="font-display text-2xl md:text-3xl font-bold gold-text tabular-nums">
          {animatedValue}
        </span>
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
