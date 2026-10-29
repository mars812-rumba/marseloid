"use client";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { MessengerIcon } from "@/components/messenger-icons";
import { messengerContacts as contacts } from "@/lib/messenger-contacts";
import styles from "./messenger-links.module.css";

function WaveIcon({
  name,
  index,
  progress,
}: {
  name: "whatsapp" | "telegram" | "max";
  index: number;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, (value) => {
    const phase = (value * 3 - index + 3) % 3;
    return phase < 1 ? 1 + 0.28 * Math.sin(Math.PI * phase) ** 2 : 1;
  });
  return (
    <motion.span className={styles.glyph} style={{ scale }}>
      <MessengerIcon name={name} />
    </motion.span>
  );
}

export function MessengerLinks() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.5 });
  const progress = useMotionValue(0);
  const loop = useRef<{ pause(): void; play(): void; stop(): void } | null>(
    null,
  );
  const [foreground, setForeground] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const running =
    !reduced && visible && foreground && !hovered && !focused && !pressed;

  useEffect(() => {
    const update = () => setForeground(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    progress.set(0);
    if (reduced) return;
    const animation = animate(progress, 1, {
      duration: 3,
      ease: "linear",
      repeat: Infinity,
    });
    animation.pause();
    loop.current = animation;
    return () => {
      animation.stop();
      loop.current = null;
    };
  }, [progress, reduced]);
  useEffect(() => {
    if (running) loop.current?.play();
    else loop.current?.pause();
  }, [running, reduced]);

  return (
    <div className={styles.messengers}>
      <div
        ref={ref}
        className={styles.row}
        role="group"
        aria-label="Связаться в мессенджере"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => {
          setHovered(false);
          setPressed(false);
        }}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
      >
        {(["whatsapp", "telegram", "max"] as const).map((name, index) => (
          <motion.a
            key={name}
            className={styles.icon}
            href={contacts[name].href}
            aria-label={contacts[name].label}
            title={contacts[name].label}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={reduced ? undefined : { scale: 0.94 }}
            transition={{ duration: 0.15 }}
          >
            <WaveIcon name={name} index={index} progress={progress} />
            <span className="sr-only"> (в новой вкладке)</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
