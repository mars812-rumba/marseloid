import Link from "next/link";
import { cases, services } from "@/lib/content";
export function CTA() {
  return (
    <section className="contact-band wrap">
      <p className="eyebrow">Есть задача с ручным расчётом?</p>
      <h2>
        Покажите, как это
        <br />
        работает сейчас.
      </h2>
      <div className="contact-bottom">
        <p>
          Хватит таблицы или пары примеров.
          <br />
          Разберёмся, с чего начать.
        </p>
        <Link className="button light" href="/contact/">
          Обсудить задачу <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
export function Services() {
  return (
    <div className="service-list">
      {services.map((s) => (
        <Link
          className="service-row"
          href={`/services/${s.slug}/`}
          key={s.slug}
        >
          <span className="mono">/{s.number}</span>
          <h3>{s.title}</h3>
          <p>{s.short}</p>
          <span className="round-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      ))}
    </div>
  );
}
export function ProjectArt({ tone }: { tone: string }) {
  return (
    <div className={`project-art ${tone}`} aria-hidden="true">
      {tone === "chimney" ? (
        <>
          <span className="art-caption">ДЫМОХОД ТРЕЙД / ИНТЕРФЕЙС СИСТЕМЫ</span>
          <div className="pipe pipe-one" />
          <div className="pipe pipe-two" />
          <div className="pipe pipe-three" />
          <div className="art-chip">Подбор → состав → расчёт</div>
        </>
      ) : (
        <>
          <span className="art-caption">SUNNY RENTALS / В РАЗРАБОТКЕ</span>
          <div className="sun-shape" />
          <div className="calendar-art">
            <span>Доступность автопарка</span>
            <div>
              {Array.from({ length: 21 }, (_, i) => (
                <i
                  key={i}
                  className={
                    (i > 5 && i < 11) || (i > 14 && i < 19) ? "booked" : ""
                  }
                >
                  {i + 1}
                </i>
              ))}
            </div>
          </div>
          <div className="art-chip">Каталог → даты → бронирование</div>
        </>
      )}
    </div>
  );
}
export function Projects() {
  return (
    <div className="projects">
      {cases.map((c) => (
        <Link className="project-card" href={`/cases/${c.slug}/`} key={c.slug}>
          <ProjectArt tone={c.tone} />
          <div className="project-meta">
            <span className="eyebrow">{c.category}</span>
            <span className="project-status">{c.status}</span>
          </div>
          <h3>
            {c.title}
            <span aria-hidden="true">↗</span>
          </h3>
          <p>{c.description}</p>
        </Link>
      ))}
    </div>
  );
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <Link className="breadcrumb" href="/">
        Главная <span aria-hidden="true">/</span>
      </Link>
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="intro-text">{description}</p>
    </div>
  );
}
export function ArticleSections({ sections }: { sections: string[][] }) {
  return (
    <div className="prose">
      {sections.map(([title, body]) => (
        <section key={title}>
          <h2>{title}</h2>
          <p>{body}</p>
        </section>
      ))}
    </div>
  );
}
