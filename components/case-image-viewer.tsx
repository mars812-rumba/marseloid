"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { CaseImage } from "@/lib/case-studies";
import styles from "./case-study.module.css";

export function CaseImageViewer({
  images,
  title,
}: {
  images: CaseImage[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [originalSize, setOriginalSize] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const current = images[active];
  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expanded]);
  if (!current) return null;
  function enlarge() {
    setOriginalSize(false);
    setExpanded(true);
    dialog.current?.showModal();
  }
  return (
    <div className={styles.imageViewer} data-case-image-viewer="">
      {images.length > 1 && (
        <div
          className={styles.imagePicker}
          role="group"
          aria-label={`Изображения: ${title}`}
        >
          {images.map((item, index) => (
            <button
              key={item.src}
              type="button"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span aria-hidden="true">0{index + 1}</span>{" "}
              {item.label || `Экран ${index + 1}`}
            </button>
          ))}
        </div>
      )}
      <figure>
        <button
          className={styles.screenButton}
          type="button"
          onClick={enlarge}
          aria-label={`Увеличить: ${current.alt}`}
          aria-haspopup="dialog"
        >
          <span
            className={`${styles.screenFrame} ${current.height > current.width ? styles.portrait : ""}`}
          >
            <Image
              src={current.src}
              width={current.width}
              height={current.height}
              alt={current.alt}
              sizes="(max-width: 767px) 90vw, (max-width: 1100px) 65vw, 850px"
            />
          </span>
          <span className={styles.imageAction}>
            Рассмотреть экран <span aria-hidden="true">↗</span>
          </span>
        </button>
        <figcaption>{current.caption}</figcaption>
      </figure>
      <noscript>
        <p>
          {images.map((item, index) => (
            <a className="text-link" key={item.src} href={item.src}>
              Открыть изображение {index + 1} ↗{" "}
            </a>
          ))}
        </p>
      </noscript>
      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-labelledby={`${id}-title`}
        onClose={() => setExpanded(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className={styles.lightboxContent}>
          <div className={styles.lightboxHeading}>
            <h2 id={`${id}-title`}>{title}</h2>
            <button type="button" onClick={() => dialog.current?.close()}>
              Закрыть <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className={styles.lightboxTools}>
            <button
              type="button"
              aria-pressed={originalSize}
              onClick={() => setOriginalSize((value) => !value)}
            >
              {originalSize ? "Вписать в окно" : "Оригинальный размер"}
            </button>
            <a href={current.src} target="_blank" rel="noopener noreferrer">
              Открыть файл ↗<span className="sr-only"> (в новой вкладке)</span>
            </a>
          </div>
          {expanded && (
            <div
              className={`${styles.lightboxScroll} ${originalSize ? styles.originalSize : ""}`}
              role="region"
              tabIndex={0}
              aria-label="Изображение с прокруткой"
            >
              <Image
                src={current.src}
                width={current.width}
                height={current.height}
                alt={current.alt}
                unoptimized
              />
            </div>
          )}
          <p className={styles.lightboxCaption}>{current.caption}</p>
        </div>
      </dialog>
    </div>
  );
}
