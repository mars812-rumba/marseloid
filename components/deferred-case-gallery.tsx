"use client";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { CaseDemo } from "@/lib/case-demo";
const Gallery = dynamic(() =>
  import("@/components/case-gallery").then((module) => module.CaseGallery),
);

/** Reuse the existing scene, loading it only as the reader approaches it. */
export function DeferredCaseGallery({ demo }: { demo: CaseDemo }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "200px" });
  return (
    <div ref={ref} style={{ minHeight: 560 }}>
      {visible ? (
        <Gallery demo={demo} />
      ) : (
        <div>
          <h2>{demo.title}</h2>
          <p>{demo.description}</p>
          <p>Интерактивная демонстрация загружается при прокрутке.</p>
        </div>
      )}
      <noscript>
        <p>
          Реальные экраны проекта:{" "}
          {demo.screens.map((screen) => (
            <a
              className="text-link"
              key={screen.id}
              href={(screen.desktop ?? screen.mobile)!.src}
            >
              {screen.label} ↗{" "}
            </a>
          ))}
        </p>
      </noscript>
    </div>
  );
}
