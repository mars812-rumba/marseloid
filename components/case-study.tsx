import Link from "next/link";
import { Code2, Files, SlidersHorizontal, LayoutDashboard } from "lucide-react";
import type { ReactNode } from "react";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseImageViewer } from "@/components/case-image-viewer";
import { CaseModules } from "@/components/case-modules";
import { Reveal } from "@/components/motion";
import styles from "./case-study.module.css";

const capabilityIcons = {
  code: Code2,
  files: Files,
  sliders: SlidersHorizontal,
  dashboard: LayoutDashboard,
};

type Project = { title: string; status: string; url: string; category: string };

export function CaseStudyPage({
  project,
  study,
  demonstration,
}: {
  project: Project;
  study: CaseStudy;
  demonstration?: ReactNode;
}) {
  return (
    <>
      <article className="wrap">
        <Reveal className={styles.hero}>
          <Link className="breadcrumb" href="/cases/">
            Все проекты <span aria-hidden="true">/</span>
          </Link>
          <p className="eyebrow">Коммерческая веб-система / {project.status}</p>
          <h1>{study.title ?? project.title}</h1>
          {study.subtitle && (
            <p className={styles.heroSubtitle}>{study.subtitle}</p>
          )}
          <div className={styles.heroGrid}>
            <div>
              {study.summary && (
                <p className={styles.heroSummary}>{study.summary}</p>
              )}
              <div className={styles.heroActions}>
                <a
                  className="button"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Смотреть сайт <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (в новой вкладке)</span>
                </a>
              </div>
            </div>
            <aside className={styles.heroAside}>
              <p>{study.audience}</p>
              <ul>
                {study.capabilities.map((item) => {
                  const Icon = item.icon
                    ? capabilityIcons[item.icon]
                    : undefined;
                  return (
                    <li key={item.label}>
                      {Icon && (
                        <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                      )}
                      <span>{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </Reveal>
        {study.story && (
          <section aria-labelledby="case-story-heading">
            <Reveal className={styles.story}>
              <h2 id="case-story-heading">{study.story.title}</h2>
              <div className={styles.editorialCopy}>
                {study.story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </section>
        )}
        {study.photography && (
          <section aria-labelledby="case-photography-heading">
            <Reveal className={styles.photography}>
              <div className={styles.editorialCopy}>
                <h2 id="case-photography-heading">{study.photography.title}</h2>
                {study.photography.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className={styles.photoGallery}>
                {study.photography.images.map((image) => (
                  <CaseImageViewer
                    key={image.src}
                    images={[image]}
                    title={image.alt}
                    actionLabel="Рассмотреть фото"
                  />
                ))}
              </div>
            </Reveal>
          </section>
        )}
        {demonstration && (
          <div className={styles.demonstration} id="demonstration">
            {demonstration}
          </div>
        )}
        {study.modules.length > 0 && (
          <section
            className={styles.modules}
            id="system-modules"
            aria-label="Модули проекта"
          >
            <CaseModules modules={study.modules} />
          </section>
        )}
        <section
          className={styles.engineering}
          aria-labelledby="case-engineering-heading"
        >
          <Reveal className={styles.engineeringIntro}>
            <p className="eyebrow">Техническая реализация</p>
            <h2 id="case-engineering-heading">{study.engineering.title}</h2>
            <p>{study.engineering.description}</p>
            <ul className={styles.technologies} aria-label="Технологии проекта">
              {study.engineering.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </Reveal>
          <ol className={styles.layers}>
            {study.engineering.layers.map((layer, index) => (
              <Reveal as="li" key={layer.title} delay={index * 0.05}>
                <span className={styles.moduleNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>
        <section
          className={styles.outcomes}
          aria-labelledby="case-outcomes-heading"
        >
          <Reveal className={styles.sectionHeading}>
            <div>
              <p className="eyebrow">Результат для бизнеса</p>
              <h2 id="case-outcomes-heading">{study.outcomesHeading}</h2>
            </div>
            <p>{study.outcomesIntro}</p>
          </Reveal>
          {study.outcomeComparison && (
            <Reveal className={styles.comparison}>
              {study.outcomeComparison.map((process) => (
                <div key={process.label}>
                  <h3>{process.label}</h3>
                  <ol>
                    {process.steps.map((step, index) => (
                      <li key={step}>
                        {index > 0 && <span aria-hidden="true">→</span>}
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </Reveal>
          )}
          <div className={styles.outcomeGrid}>
            {study.outcomes.map((outcome, index) => (
              <Reveal key={outcome.title} delay={index * 0.06}>
                <span className={styles.moduleNumber} aria-hidden="true">
                  /{String(index + 1).padStart(2, "0")}
                </span>
                <h3>{outcome.title}</h3>
                <p>{outcome.description}</p>
              </Reveal>
            ))}
          </div>
          {study.outcomesNote && (
            <p className={styles.outcomesNote}>{study.outcomesNote}</p>
          )}
        </section>
      </article>
      <Reveal as="section" className={`${styles.collaboration} wrap`}>
        <p className="eyebrow">Для бизнеса и агентств</p>
        <h2>{study.collaboration.title}</h2>
        <div className={styles.collaborationBottom}>
          <p>{study.collaboration.description}</p>
          <a
            className="button light"
            href={study.collaboration.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {study.collaboration.label} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (в новой вкладке)</span>
          </a>
        </div>
      </Reveal>
    </>
  );
}
