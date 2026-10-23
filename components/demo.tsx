"use client";
import { useEffect, useState } from "react";
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
        setVerification("Формула проверена · Python API");
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
              <svg
                viewBox="0 0 420 280"
                role="img"
                aria-label={`Условная схема навеса ${width} на ${depth} метров`}
              >
                <defs>
                  <pattern
                    id="scene-grid"
                    width="24"
                    height="12"
                    patternUnits="userSpaceOnUse"
                    patternTransform="skewY(-25)"
                  >
                    <path
                      d="M 24 0 L 0 0 0 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth=".4"
                    />
                  </pattern>
                </defs>
                <path
                  d="M10 198 222 91 410 180 198 285Z"
                  fill="url(#scene-grid)"
                  opacity=".16"
                />
                <motion.g
                  animate={{
                    scaleX: 0.85 + width * 0.0375,
                    scaleY: 0.9 + depth * 0.033,
                  }}
                  style={{ transformOrigin: "210px 160px" }}
                  transition={{ duration: reduced ? 0 : 0.22 }}
                >
                  <motion.path
                    d="M91 125V231M267 163V265M329 110V210M155 76V178"
                    stroke="#777d79"
                    strokeWidth="7"
                    initial={false}
                    whileInView={reduced ? undefined : { pathLength: [0, 1] }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M82 112 153 65 342 103 270 155Z"
                    initial={false}
                    animate={{ fill: roof === "poly" ? "#cbd5ca" : "#777d79" }}
                    transition={{ duration: reduced ? 0 : 0.24 }}
                    stroke="#dfe8d9"
                    strokeWidth="2"
                  />
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <path
                      key={i}
                      d={`M${93 + i * 27} ${111 + i * 6}l70-47`}
                      stroke="#f2f4ea"
                      strokeWidth="1"
                      opacity=".6"
                    />
                  ))}
                  <path d="m82 112 188 43v10L82 122Z" fill="#5e6862" />
                  <path d="m270 155 72-52v10l-72 52Z" fill="#9ca79d" />
                </motion.g>
                <path
                  d="M78 248 255 282M67 245l18 5m163 28 18 5M342 221l52-37"
                  stroke="#a5ad9f"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text x="152" y="269" fill="#cad3c5" fontSize="12">
                  {width} 000 мм
                </text>
                <text x="350" y="236" fill="#cad3c5" fontSize="12">
                  {depth} 000 мм
                </text>
              </svg>
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
                      tabIndex={0}
                      key={value}
                      aria-pressed={roof === value}
                      onClick={() => setRoof(value)}
                      whileTap={reduced ? undefined : { scale: 0.97 }}
                      whileHover={reduced ? undefined : { y: -2 }}
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
                    initial={reduced ? false : { opacity: 0.4, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -6 }}
                    transition={{ duration: reduced ? 0 : 0.12 }}
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
