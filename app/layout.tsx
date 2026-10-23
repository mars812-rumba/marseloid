import type { Metadata } from "next";
import { Header } from "@/components/header";
import { MotionProvider } from "@/components/motion";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://marseloid.online"),
  title: {
    default: "Marseloid — конфигураторы, каталоги и автоматизация расчётов",
    template: "%s · Marseloid",
  },
  description:
    "Разрабатываю конфигураторы продукции, каталоги и системы расчёта стоимости для бизнеса. Работаю лично — от разбора задачи до запуска.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Marseloid",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Marseloid — сложный продукт, понятный выбор",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://marseloid.online/#website",
                  name: "Marseloid",
                  url: "https://marseloid.online/",
                  inLanguage: "ru",
                },
                {
                  "@type": "Person",
                  name: "Marseloid",
                  url: "https://marseloid.online/about",
                  sameAs: ["https://t.me/marseloid"],
                  jobTitle: "Независимый веб-разработчик",
                },
              ],
            }),
          }}
        />
        <a className="skip-link" href="#main">
          Перейти к содержимому
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <footer className="footer wrap">
            <Link className="logo" href="/">
              marseloid<span className="brand-dot">.</span>
            </Link>
            <p>Работаю лично. Создаю под задачу.</p>
            <div>
              <a href="https://t.me/marseloid">Telegram ↗</a>
              <Link href="/privacy/">Конфиденциальность</Link>
              <span>© {new Date().getFullYear()} Marseloid</span>
            </div>
          </footer>
        </MotionProvider>
      </body>
    </html>
  );
}
