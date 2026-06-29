import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/site/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookmarksProvider } from "@/components/site/bookmarks";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://via-antiqua-history.vercel.app'),
  title: {
    default: "История Древнего Пути — Интерактивный исторический лабиринт",
    template: "%s | История Древнего Пути"
  },
  description:
    "Интерактивная историческая энциклопедия античного мира — Древняя Греция, Римская империя, Месопотамия и Кубань как единое культурное пространство. 18 городов, 32+ памятников, 12 персоналий, 7 чудес света.",
  keywords: [
    "Древняя Греция",
    "Римская империя", 
    "Месопотамия",
    "Кубань",
    "Боспорское царство",
    "Акрополь",
    "Парфенон",
    "история античности",
    "античные цивилизации",
    "Чудеса света",
    "Дуплей Максим Игоревич",
    "исторический лабиринт",
    "via antiqua",
    "эллинизм",
    "Pax Romana",
  ],
  authors: [{ name: "Дуплей Максим Игоревич" }],
  creator: "Дуплей Максим Игоревич",
  publisher: "Дуплей Максим Игоревич",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "История Древнего Пути — Интерактивный исторический лабиринт",
    description:
      "Интерактивная историческая энциклопедия античного мира — Греция, Рим, Междуречье и Кубань как единое культурное пространство.",
    type: "website",
    locale: "ru_RU",
    siteName: "История Древнего Пути",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "История Древнего Пути",
      },
    ],
  },
  category: "education",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F4EE" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1612" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${cormorant.variable} ${ebGaramond.variable}`}>
      <body
        className="font-body antialiased bg-background text-foreground"
      >
        <a href="#main-content" className="skip-link">
          Перейти к основному содержанию
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <BookmarksProvider>
              {children}
         </BookmarksProvider>
        </AuthProvider>
      </ThemeProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "История Древнего Пути — Интерактивный исторический лабиринт",
            description:
              "Интерактивная историческая энциклопедия античного мира — Древняя Греция, Римская империя, Месопотамия и Кубань как единое культурное пространство. Глоссарий 50+ терминов, 18 античных городов, 44 памятника, 12 персоналий, 7 чудес света, лента времени, интерактивная карта и сравнительный анализ цивилизаций.",
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://via-antiqua-history.vercel.app',
            author: { '@type': 'Person', name: 'Дуплей Максим Игоревич' },
            inLanguage: 'ru-RU',
            educationalLevel: 'beginner',
            educationalUse: 'reference',
          }),
        }}
      />
    </body>
    </html>
  );
}
