import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTA, Projects, Services } from "@/components/shared";
import { MotionLink, Reveal } from "@/components/motion";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-content">
          <div className="hero-line">
            <span className="eyebrow">
              <i className="small-cross" /> Marseloid / цифровые инструменты для
              бизнеса
            </span>
          </div>
          <Reveal as="h1">
            Конфигураторы продукции, каталоги и&nbsp;<span>автоматизация</span>{" "}
            расчётов для бизнеса<span className="brand-dot">.</span>
          </Reveal>
          <Reveal className="developer-card" delay={0.12}>
            <div className="developer-identity">
              <Image
                className="developer-photo"
                src="/images/mars-profile.webp"
                alt="Фотография Марса"
                width={72}
                height={72}
                sizes="72px"
              />
              <div className="developer-details">
                <h2>Марс</h2>
                <p className="developer-role">Независимый веб-разработчик</p>
                <p className="developer-status">
                  <span aria-hidden="true" />
                  Открыт к сотрудничеству
                </p>
              </div>
            </div>
            <div className="developer-description">
              <p>
                Разрабатываю сайты и веб-приложения — от лендингов и небольших
                доработок до CRM и автоматизации. Работаю с бизнесом и
                веб-студиями.
              </p>
            </div>
            <MotionLink className="button" href="/contact/">
              Обсудить задачу <span aria-hidden="true">↗</span>
            </MotionLink>
          </Reveal>
          <nav className="hero-navigation" aria-label="Навигация первого экрана">
            <span>01 / 04 — ЗНАКОМСТВО</span>
            <a href="#services">
              Листайте вниз <span aria-hidden="true">↓</span>
            </a>
          </nav>
        </div>
      </section>
      <section className="section wrap" id="services" tabIndex={-1}>
        <Reveal className="section-heading">
          <p className="eyebrow">/01 — Что делаю</p>
          <h2>
            Между вашим прайсом
            <br />и готовым предложением.
          </h2>
          <p>
            Убираю ручные переходы между таблицами, подбором и работой
            менеджера.
          </p>
        </Reveal>
        <Services />
      </section>
      <section className="section wrap">
        <Reveal className="section-heading">
          <p className="eyebrow">/02 — Избранные проекты</p>
          <h2>
            Не только интерфейс.
            <br />
            Работающая логика.
          </h2>
          <Link className="text-link" href="/cases/">
            Все проекты ↗
          </Link>
        </Reveal>
        <Projects covers />
        <p className="caption">
          Дымоход Трейд, Sunny Rentals и Sunny Booking — реальные экраны
          проектов.
        </p>
      </section>
      <section className="section process-section wrap">
        <Reveal>
          <p className="eyebrow">/03 — Как работаем</p>
          <h2>
            Сначала разбираюсь.
            <br />
            Потом разрабатываю.
          </h2>
          <p className="section-description">
            Без лишнего функционала «на всякий случай». С понятными границами
            первой версии и проверкой на ваших примерах.
          </p>
          <Link className="text-link" href="/about/">
            Подробнее о подходе ↗
          </Link>
        </Reveal>
        <ol className="process">
          {[
            [
              "Ваша задача",
              "Разбираем, где теряется время и что нужно получить на выходе.",
            ],
            [
              "Правила и прототип",
              "Берём реальные примеры. Фиксируем формулы и границы первой версии.",
            ],
            [
              "Разработка и проверка",
              "Сверяем расчёты, собираем интерфейс и проверяем полный путь.",
            ],
            [
              "Запуск и передача",
              "Документируем систему и отдельно договариваемся о сопровождении.",
            ],
          ].map(([title, text], i) => (
            <Reveal as="li" key={title} delay={i * 0.07}>
              <span className="mono">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>
      <CTA />
    </>
  );
}
