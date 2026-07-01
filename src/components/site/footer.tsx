'use client'

import { motion } from 'framer-motion'
import { Landmark, BookOpen, ExternalLink, Heart } from 'lucide-react'
import Link from 'next/link'
import { FOOTER_NAV, SOCIAL_LINKS } from '@/lib/constants'

const socialIcons: Record<string, React.ReactNode> = {
  'Rutube': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 8.5v7a1 1 0 0 1-1.5.86l-5-2.86a1 1 0 0 1 0-1.72l5-2.86A1 1 0 0 1 16.5 8.5z"/>
    </svg>
  ),
  'GitHub': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  'VK': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.19 1.365 1.26 2.179 1.816.616.42 1.084.328 1.084.328l2.175-.03s1.138-.07.598-.964c-.044-.073-.313-.661-1.612-1.869-1.361-1.264-1.179-1.06.461-3.248.998-1.33 1.398-2.142 1.273-2.49-.12-.331-.857-.244-.857-.244l-2.453.015s-.182-.025-.317.056c-.131.079-.216.263-.216.263s-.388 1.032-.904 1.912c-1.089 1.856-1.526 1.953-1.704 1.838-.414-.267-.31-1.075-.31-1.649 0-1.794.272-2.542-.529-2.736-.266-.064-.461-.106-1.14-.113-.87-.009-1.606.003-2.023.207-.278.136-.492.439-.362.456.161.021.527.099.72.363.259.341.25 1.108.25 1.108s.149 2.11-.339 2.372c-.333.18-.789-.188-1.768-1.872-.501-.862-.879-1.814-.879-1.814s-.073-.179-.203-.276c-.158-.117-.378-.154-.378-.154l-2.332.015s-.35.01-.479.163c-.114.135-.009.414-.009.414s1.82 4.258 3.88 6.403c1.889 1.966 4.032 1.836 4.032 1.836h.972z"/>
    </svg>
  ),
  'VK Video': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.19 1.365 1.26 2.179 1.816.616.42 1.084.328 1.084.328l2.175-.03s1.138-.07.598-.964c-.044-.073-.313-.661-1.612-1.869-1.361-1.264-1.179-1.06.461-3.248.998-1.33 1.398-2.142 1.273-2.49-.12-.331-.857-.244-.857-.244l-2.453.015s-.182-.025-.317.056c-.131.079-.216.263-.216.263s-.388 1.032-.904 1.912c-1.089 1.856-1.526 1.953-1.704 1.838-.414-.267-.31-1.075-.31-1.649 0-1.794.272-2.542-.529-2.736-.266-.064-.461-.106-1.14-.113-.87-.009-1.606.003-2.023.207-.278.136-.492.439-.362.456.161.021.527.099.72.363.259.341.25 1.108.25 1.108s.149 2.11-.339 2.372c-.333.18-.789-.188-1.768-1.872-.501-.862-.879-1.814-.879-1.814s-.073-.179-.203-.276c-.158-.117-.378-.154-.378-.154l-2.332.015s-.35.01-.479.163c-.114.135-.009.414-.009.414s1.82 4.258 3.88 6.403c1.889 1.966 4.032 1.836 4.032 1.836h.972z"/>
    </svg>
  ),
  'ORCID': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.564 0 1.021.465 1.021 1.021s-.457 1.021-1.021 1.021a1.022 1.022 0 01-1.021-1.021c0-.564.457-1.021 1.021-1.021zm-.877 3.188h1.754v10.041H6.492V7.566zm3.403 0h4.211c2.602 0 4.146 1.878 4.146 4.472v.582c0 2.728-1.742 4.609-4.386 4.609H9.895V7.566zm1.754 1.563v6.971h2.282c2.143 0 2.728-1.611 2.728-3.486v-.505c0-1.809-.605-3.08-2.728-3.08H11.896z"/>
    </svg>
  ),
  'Школа программирования Maestro7IT': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
    </svg>
  ),
  'Stepik': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L1.6 6.1v11.8L12 24l10.4-6.1V6.1L12 0zm0 2.2l8.2 4.8v9.6L12 21.4 3.8 16.6V7L12 2.2zM11 6.5v3.5H8v2h3v6h2v-6h3v-2h-3v-3.5H11z"/>
    </svg>
  ),
  'Chess': (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 22H5v-2h14v2zm2-4H3l-1-2 1-1h18l1 1-1 2zm-9-8l-3-4-3 4h2v4h2v-4h2v4h2v-4h2l-3-4z"/>
    </svg>
  ),
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const colVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
  hover: { scale: 1.15, transition: { duration: 0.2 } },
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-gradient-to-b from-card/30 via-card/50 to-card/30">
      <div className="container mx-auto max-w-7xl px-4 py-10 sm:py-12 md:py-14">
        {/* Основная сетка */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10"
        >
          {/* Колонка 1: Лого + описание (lg:col-span-4) */}
          <motion.div variants={colVariants} className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Landmark className="h-6 w-6" />
              </span>
              <div>
                <span className="font-display text-lg font-semibold block leading-tight">
                  Исторический Лабиринт
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                  Via Antiqua
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground/80 leading-relaxed mb-5">
              Образовательный ресурс о цивилизациях Древней Греции, Рима,
              Месопотамии и Кубани. Интерактивная хронология, карта и авторский
              анализ единого античного пространства.
            </p>
            {/* Аватар автора */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border/50">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-display text-lg font-bold border-2 border-primary/20 shrink-0">
                М
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Дуплей Максим Игоревич
                </p>
                <a
                  href="https://github.com/QuadDarv1ne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  QuadDarv1ne
                </a>
              </div>
            </div>
          </motion.div>

          {/* Колонка 2: Разделы (lg:col-span-4) */}
          <motion.div variants={colVariants} className="lg:col-span-4">
            <h4 className="font-display text-sm font-semibold mb-4 flex items-center gap-2 text-foreground/90">
              <BookOpen className="h-4 w-4 text-primary" /> Разделы
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-200 group-hover:w-1.5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Колонка 3: Соцсети (lg:col-span-4) */}
          <motion.div variants={colVariants} className="lg:col-span-4">
            <h4 className="font-display text-sm font-semibold mb-4 flex items-center gap-2 text-foreground/90">
              <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              Контакты
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {SOCIAL_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={i}
                  variants={socialVariants}
                  whileHover="hover"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/40 border border-border/40 hover:border-primary/30 hover:bg-card/70 transition-all duration-200 text-muted-foreground/70 hover:text-foreground group"
                  title={link.title}
                >
                  <span className="transition-colors duration-200 group-hover:text-primary">
                    {socialIcons[link.label] || <ExternalLink className="h-4 w-4" />}
                  </span>
                  <span className="text-xs font-medium truncate">{link.label}</span>
                  <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Нижняя полоса */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground/60 text-center md:text-left">
            © {new Date().getFullYear()} «Исторический Лабиринт». Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground/50 flex items-center gap-1.5">
            Сделано с <Heart className="h-3 w-3 text-red-400 fill-red-400" /> для образования
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
