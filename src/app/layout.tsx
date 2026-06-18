import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Исторический Лабиринт: От Эллады до Римских Пределов",
  description:
    "Образовательный ресурс о цивилизациях Древней Греции, Рима, Месопотамии и Кубани. Авторский исторический анализ единого античного пространства. Автор: Дуплей Максим Игоревич.",
  keywords: [
    "Древняя Греция",
    "Римская империя",
    "Месопотамия",
    "Кубань",
    "Боспорское царство",
    "Акрополь",
    "история античности",
    "Дуплей Максим Игоревич",
  ],
  authors: [{ name: "Дуплей Максим Игоревич" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Исторический Лабиринт: От Эллады до Римских Пределов",
    description:
      "Интерактивная историческая энциклопедия античного мира — Греция, Рим, Междуречье и Кубань как единое культурное пространство.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} font-body antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
