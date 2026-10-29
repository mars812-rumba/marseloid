"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { CaseModule } from "@/lib/case-studies";
import { CaseImageViewer } from "@/components/case-image-viewer";
import styles from "./case-study.module.css";

export function CaseModules({ modules }: { modules: CaseModule[] }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  function navigate(event: KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (active + 1) % modules.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (active - 1 + modules.length) % modules.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = modules.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }
  return (
    <div className={styles.workspace} data-case-features="">
      <div
        className={styles.moduleTabs}
        role="tablist"
        aria-label="Возможности системы"
      >
        {modules.map((module, index) => (
          <button
            key={module.id}
            type="button"
            role="tab"
            id={`${id}-tab-${module.id}`}
            aria-controls={`${id}-panel-${module.id}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            onClick={() => setActive(index)}
            onKeyDown={navigate}
          >
            <span className={styles.moduleNumber} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{module.label}</span>
            <span className={styles.moduleArrow} aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div className={styles.modulePanels}>
        {modules.map((module, index) => (
          <section
            key={module.id}
            className={styles.modulePanel}
            hidden={active !== index}
            id={`${id}-panel-${module.id}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${module.id}`}
            tabIndex={0}
          >
            <CaseImageViewer images={module.images} title={module.label} />
            <p className="eyebrow">
              Модуль / {String(index + 1).padStart(2, "0")}
            </p>
            <h3>{module.title}</h3>
            <p className={styles.moduleDescription}>{module.description}</p>
            {module.detail && (
              <p className={styles.moduleDescription}>{module.detail}</p>
            )}
            <ul className={styles.featureList}>
              {module.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            {module.link && (
              <a
                className="text-link"
                href={module.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {module.link.label} ↗
                <span className="sr-only"> (в новой вкладке)</span>
              </a>
            )}
            {module.note && <p className={styles.moduleNote}>{module.note}</p>}
          </section>
        ))}
      </div>
      <noscript>
        <style>{`.${styles.moduleTabs}{display:none}.${styles.workspace}{display:block}.${styles.modulePanel}[hidden]{display:block;margin-top:48px}`}</style>
      </noscript>
    </div>
  );
}
