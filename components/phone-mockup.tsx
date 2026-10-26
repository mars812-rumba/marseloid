"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  animate,
  useInView,
  useTransform,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { PhoneShell } from "@/components/phone-shell";
import styles from "./phone-mockup.module.css";

const clamp = (value: number, limit: number) =>
  Math.max(-limit, Math.min(limit, value));

export function PhoneMockup({
  src,
  alt,
  label,
  active,
  count,
  reduced,
  onSelect,
  onEnlarge,
}: {
  src: string;
  alt: string;
  label: string;
  active: number;
  count: number;
  reduced: boolean;
  onSelect: (index: number) => void;
  onEnlarge: () => void;
}) {
  const hint = useId();
  const sceneRef = useRef<HTMLDivElement>(null);
  const visible = useInView(sceneRef, { amount: 0.1 });
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [foreground, setForeground] = useState(true);
  const phase = useMotionValue(0);
  const floatY = useTransform(phase, (value) => Math.sin(value) * 9);
  const shadowScale = useTransform(
    phase,
    (value) => 1 + Math.sin(value) * 0.08,
  );
  const floatZ = useTransform(phase, (value) => Math.sin(value) * 1.4);
  const x = useMotionValue(-6);
  const y = useMotionValue(14);
  const swipe = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 190, damping: 26 });
  const rotateY = useSpring(y, { stiffness: 190, damping: 26 });
  const floatingX = useTransform(
    () => rotateX.get() + Math.sin(phase.get()) * 2.5,
  );
  const floatingY = useTransform(
    () => rotateY.get() + Math.sin(phase.get()) * 9,
  );
  const reflectionX = useTransform(floatingY, [-80, 80], ["-25%", "25%"]);
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (reduced || paused || dragging || !visible || !foreground) return;
    const from = phase.get();
    const animation = animate(phase, [from, from + Math.PI * 2], {
      duration: 9,
      ease: "linear",
      repeat: Infinity,
    });
    return () => animation.stop();
  }, [reduced, paused, dragging, visible, foreground, phase]);
  const screenX = useSpring(swipe, { stiffness: 320, damping: 30 });
  const gesture = useRef({
    active: false,
    pointer: -1,
    screen: false,
    startX: 0,
    startY: 0,
    pitch: -6,
    yaw: 14,
  });
  const go = (offset: number) => onSelect((active + offset + count) % count);
  const reset = () => {
    x.set(reduced ? 0 : -6);
    y.set(reduced ? 0 : 14);
  };

  useEffect(() => {
    gesture.current.active = false;
    setDragging(false);
    swipe.set(0);
    x.set(reduced ? 0 : -6);
    y.set(reduced ? 0 : 14);
  }, [reduced, x, y, swipe]);

  function start(event: PointerEvent<HTMLDivElement>) {
    if (
      !event.isPrimary ||
      event.button !== 0 ||
      (event.target instanceof Element && event.target.closest("button"))
    )
      return;
    gesture.current = {
      active: true,
      pointer: event.pointerId,
      screen:
        event.target instanceof Element &&
        Boolean(event.target.closest("[data-phone-display]")),
      startX: event.clientX,
      startY: event.clientY,
      pitch: x.get(),
      yaw: y.get(),
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    const drag = gesture.current;
    if (!drag.active || drag.pointer !== event.pointerId) return;
    const dx = event.clientX - drag.startX,
      dy = event.clientY - drag.startY;
    if (drag.screen) {
      if (!reduced && Math.abs(dx) > Math.abs(dy)) swipe.set(clamp(dx, 80));
    } else if (!reduced) {
      x.set(clamp(drag.pitch - dy * 0.3, 20));
      y.set(clamp(drag.yaw + dx * 0.55, 70));
    }
  }

  function finish(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const drag = gesture.current;
    if (!drag.active || drag.pointer !== event.pointerId) return;
    drag.active = false;
    setDragging(false);
    swipe.set(0);
    const dx = event.clientX - drag.startX,
      dy = event.clientY - drag.startY;
    if (
      !cancelled &&
      drag.screen &&
      Math.abs(dx) > 38 &&
      Math.abs(dx) > Math.abs(dy)
    )
      go(dx < 0 ? 1 : -1);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div
      className={styles.stage}
      role="group"
      aria-label="Мобильные экраны Дымоход Трейд"
    >
      <div
        ref={sceneRef}
        className={styles.scene}
        data-phone-scene=""
        role="group"
        tabIndex={0}
        aria-label="Поворот корпуса телефона"
        aria-describedby={hint}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={(event) => finish(event)}
        onPointerCancel={(event) => finish(event, true)}
        onLostPointerCapture={(event) => finish(event, true)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget || reduced) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            y.set(clamp(y.get() + (event.key === "ArrowRight" ? 20 : -20), 70));
          }
          if (event.key === "Home") {
            event.preventDefault();
            reset();
          }
        }}
      >
        <motion.div
          className={styles.shadow}
          aria-hidden="true"
          style={{ scale: reduced ? 1 : shadowScale }}
        />
        <motion.div
          className={styles.rig}
          data-phone-rig=""
          style={{
            rotateX: reduced ? 0 : floatingX,
            rotateY: reduced ? 0 : floatingY,
            rotateZ: reduced ? 0 : floatZ,
            y: reduced ? 0 : floatY,
          }}
        >
          <PhoneShell
            reflection={
              <motion.span style={{ x: reduced ? 0 : reflectionX }} />
            }
          >
            <div
              className={styles.display}
              data-phone-display=""
              role="group"
              tabIndex={0}
              aria-label={`Мобильный экран: ${label}`}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  event.stopPropagation();
                  go(event.key === "ArrowRight" ? 1 : -1);
                }
              }}
            >
              <motion.div
                className={styles.track}
                style={{ x: reduced ? 0 : screenX }}
              >
                <AnimatePresence
                  key={reduced ? "still" : "animated"}
                  mode="wait"
                  initial={false}
                >
                  <motion.span
                    className={styles.slide}
                    key={src}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: reduced ? 1 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.18 }}
                  >
                    <Image
                      src={src}
                      fill
                      alt={alt}
                      sizes="(max-width: 767px) 280px, 320px"
                      loading="eager"
                      draggable={false}
                    />
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>
          </PhoneShell>
        </motion.div>
        <button
          className={`${styles.arrow} ${styles.previous}`}
          type="button"
          aria-label="Предыдущий мобильный экран"
          onClick={() => go(-1)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          className={`${styles.arrow} ${styles.next}`}
          type="button"
          aria-label="Следующий мобильный экран"
          onClick={() => go(1)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
      <p className={styles.hint} id={hint}>
        Тяните корпус или поле вокруг — поворот.
        <br />
        Свайп по экрану — следующий снимок.
        <span className="sr-only">
          {" "}
          Клавиатура: стрелки поворачивают корпус, Home возвращает ракурс.
        </span>
      </p>
      <div className={styles.tools}>
        <button
          type="button"
          disabled={reduced}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? "Включить парение" : "Приостановить парение"}
        </button>
        <button type="button" onClick={reset} disabled={reduced}>
          Сбросить ракурс
        </button>
        <button
          type="button"
          onClick={onEnlarge}
          aria-label={`Увеличить: ${label}, телефон`}
          aria-haspopup="dialog"
        >
          Увеличить экран ↗
        </button>
      </div>
    </div>
  );
}
