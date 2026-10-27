import type { Metadata } from "next";
import Link from "next/link";
import { Demo } from "@/components/demo";
import { CTA, Projects, Services } from "@/components/shared";
import { MotionLink, Reveal } from "@/components/motion";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-line">
          <span className="eyebrow">
            <i className="small-cross" /> Marseloid / цифровые инструменты для
            бизнеса
          </span>
          <span className="mono hero-index">NEXT.JS / PYTHON</span>
        </div>
        <div className="hero-grid">
          <Reveal as="h1">
            Конфигураторы
            <br />
            продукции, каталоги
            <br />и <span>автоматизация</span>
            <br />
            расчётов для бизнеса<span className="brand-dot">.</span>
          </Reveal>
          <Reveal className="hero-copy" delay={0.12}>
            <p>
              Сложный продукт.
              <br />
              <strong>Понятный выбор.</strong>
            </p>
            <p>
              Разрабатываю веб-системы для компаний, где стоимость и
              комплектация зависят от десятков параметров. Работаю лично — от
              разбора задачи до запуска.
            </p>
            <MotionLink className="button" href="/contact/">
              Показать задачу <span aria-hidden="true">↗</span>
            </MotionLink>
            <a className="text-link" href="#demo">
              Посмотреть, как работает расчёт ↓
            </a>
          </Reveal>
        </div>
        <Reveal>
          <Demo />
        </Reveal>
        <div className="hero-foot">
          <span>НЕЗАВИСИМЫЙ РАЗРАБОТЧИК</span>
          <span>ПРОДУКЦИЯ / ПРАВИЛА / РЕЗУЛЬТАТ</span>
        </div>
      </section>
      <section className="section wrap">
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
        <Projects />
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
