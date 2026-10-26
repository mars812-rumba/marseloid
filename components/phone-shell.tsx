import type { ReactNode } from "react";
import styles from "./phone-shell.module.css";

/** Device geometry adapted from Dimohod Trade's PhoneMockup3D. */
export function PhoneShell({
  children,
  reflection,
}: {
  children: ReactNode;
  reflection?: ReactNode;
}) {
  return (
    <div className={styles.phone}>
      <div className={`${styles.face} ${styles.back}`} aria-hidden="true" />
      {/* Extrude only the perimeter, rather than stacking full phone-sized planes. */}
      {[180, 270, 0, 90].map((startAngle, corner) => (
        <div
          key={corner}
          className={`${styles.corner} ${styles[`corner${corner}`]}`}
          aria-hidden="true"
        >
          {Array.from({ length: 5 }, (_, segment) => {
            const angle = startAngle + segment * 18 + 9;
            const radians = (angle * Math.PI) / 180;
            const radius = 50 * Math.cos(Math.PI / 20);
            return (
              <span
                key={segment}
                className={styles.facet}
                style={{
                  left: `${50 + radius * Math.cos(radians)}%`,
                  top: `${50 + radius * Math.sin(radians)}%`,
                  transform: `translate(-50%, -50%) rotateZ(${angle}deg) rotateY(90deg)`,
                }}
              />
            );
          })}
        </div>
      ))}
      <div className={`${styles.cap} ${styles.topCap}`} aria-hidden="true" />
      <div className={`${styles.cap} ${styles.bottomCap}`} aria-hidden="true" />
      <div className={`${styles.rail} ${styles.leftRail}`} aria-hidden="true" />
      <div
        className={`${styles.rail} ${styles.rightRail}`}
        aria-hidden="true"
      />
      <div className={`${styles.face} ${styles.front}`}>
        <div className={styles.screen}>
          <div className={styles.content}>{children}</div>
        </div>
        <div className={styles.notch} aria-hidden="true" />
        <div className={styles.reflection} aria-hidden="true">
          {reflection}
        </div>
      </div>
      <div className={styles.sideButtons} aria-hidden="true">
        <span className={styles.power} />
        <span className={styles.volumeOne} />
        <span className={styles.volumeTwo} />
      </div>
    </div>
  );
}
