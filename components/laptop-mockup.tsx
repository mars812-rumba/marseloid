"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { LAPTOP, fitLaptop, laptopCameraDistance } from "@/lib/laptop-geometry";
import styles from "./laptop-mockup.module.css";

const DEFAULT_OPENING = 140;
const MIN_OPENING = 0;
const MAX_OPENING = 160;
const LID_OFFSET = LAPTOP.lidOffset;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/** Small corner walls close the chamfered perimeter without full-size layers. */
function CornerFaces() {
  return [225, 315, 45, 135].map((angle, index) => (
    <span
      key={angle}
      className={`${styles.cornerFace} ${styles[`cut${index}`]}`}
      aria-hidden="true"
      style={{
        transform: `translate(-50%, -50%) rotateZ(${angle}deg) rotateY(90deg)`,
      }}
    />
  ));
}

export function LaptopMockup({
  src,
  alt,
  label,
  active,
  count,
  reduced,
  onSelect,
}: {
  src: string;
  alt: string;
  label: string;
  active: number;
  count: number;
  reduced: boolean;
  onSelect: (index: number) => void;
}) {
  const hint = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const viewportWidth = useMotionValue(360);
  const sceneRef = useRef<HTMLDivElement>(null);
  const visible = useInView(sceneRef, { amount: 0.1 });
  const [dragging, setDragging] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [opening, setOpening] = useState(DEFAULT_OPENING);
  const phase = useMotionValue(0);
  const pitch = useMotionValue(-24),
    yaw = useMotionValue(-8),
    lid = useMotionValue(DEFAULT_OPENING - LID_OFFSET);
  const smoothPitch = useSpring(pitch, { stiffness: 190, damping: 26 });
  const smoothYaw = useSpring(yaw, { stiffness: 190, damping: 26 });
  const smoothLid = useSpring(lid, { stiffness: 220, damping: 28 });
  const rotateX = useTransform(() =>
    reduced ? -24 : smoothPitch.get() + Math.sin(phase.get()) * 2,
  );
  const rotateY = useTransform(() =>
    reduced ? 0 : smoothYaw.get() + Math.sin(phase.get()) * 7,
  );
  const floatY = useTransform(phase, (value) =>
    reduced ? 0 : Math.sin(value) * 8,
  );
  const lidAngle = useTransform(() => (reduced ? lid.get() : smoothLid.get()));
  const cameraDistance = useTransform(viewportWidth, laptopCameraDistance);
  const fittedTransform = useTransform(() => {
    const fitted = fitLaptop(
      viewportWidth.get(),
      rotateX.get(),
      rotateY.get(),
      lidAngle.get(),
    );
    return `translate(${fitted.x}px, ${fitted.y + floatY.get()}px) scale(${fitted.scale})`;
  });
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewportWidth.set(viewport.clientWidth);
    const observer = new ResizeObserver(([entry]) =>
      viewportWidth.set(entry.contentRect.width),
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [viewportWidth]);
  const reflection = useTransform(rotateY, [-65, 65], ["-18%", "18%"]);
  const drag = useRef({
    active: false,
    id: -1,
    mode: "body",
    x: 0,
    y: 0,
    pitch: -24,
    yaw: -8,
    opening: DEFAULT_OPENING,
    travel: 200,
  });
  const go = (offset: number) => onSelect((active + offset + count) % count);
  function changeOpening(value: number) {
    const next = Math.round(clamp(value, MIN_OPENING, MAX_OPENING));
    setOpening(next);
    lid.set(next - LID_OFFSET);
  }
  function reset() {
    pitch.set(-24);
    yaw.set(-8);
    changeOpening(DEFAULT_OPENING);
  }
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (reduced || dragging || !visible || !foreground) return;
    const from = phase.get();
    const animation = animate(phase, [from, from + Math.PI * 2], {
      duration: 10,
      ease: "linear",
      repeat: Infinity,
    });
    return () => animation.stop();
  }, [reduced, dragging, visible, foreground, phase]);
  useEffect(() => {
    drag.current.active = false;
    setDragging(false);
  }, [reduced]);

  function start(event: PointerEvent<HTMLDivElement>) {
    if (
      !event.isPrimary ||
      event.button !== 0 ||
      !(event.target instanceof Element) ||
      event.target.closest("button, input, label")
    )
      return;
    const mode = event.target.closest("[data-laptop-hinge]")
      ? "lid"
      : event.target.closest("[data-laptop-display]")
        ? "screen"
        : "body";
    drag.current = {
      active: true,
      id: event.pointerId,
      mode,
      x: event.clientX,
      y: event.clientY,
      pitch: pitch.get(),
      yaw: yaw.get(),
      opening,
      travel: event.currentTarget.clientWidth * 0.6,
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state.active || state.id !== event.pointerId) return;
    const dx = event.clientX - state.x,
      dy = event.clientY - state.y;
    if (state.mode === "lid")
      changeOpening(state.opening - (dy / state.travel) * 90);
    else if (state.mode === "body" && !reduced) {
      yaw.set(clamp(state.yaw + dx * 0.35, -55, 55));
      pitch.set(clamp(state.pitch - dy * 0.2, -24, 8));
    }
  }
  function finish(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const state = drag.current;
    if (!state.active || state.id !== event.pointerId) return;
    state.active = false;
    setDragging(false);
    const dx = event.clientX - state.x,
      dy = event.clientY - state.y;
    if (
      !cancelled &&
      state.mode === "screen" &&
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
      aria-label="Ноутбук с экранами Дымоход Трейд"
    >
      <div
        ref={sceneRef}
        className={styles.scene}
        data-laptop-scene=""
        role="group"
        tabIndex={0}
        aria-label="Поворот ноутбука"
        aria-describedby={hint}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={(event) => finish(event)}
        onPointerCancel={(event) => finish(event, true)}
        onLostPointerCapture={(event) => finish(event, true)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (
            !reduced &&
            (event.key === "ArrowLeft" || event.key === "ArrowRight")
          ) {
            event.preventDefault();
            yaw.set(
              clamp(
                yaw.get() + (event.key === "ArrowRight" ? 15 : -15),
                -55,
                55,
              ),
            );
          }
          if (event.key === "Home") {
            event.preventDefault();
            reset();
          }
        }}
      >
        <div
          className={styles.viewport}
          ref={viewportRef}
          data-laptop-viewport=""
        >
          <div className={styles.shadow} aria-hidden="true" />
          <motion.div
            className={styles.fitted}
            data-laptop-fitted=""
            style={{ transform: fittedTransform }}
          >
            <motion.div
              className={styles.projection}
              style={{ perspective: cameraDistance }}
            >
              <motion.div
                className={styles.rig}
                data-laptop-rig=""
                style={{
                  rotateX,
                  rotateY,
                }}
              >
                <div className={styles.hinge} aria-hidden="true" />
                <div
                  className={styles.base}
                  data-laptop-base=""
                  aria-hidden="true"
                >
                  <CornerFaces />
                  <div className={styles.underside} />
                  <div className={styles.deck}>
                    <div className={styles.keyboard} />
                    <div className={styles.trackpad} />
                  </div>
                  <div className={`${styles.edge} ${styles.frontEdge}`} />
                  <div className={`${styles.edge} ${styles.rearEdge}`} />
                  <div className={`${styles.side} ${styles.leftEdge}`} />
                  <div className={`${styles.side} ${styles.rightEdge}`} />
                </div>
                <motion.div
                  className={styles.lid}
                  data-laptop-lid=""
                  style={{ rotateX: lidAngle }}
                >
                  <CornerFaces />
                  <div className={styles.back} aria-hidden="true" />
                  <div
                    className={`${styles.lidSide} ${styles.lidLeft}`}
                    aria-hidden="true"
                  />
                  <div
                    className={`${styles.lidSide} ${styles.lidRight}`}
                    aria-hidden="true"
                  />
                  <div className={styles.lidTop} aria-hidden="true" />
                  <div className={styles.lidBottom} aria-hidden="true" />
                  <div className={styles.bezel}>
                    <span className={styles.camera} aria-hidden="true" />
                    <div
                      className={styles.display}
                      data-laptop-display=""
                      role="group"
                      tabIndex={opening < 20 ? -1 : 0}
                      aria-hidden={opening < 20}
                      aria-label={`Экран ноутбука: ${label}`}
                      onKeyDown={(event) => {
                        if (
                          event.key === "ArrowLeft" ||
                          event.key === "ArrowRight"
                        ) {
                          event.preventDefault();
                          event.stopPropagation();
                          go(event.key === "ArrowRight" ? 1 : -1);
                        }
                      }}
                    >
                      <Image
                        src={src}
                        fill
                        sizes="(max-width: 767px) 90vw, 900px"
                        alt={alt}
                        draggable={false}
                        loading="eager"
                      />
                      <div className={styles.glass} aria-hidden="true">
                        <motion.span style={{ x: reduced ? 0 : reflection }} />
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.hingeGrip}
                    data-laptop-hinge=""
                    aria-hidden="true"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <button
          className={`${styles.arrow} ${styles.previous}`}
          type="button"
          aria-label="Предыдущий экран ноутбука"
          onClick={() => go(-1)}
        >
          ‹
        </button>
        <button
          className={`${styles.arrow} ${styles.next}`}
          type="button"
          aria-label="Следующий экран ноутбука"
          onClick={() => go(1)}
        >
          ›
        </button>
      </div>
      <label className={styles.slider}>
        <span>
          Раскрытие крышки <output>— {opening}°</output>
        </span>
        <input
          type="range"
          aria-label="Раскрытие крышки ноутбука"
          aria-orientation="horizontal"
          min={MIN_OPENING}
          max={MAX_OPENING}
          step="1"
          value={opening}
          onChange={(event) => changeOpening(Number(event.target.value))}
        />
      </label>
      <p className="sr-only" id={hint}>
        Тяните корпус — поворот. Свайп по экрану — смена снимка.
        <br />
        Верхняя кромка — наклон крышки.
        <span className="sr-only">
          {" "}
          Стрелки поворачивают корпус; Home сбрасывает ракурс. На экране стрелки
          переключают снимки.
        </span>
      </p>
    </div>
  );
}
