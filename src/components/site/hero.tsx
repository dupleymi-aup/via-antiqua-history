'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, BookOpen, Map as MapIcon, Landmark, Building2, Calendar, Users } from 'lucide-react'
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
    { icon: <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, value: citiesCount, label: 'городов' },
    { icon: <Landmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, value: landmarksCount, label: 'памятников' },
    { icon: <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, value: timeline.length, label: 'событий' },
    { icon: <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, value: persons.length, label: 'персоналий' },
  ]

  return (
    <section
      id="top"
      className="relative overflow-hidden parchment-bg"
    >
      {/* Декоративные круги */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.6 }}
          className="absolute -top-40 -left-40 h-64 w-64 sm:h-80 sm:w-80 md:h-[28rem] md:w-[28rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle, oklch(0.7 0.13 60 / 0.18) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="absolute -bottom-40 -right-40 h-64 w-64 sm:h-80 sm:w-80 md:h-[28rem] md:w-[28rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle, oklch(0.5 0.12 145 / 0.14) 0%, transparent 70%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-4 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        {/* Автор — компактная полоса над заголовком */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
            <img
              src="/img/dupley_maxim.jpg"
              alt="Дуплей Максим Игоревич"
              width={32}
              height={32}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-primary/20 shrink-0"
            />
            <span className="text-xs sm:text-sm font-medium text-foreground/80">
              Дуплей Максим Игоревич
            </span>
            <span className="hidden sm:inline text-xs text-muted-foreground">·</span>
            <span className="hidden sm:inline text-xs text-muted-foreground">
              Образовательный ресурс
            </span>
          </div>
        </motion.div>

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] tracking-tight">
            <span className="block">Исторический Лабиринт</span>
            <span className="block gold-text mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              От Эллады до Римских Пределов
            </span>
          </h1>
        </motion.div>

        {/* Описание */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-body"
        >
          Интерактивная историческая энциклопедия античного мира — Древняя
          Греция, Римская империя, Месопотамия и Кубань как части единого
          культурно-экономического пространства. Города, памятники и авторский
          анализ того, как эти территории тысячелетиями были связаны общими
          торговыми путями, языком и культурой.
        </motion.p>

        {/* Регионы + статистика + кнопки */}
        <div className="mt-6 sm:mt-8 flex flex-col gap-5 sm:gap-6">
          {/* Чипсы регионов */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {regionChips.map((chip, i) => {
              const sectionIds = ['#greece', '#rome', '#mesopotamia', '#kuban']
              return (
                <Link
                  key={chip.label}
                  href={sectionIds[i]}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-border bg-card/50 backdrop-blur-sm flex items-center gap-1.5 sm:gap-2 hover:border-primary/40 hover:bg-accent/5 transition-all"
                  style={{ color: chip.color }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full"
                    style={{ backgroundColor: chip.color }}
                  />
                  {chip.label}
                </Link>
              )
            })}
          </motion.div>

          {/* Статистика + кнопки в строку */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {stats.map((s, i) => (
                <StatCard key={i} icon={s.icon} value={s.value} label={s.label} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:ml-auto shrink-0">
              <Link
                href="#greece"
                className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-5 sm:px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base"
              >
                <BookOpen className="h-4 w-4" />
                Начать путешествие
              </Link>
              <Link
                href="#map"
                className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-5 sm:px-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:bg-accent/10 transition-colors font-medium text-sm sm:text-base"
              >
                <MapIcon className="h-4 w-4" />
                Открыть карту
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Скролл вниз */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 sm:mt-14 flex justify-center"
        >
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground/60 animate-bounce" aria-hidden="true" />
        </motion.div>
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
    <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm px-2.5 sm:px-3 py-2 sm:py-2.5">
      <div className="flex items-center justify-center gap-1 text-primary mb-0.5">
        {icon}
        <span className="font-display text-lg sm:text-xl md:text-2xl font-bold gold-text tabular-nums">
          {animatedValue}
        </span>
      </div>
      <div className="text-[10px] sm:text-xs text-muted-foreground text-center">{label}</div>
    </div>
  )
}
