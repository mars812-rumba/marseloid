import type { Metadata } from "next";
import Link from "next/link";
import { Demo } from "@/components/demo";
import { CTA, Projects, Services } from "@/components/shared";
import { MotionDiv, MotionLink, MotionSection } from "@/components/motion";
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
        <MotionDiv className="hero-grid">
          <h1>
            Конфигураторы
            <br />
            продукции, каталоги
            <br />и <span>автоматизация</span>
            <br />
            расчётов для бизнеса<span className="brand-dot">.</span>
          </h1>
          <div className="hero-copy">
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
          </div>
        </MotionDiv>
        <MotionDiv delay={0.08}>
          <Demo />
        </MotionDiv>
        <div className="hero-foot">
          <span>НЕЗАВИСИМЫЙ РАЗРАБОТЧИК</span>
          <span>ПРОДУКЦИЯ / ПРАВИЛА / РЕЗУЛЬТАТ</span>
        </div>
      </section>
      <MotionSection className="section wrap">
        <div className="section-heading">
          <p className="eyebrow">/01 — Что делаю</p>
          <h2>
            Между вашим прайсом
            <br />и готовым предложением.
          </h2>
          <p>
            Убираю ручные переходы между таблицами, подбором и работой
            менеджера.
          </p>
        </div>
        <Services />
      </MotionSection>
      <MotionSection className="section wrap">
        <div className="section-heading">
          <p className="eyebrow">/02 — Избранные проекты</p>
          <h2>
            Не только интерфейс.
            <br />
            Работающая логика.
          </h2>
          <Link className="text-link" href="/cases/">
            Все проекты ↗
          </Link>
        </div>
        <Projects />
        <p className="caption">
          Визуальные обложки — иллюстрации процессов, не скриншоты интерфейсов.
        </p>
      </MotionSection>
      <MotionSection className="section process-section wrap">
        <div>
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
        </div>
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
            <li key={title}>
              <span className="mono">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </MotionSection>
      <CTA />
    </>
  );
}
