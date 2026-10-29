"use client";
import { useEffect, useState } from "react";
import { CanopyIllustration } from "@/components/canopy-illustration";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
const money = (n: number) => new Intl.NumberFormat("ru-RU").format(n);
export function Demo() {
  const [width, setWidth] = useState(4);
  const [depth, setDepth] = useState(3);
  const [roof, setRoof] = useState("poly");
  const reduced = useReducedMotion();
  const frame = width * depth * 3200;
  const covering = width * depth * (roof === "poly" ? 1200 : 1900);
  const [verification, setVerification] = useState(
    "Показан локальный пример расчёта",
  );
  useEffect(() => {
    const controller = new AbortController();
    setVerification("Проверяю формулу на сервере…");
    const timer = setTimeout(async () => {
      try {
        const response = await fetch("/api/demo/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ width, depth, roof }),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("API unavailable");
        const data = await response.json();
        if (data.total !== frame + covering || data.illustrative !== true)
          throw new Error("Unexpected formula result");
        if (!controller.signal.aborted) setVerification("");
      } catch {
        if (!controller.signal.aborted)
          setVerification("API недоступен · показан локальный пример");
      } finally {
        clearTimeout(timeout);
      }
    }, 250);
    const timeout = setTimeout(() => {
      controller.abort();
      setVerification("API не ответил · показан локальный пример");
    }, 6000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timeout);
      controller.abort();
    };
  }, [width, depth, roof, frame, covering]);
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.22 }}>
      <section id="demo" className="demo" aria-labelledby="demo-title">
        <div className="demo-bar">
          <span>
            <i className="signal" /> ИЗ ПАРАМЕТРОВ — В РЕЗУЛЬТАТ
          </span>
          <span>ДЕМО / 01</span>
        </div>
        <div className="demo-workspace">
          <div className="demo-top">
            <div>
              <span className="eyebrow">Пример интерфейса</span>
              <h2 id="demo-title">Навес под вашу задачу</h2>
            </div>
            <span className="demo-badge">Не реальный прайс</span>
          </div>
          <div className="demo-grid">
            <div className="canopy-scene">
              <CanopyIllustration
                width={width}
                depth={depth}
                roof={roof}
                reduced={Boolean(reduced)}
              />
              <span className="scene-caption">
                Схема меняется вместе с параметрами
              </span>
            </div>
            <div className="demo-controls">
              <label htmlFor="width">
                Ширина <strong>{width} м</strong>
              </label>
              <input
                id="width"
                type="range"
                min="3"
                max="6"
                step="1"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
              <label htmlFor="depth">
                Глубина <strong>{depth} м</strong>
              </label>
              <input
                id="depth"
                type="range"
                min="2"
                max="5"
                step="1"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
              />
              <fieldset>
                <legend>Покрытие</legend>
                <div className="roof-options">
                  {[
                    ["poly", "Поликарбонат"],
                    ["metal", "Металл"],
                  ].map(([value, label]) => (
                    <motion.button
                      type="button"
                      key={value}
                      aria-pressed={roof === value}
                      onClick={() => setRoof(value)}
                      whileTap={reduced ? undefined : { scale: 0.97 }}
                    >
                      {label}
                    </motion.button>
                  ))}
                </div>
              </fieldset>
              <div className="demo-total">
                <span>Пример расчёта</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.strong
                    key={frame + covering}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.1 }}
                  >
                    {money(frame + covering)} ₽
                  </motion.strong>
                </AnimatePresence>
              </div>
              <p className="api-status" role="status">
                {verification}
              </p>
            </div>
          </div>
          <details className="demo-formula">
            <summary>Откуда берётся сумма?</summary>
            <p>
              Условная формула для демонстрации: площадь × 3 200 ₽ (каркас) +
              площадь × {roof === "poly" ? "1 200" : "1 900"} ₽ (покрытие). Не
              включает монтаж, доставку и инженерный расчёт. Это не коммерческое
              предложение.
            </p>
          </details>
        </div>
        <div className="demo-footer">
          <span>Параметры</span>
          <span aria-hidden="true">→</span>
          <span>Правила расчёта</span>
          <span aria-hidden="true">→</span>
          <span>Спецификация и КП</span>
        </div>
      </section>
    </MotionConfig>
  );
}
