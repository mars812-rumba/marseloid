"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";

const entrance = { opacity: [0.15, 1], y: [36, 0] };
const resting = { opacity: 1, y: 0 };
const viewport = { once: true, amount: 0.15 };
const easing = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const elements = {
  div: motion.div,
  h1: motion.h1,
  section: motion.section,
  li: motion.li,
};

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
}: {
  as?: keyof typeof elements;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const path = usePathname();
  const Element = elements[as];
  return (
    <Element
      key={path}
      className={className}
      data-reveal=""
      // Keep server HTML visible: no hidden content waiting for JS or scrolling.
      initial={false}
      animate={resting}
      whileInView={reduced ? undefined : entrance}
      viewport={viewport}
      transition={{
        duration: reduced ? 0 : 0.65,
        delay: reduced ? 0 : delay,
        ease: easing,
      }}
    >
      {children}
    </Element>
  );
}

const AnimatedLink = motion.create(Link);

export function MotionLink({
  children,
  href,
  className,
  reveal = false,
  delay = 0,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  reveal?: boolean;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <AnimatedLink
      href={href}
      className={className}
      tabIndex={0}
      data-reveal={reveal ? "" : undefined}
      initial={false}
      animate={{ ...resting, scale: 1 }}
      whileInView={reveal && !reduced ? entrance : undefined}
      viewport={viewport}
      whileHover={reduced ? undefined : { scale: 1.015 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{
        duration: reduced ? 0 : 0.65,
        delay: reduced ? 0 : delay,
        ease: easing,
        scale: { type: "spring", stiffness: 400, damping: 28, delay: 0 },
      }}
    >
      {children}
    </AnimatedLink>
  );
}
