import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CanopyDemo } from "@/components/canopy-demo";
import { MessengerLinks } from "@/components/messenger-links";
import { Projects } from "@/components/shared";
import { MotionLink, Reveal } from "@/components/motion";
import { home, homeProjectSummaries } from "@/lib/home-content";
import { PricingDetails, WorkProcess } from "@/components/commercial-details";
import {
  Calculator,
  MessagesSquare,
  ListFilter,
  Wrench,
  ArrowDown,
} from "lucide-react";
const taskIcons = [Calculator, MessagesSquare, ListFilter, Wrench];
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: home.metadata.title },
  description: home.metadata.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: home.metadata.title,
    description: home.metadata.description,
    url: "/",
    type: "website",
    locale: "ru_RU",
    siteName: "Марсель",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Марсель — сайты и веб-системы для бизнеса",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: home.metadata.title,
    description: home.metadata.description,
    images: ["/og.png"],
  },
};

function Heading({
  id,
  label,
  title,
  description,
}: {
  id: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className={`section-heading ${styles.heading}`}>
      <p className="eyebrow">{label}</p>
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}

export default function Home() {
  return (
    <div className={styles.home}>
      <section
        className={`hero wrap ${styles.hero}`}
        aria-label="Знакомство с разработчиком"
      >
        <div className="hero-content">
          <p className="eyebrow">Марсель / цифровые инструменты для бизнеса</p>
          <Reveal as="h1" className={styles.title}>
            {home.hero.before} <span>{home.hero.accent}</span> {home.hero.after}
            <span className="brand-dot">.</span>
          </Reveal>
          <Reveal className="developer-card" delay={0.12}>
            <div className="developer-identity">
              <Image
                className="developer-photo"
                src="/images/mars-profile.webp"
                alt="Марсель, независимый веб-разработчик"
                width={72}
                height={72}
                sizes="72px"
              />
              <div className="developer-details">
                <p className={styles.name}>{home.hero.name}</p>
                <p className="developer-role">{home.hero.role}</p>
                <p className="developer-status">
                  <span aria-hidden="true" />
                  {home.hero.status}
                </p>
              </div>
            </div>
            <div className="developer-description">
              <p>{home.hero.description}</p>
            </div>
            <MotionLink className="button" href="#contact">
              Обсудить задачу <span aria-hidden="true">↗</span>
            </MotionLink>
            <MessengerLinks />
          </Reveal>
        </div>
        <nav
          className={styles.heroFooter}
          aria-label="Навигация первого экрана"
        >
          <span>01 / ЗНАКОМСТВО</span>
          <a href="#tasks">
            Листайте вниз <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </section>

      <section
        className={`section wrap ${styles.section}`}
        id="tasks"
        tabIndex={-1}
        aria-labelledby="tasks-title"
      >
        <Heading
          id="tasks-title"
          label="/02 — Узнаёте свою задачу?"
          {...home.tasks}
        />
        <div className={styles.taskGrid}>
          {home.tasks.items.map((item, i) => {
            const Icon = taskIcons[i];
            return (
              <Reveal className={styles.task} key={item.title} delay={i * 0.07}>
                <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Link className="text-link" href="#contact">
          Расскажите, что сейчас не работает →
        </Link>
      </section>

      <section
        className={`section wrap ${styles.section}`}
        aria-labelledby="projects-title"
      >
        <Heading
          id="projects-title"
          label="/03 — Реализованные проекты"
          {...home.projects}
        />
        <div className={styles.projectGrid}>
          <Projects covers summaries={homeProjectSummaries} />
        </div>
        <Link className="text-link" href="/cases/">
          Все проекты ↗
        </Link>
      </section>

      <section
        className={`section wrap ${styles.section}`}
        aria-labelledby="interactive-title"
      >
        <Heading
          id="interactive-title"
          label="04 / ПОПРОБУЙТЕ САМИ"
          title={home.interactive.title}
          description={home.interactive.description}
        />
        <CanopyDemo />
        <div className={styles.demoFollowup}>
          <p className={styles.demoDisclaimer}>{home.interactive.disclaimer}</p>
          <h3>{home.interactive.followupTitle}</h3>
          <p>{home.interactive.followupDescription}</p>
          <MotionLink className="button" href="#contact">
            Обсудить задачу <span aria-hidden="true">↗</span>
          </MotionLink>
        </div>
      </section>

      <section
        className={`section wrap ${styles.section}`}
        aria-labelledby="services-title"
      >
        <Heading
          id="services-title"
          label="/05 — Что я разрабатываю"
          {...home.services}
        />
        <div className={styles.serviceGrid}>
          {home.services.items.map((item, i) => (
            <Reveal
              className={styles.serviceRow}
              key={item.title}
              delay={i * 0.07}
            >
              <span className="mono">0{i + 1}</span>
              <h3>{item.title}</h3>
              <div>
                <p>{item.description}</p>
                <Link className="text-link" href={item.href}>
                  {item.label} ↗
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className={`section wrap ${styles.section}`}
        aria-labelledby="comparison-title"
      >
        <Heading
          id="comparison-title"
          label="/06 — Было / Стало · Дымоход-Трейд"
          title={home.comparison.title}
          description={home.comparison.description}
        />
        <div className={styles.comparison}>
          {[
            { title: "Было", steps: home.comparison.before },
            { title: "Стало", steps: home.comparison.after },
          ].map((column, i) => (
            <Reveal
              className={i ? styles.after : styles.before}
              key={column.title}
            >
              <h3>{column.title}</h3>
              <ol>
                {column.steps.map((step) => (
                  <li key={step}>
                    <span>{step}</span>
                    <ArrowDown size={18} strokeWidth={1.5} aria-hidden="true" />
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
        <div className={styles.comparisonNotes}>
          <p>{home.comparison.note}</p>
          <p>{home.comparison.result}</p>
        </div>
        <Link className="text-link" href="/cases/chimneys/">
          Как устроена система «Дымоход-Трейд» ↗
        </Link>
      </section>

      <section
        className={`section wrap ${styles.section}`}
        aria-labelledby="pricing-title"
      >
        <Heading
          id="pricing-title"
          label="/07 — Стоимость разработки"
          {...home.pricing}
        />
        <PricingDetails href="#contact" />
      </section>

      <section
        className={`section wrap ${styles.section} ${styles.agencies}`}
        aria-labelledby="agencies-title"
      >
        <Heading
          id="agencies-title"
          label="/08 — Для веб-студий и агентств"
          title={home.agencies.title}
          description={home.agencies.description}
        />
        <div className={styles.agencyBody}>
          <Reveal>
            <p>{home.agencies.note}</p>
            <MotionLink className="button" href="#contact">
              Предложить сотрудничество <span aria-hidden="true">↗</span>
            </MotionLink>
          </Reveal>
          <Reveal>
            <ul className={styles.agencyList}>
              {home.agencies.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section
        className={`section wrap ${styles.section} ${styles.processSection}`}
        aria-labelledby="process-title"
      >
        <Reveal>
          <p className="eyebrow">/09 — Как я работаю</p>
          <h2 id="process-title">{home.process.title}</h2>
        </Reveal>
        <WorkProcess />
      </section>

      <section
        className={`contact-band wrap ${styles.contact}`}
        id="contact"
        tabIndex={-1}
        aria-labelledby="contact-title"
      >
        <Reveal>
          <p className="eyebrow">/10 — Напрямую с разработчиком</p>
          <h2 id="contact-title">{home.contact.title}</h2>
          <div className={`contact-bottom ${styles.contactBottom}`}>
            <p>{home.contact.description}</p>
            <div className={styles.contactActions}>
              <MotionLink className="button light" href={home.contact.href}>
                Обсудить проект <span aria-hidden="true">↗</span>
              </MotionLink>
              <a href={home.contact.href} className={styles.telegram}>
                @marseloid · Telegram
              </a>
              <Link className={styles.contactPage} href="/contact/">
                Другой способ описать задачу ↗
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
