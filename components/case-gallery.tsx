"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { chimneyScreens, screenshotBase } from "@/lib/case-screenshots";
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

export function CaseGallery() {
  const [device, setDevice] = useState<Device>("desktop");
  const [active, setActive] = useState(0);
  const [full, setFull] = useState<Device | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const reduced = useSyncExternalStore(
    subscribeMotionPreference,
    readMotionPreference,
    serverMotionPreference,
  );
  const screen = chimneyScreens[active];
  const src = (device: Device) =>
    `${screenshotBase}/${screen.id}-${device}.webp`;

  useEffect(() => {
    if (!full) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [full]);

  function enlarge(device: Device) {
    setFull(device);
    dialog.current?.showModal();
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (event.key === "ArrowRight") next = (active + 1) % chimneyScreens.length;
    else if (event.key === "ArrowLeft")
      next = (active + chimneyScreens.length - 1) % chimneyScreens.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = chimneyScreens.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className="case-gallery" aria-labelledby={`${id}-heading`}>
      <div className="gallery-heading">
        <div>
          <p className="eyebrow">Внутри проекта / реальные экраны</p>
          <h2 id={`${id}-heading`}>
            От выбора изделия
            <br />
            до готовой сметы.
          </h2>
        </div>
        <p>
          Публичный сайт и рабочий каталог.
          <br />
          На компьютере и на телефоне.
        </p>
      </div>
      <div
        className="gallery-tabs"
        role="tablist"
        aria-label="Экраны Дымоход Трейд"
      >
        {chimneyScreens.map((item, index) => (
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
          className="gallery-device-switch"
          role="group"
          aria-label="Устройство для просмотра"
        >
          <button
            type="button"
            aria-pressed={device === "desktop"}
            onClick={() => setDevice("desktop")}
          >
            Ноутбук
          </button>
          <button
            type="button"
            aria-pressed={device === "mobile"}
            onClick={() => setDevice("mobile")}
          >
            Телефон
          </button>
        </div>
        <div
          className={`gallery-stage${device === "desktop" ? " gallery-stage-laptop" : ""}`}
        >
          <div className="gallery-devices">
            {device === "desktop" ? (
              <LaptopMockup
                src={src("desktop")}
                alt={screen.desktopAlt}
                label={screen.label}
                active={active}
                count={chimneyScreens.length}
                reduced={reduced}
                onSelect={setActive}
                onEnlarge={() => enlarge("desktop")}
              />
            ) : (
              <PhoneMockup
                src={src("mobile")}
                alt={screen.mobileAlt}
                label={screen.label}
                active={active}
                count={chimneyScreens.length}
                reduced={reduced}
                onSelect={setActive}
                onEnlarge={() => enlarge("mobile")}
              />
            )}
          </div>
          {device === "mobile" && (
            <span className="gallery-stage-label" aria-hidden="true">
              МОБИЛЬНЫЙ ИНТЕРФЕЙС / 0{active + 1}
            </span>
          )}
        </div>
        <div className="gallery-caption">
          <div aria-live="polite">
            <h3>{screen.title}</h3>
            <p>{screen.description}</p>
          </div>
          {device === "mobile" && (
            <>
              <button
                className="text-link gallery-desktop-link"
                type="button"
                onClick={() => enlarge("desktop")}
                aria-haspopup="dialog"
              >
                Экран на компьютере ↗
              </button>
              <span className="gallery-hint">
                Корпус — поворот.
                <br />
                Экран — смена снимка.
              </span>
            </>
          )}
        </div>
      </div>
      <noscript>
        <p>
          Для просмотра всех экранов:{" "}
          {chimneyScreens.map((item) => (
            <a
              key={item.id}
              className="text-link"
              href={`${screenshotBase}/${item.id}-desktop.webp`}
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
                width={full === "desktop" ? 975 : 576}
                height={
                  full === "desktop"
                    ? 416
                    : screen.id === "catalog"
                      ? 1070
                      : 1154
                }
                alt={full === "desktop" ? screen.desktopAlt : screen.mobileAlt}
                unoptimized
              />
            </div>
          )}
          <a
            className="text-link"
            href={src(full || "desktop")}
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
