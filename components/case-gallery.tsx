"use client";

import Image from "next/image";
import { Smartphone, Laptop, Maximize2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type CSSProperties,
} from "react";
import { chimneyDemo } from "@/lib/case-screenshots";
import type { CaseDemo } from "@/lib/case-demo";
import { LaptopMockup } from "@/components/laptop-mockup";
import { PhoneMockup } from "@/components/phone-mockup";

type Device = "desktop" | "mobile";

const reducedQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotionPreference(notify: () => void) {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
const readMotionPreference = () => window.matchMedia(reducedQuery).matches;
const serverMotionPreference = () => true;

export function CaseGallery({ demo = chimneyDemo }: { demo?: CaseDemo }) {
  const [device, setDevice] = useState<Device>(() =>
    demo.screens.some((item) => item.mobile) ? "mobile" : "desktop",
  );
  const [active, setActive] = useState(0);
  const [full, setFull] = useState<Device | null>(null);
  const gallery = useRef<HTMLElement>(null);
  const visible = useInView(gallery, { amount: 0.1 });
  const [foreground, setForeground] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const [focused, setFocused] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const reduced = useSyncExternalStore(
    subscribeMotionPreference,
    readMotionPreference,
    serverMotionPreference,
  );
  const screens = demo.screens.filter((item) => Boolean(item[device]));
  const screen = screens[active] ?? screens[0];
  const displayed = screen[full ?? device]!;
  const src = (target: Device) => screen[target]!.src;

  function changeDevice(next: Device) {
    const available = demo.screens.filter((item) => Boolean(item[next]));
    if (!available.length) return;
    setActive(
      Math.max(
        0,
        available.findIndex((item) => item.id === screen.id),
      ),
    );
    setDevice(next);
  }

  useEffect(() => {
    if (!full) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [full]);

  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (reduced || !visible || !foreground || full || interacting || focused)
      return;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % screens.length);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [
    active,
    screens.length,
    device,
    reduced,
    visible,
    foreground,
    full,
    interacting,
    focused,
  ]);

  function enlarge(device: Device) {
    setFull(device);
    dialog.current?.showModal();
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (event.key === "ArrowRight") next = (active + 1) % screens.length;
    else if (event.key === "ArrowLeft")
      next = (active + screens.length - 1) % screens.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = screens.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      ref={gallery}
      className="case-gallery"
      aria-labelledby={`${id}-heading`}
      onPointerDownCapture={() => setInteracting(true)}
      onPointerUpCapture={() => setInteracting(false)}
      onPointerCancelCapture={() => setInteracting(false)}
      onLostPointerCapture={() => setInteracting(false)}
      onKeyDownCapture={() => setFocused(true)}
      onFocusCapture={(event) => {
        setFocused(event.target.matches(":focus-visible"));
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="gallery-heading">
        <div>
          <p className="eyebrow">Внутри проекта / реальные экраны</p>
          <h2 id={`${id}-heading`} style={{ whiteSpace: "pre-line" }}>
            {demo.title}
          </h2>
        </div>
        <p>{demo.description}</p>
      </div>
      <div
        className="gallery-tabs"
        style={
          {
            "--gallery-screen-count": screens.length,
            "--gallery-mobile-columns":
              screens.length % 3 === 0 ? 3 : Math.min(2, screens.length),
          } as CSSProperties
        }
        role="tablist"
        aria-label={`Экраны ${demo.project}`}
      >
        {screens.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            onClick={() => setActive(index)}
            onKeyDown={navigate}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        <div
          className={`gallery-stage${device === "desktop" ? " gallery-stage-laptop" : ""}`}
        >
          <div className="gallery-devices">
            {device === "desktop" ? (
              <LaptopMockup
                src={src("desktop")}
                alt={screen.desktop!.alt}
                label={screen.label}
                active={active}
                count={screens.length}
                reduced={reduced}
                onSelect={setActive}
                projectName={demo.project}
              />
            ) : (
              <PhoneMockup
                src={src("mobile")}
                alt={screen.mobile!.alt}
                label={screen.label}
                active={active}
                count={screens.length}
                reduced={reduced}
                onSelect={setActive}
                projectName={demo.project}
              />
            )}
          </div>
          {device === "mobile" && (
            <span className="gallery-stage-label" aria-hidden="true">
              МОБИЛЬНЫЙ ИНТЕРФЕЙС / 0{active + 1}
            </span>
          )}
        </div>
        <div className="gallery-controls">
          <div
            className="gallery-device-switch"
            role="group"
            aria-label="Устройство для просмотра"
          >
            <motion.button
              type="button"
              aria-pressed={device === "mobile"}
              onClick={() => changeDevice("mobile")}
              whileTap={reduced ? undefined : { scale: 0.96 }}
            >
              <Smartphone size={18} strokeWidth={1.6} aria-hidden="true" />
              <span>Телефон</span>
            </motion.button>
            <motion.button
              type="button"
              aria-pressed={device === "desktop"}
              onClick={() => changeDevice("desktop")}
              whileTap={reduced ? undefined : { scale: 0.96 }}
            >
              <Laptop size={18} strokeWidth={1.6} aria-hidden="true" />
              <span>Ноутбук</span>
            </motion.button>
          </div>
          <motion.button
            className="gallery-zoom-icon"
            type="button"
            onClick={() => enlarge(device)}
            aria-label={`Увеличить: ${screen.label}, ${device === "mobile" ? "телефон" : "ноутбук"}`}
            title="Увеличить экран"
            aria-haspopup="dialog"
            whileTap={reduced ? undefined : { scale: 0.96 }}
          >
            <Maximize2 size={19} strokeWidth={1.6} aria-hidden="true" />
          </motion.button>
        </div>
        <div className="gallery-caption">
          <div>
            <h3>{screen.title}</h3>
            <p>{screen.description}</p>
          </div>
        </div>
      </div>
      <noscript>
        <p>
          Для просмотра всех экранов:{" "}
          {demo.screens.map((item) => (
            <a
              key={item.id}
              className="text-link"
              href={(item.desktop ?? item.mobile)!.src}
            >
              {item.label} ↗{" "}
            </a>
          ))}
        </p>
      </noscript>
      <dialog
        ref={dialog}
        className="screenshot-dialog"
        aria-labelledby={`${id}-dialog-title`}
        onClose={() => setFull(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="screenshot-dialog-content">
          <div className="screenshot-dialog-heading">
            <h2 id={`${id}-dialog-title`}>
              {screen.label} / {full === "desktop" ? "Компьютер" : "Телефон"}
            </h2>
            <button type="button" onClick={() => dialog.current?.close()}>
              Закрыть <span aria-hidden="true">×</span>
            </button>
          </div>
          {full && (
            <div
              className="screenshot-dialog-image"
              role="region"
              aria-label="Скриншот в полном размере"
              tabIndex={0}
            >
              <Image
                src={src(full)}
                width={displayed.width}
                height={displayed.height}
                alt={displayed.alt}
                unoptimized
              />
            </div>
          )}
          <a
            className="text-link"
            href={displayed.src}
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть файл ↗<span className="sr-only"> (в новой вкладке)</span>
          </a>
        </div>
      </dialog>
    </section>
  );
}
