"use client";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./canopy-demo.module.css";
const Demo = dynamic(
  () => import("@/components/demo").then((module) => module.Demo),
  {
    loading: () => <p role="status">Загружаю интерактивный пример…</p>,
  },
);
/** Mount once near the viewport; keep values when scrolling away. */
export function CanopyDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "200px" });
  return (
    <div ref={ref} className={styles.compact}>
      {visible ? (
        <Demo />
      ) : (
        <p>
          Интерактивный пример расчёта навеса. Цены условные, это не
          коммерческое предложение.
        </p>
      )}
      <noscript>
        Для изменения параметров включите JavaScript. Формула примера: площадь ×
        (3 200 ₽ за каркас + 1 200 или 1 900 ₽ за покрытие). Цены условные.
      </noscript>
    </div>
  );
}
