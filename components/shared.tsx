import Link from "next/link";
import Image from "next/image";
import { cases, services } from "@/lib/content";
import { MotionLink, Reveal } from "@/components/motion";
import { ChimneyCover } from "@/components/chimney-cover";
export function CTA() {
  return (
    <Reveal as="section" className="contact-band wrap">
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
        <MotionLink className="button light" href="/contact/">
          Обсудить задачу <span aria-hidden="true">↗</span>
        </MotionLink>
      </div>
    </Reveal>
  );
}
export function Services() {
  return (
    <div className="service-list">
      {services.map((s, i) => (
        <MotionLink
          reveal
          delay={i * 0.07}
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
        </MotionLink>
      ))}
    </div>
  );
}
export function ProjectArt({ tone }: { tone: string }) {
  if (tone === "chimney") return <ChimneyCover />;
  return (
    <div className={`project-art ${tone}`} aria-hidden="true">
      <Image
        src={
          tone === "booking"
            ? "/cases/sunny-booking/fleet-desktop.webp"
            : "/cases/sunny-rentals/home-desktop.webp"
        }
        alt=""
        fill
        sizes="(max-width: 767px) 90vw, 50vw"
        style={{ objectFit: "cover", objectPosition: "top" }}
      />
    </div>
  );
}

export function Projects() {
  return (
    <div className="projects">
      {cases.map((c, i) => (
        <MotionLink
          reveal
          delay={i * 0.1}
          className="project-card"
          href={`/cases/${c.slug}/`}
          key={c.slug}
        >
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
        </MotionLink>
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
    <Reveal className="page-intro">
      <Link className="breadcrumb" href="/">
        Главная <span aria-hidden="true">/</span>
      </Link>
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="intro-text">{description}</p>
    </Reveal>
  );
}
export function ArticleSections({ sections }: { sections: string[][] }) {
  return (
    <div className="prose">
      {sections.map(([title, body]) => (
        <Reveal as="section" key={title}>
          <h2>{title}</h2>
          <p>{body}</p>
        </Reveal>
      ))}
    </div>
  );
}
