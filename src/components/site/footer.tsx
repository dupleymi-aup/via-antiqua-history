import { Landmark, Feather, BookOpen, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { FOOTER_NAV, SOCIAL_LINKS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Landmark className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-semibold">
                Исторический Лабиринт
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Образовательный ресурс о цивилизациях Древней Греции, Рима,
              Месопотамии и Кубани. Интерактивная хронология, карта и авторский
              анализ единого античного пространства.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Разделы
            </h4>
            <ul className="space-y-2">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-3 flex items-center gap-2">
              <Feather className="h-4 w-4" /> Авторство
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Автор проекта:
              <br />
              <span className="font-medium text-foreground">
                Дуплей Максим Игоревич
              </span>
            </p>
            <p className="mt-3 text-xs text-muted-foreground italic leading-relaxed">
              Материалы сайта носят образовательный характер и основаны на
              классических исторических источниках. Цитирование — с указанием
              автора.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} «Исторический Лабиринт». Все права
            защищены.
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center md:justify-end">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                title={link.title}
              >
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
