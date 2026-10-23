"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import {
  MotionConfig,
  motion,
  useAnimate,
  useInView,
  useReducedMotion,
} from "framer-motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      {children}
    </MotionConfig>
  );
}

// Start on entry instead of hiding server-rendered content before hydration.
// Text stays readable with JavaScript disabled or IntersectionObserver unavailable.
function useEntrance(delay = 0) {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      animate(scope.current, { y: 0, opacity: 1 }, { duration: 0 });
      return;
    }
    const animation = animate(
      scope.current,
      { y: [24, 0], opacity: [0.75, 1] },
      { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] },
    );
    return () => animation.stop();
  }, [animate, delay, inView, reduced, scope]);

  return scope;
}

export function MotionDiv({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const scope = useEntrance(delay);
  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}

export function MotionSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const scope = useEntrance();
  return (
    <section ref={scope} className={className}>
      {children}
    </section>
  );
}

const AnimatedLink = motion.create(Link);

export function MotionLink({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  const reduced = useReducedMotion();
  return (
    <AnimatedLink
      className={className}
      href={href}
      tabIndex={0}
      whileHover={reduced ? undefined : { y: -3 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      {children}
    </AnimatedLink>
  );
}
