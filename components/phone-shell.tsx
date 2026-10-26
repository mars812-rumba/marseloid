import type { CSSProperties, ReactNode } from "react";
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
      {Array.from({ length: 13 }, (_, index) => (
        <div
          key={index}
          className={styles.rim}
          aria-hidden="true"
          style={{ "--slice": `${index * 2 - 12}px` } as CSSProperties}
        />
      ))}
      <div className={`${styles.rail} ${styles.leftRail}`} aria-hidden="true" />
      <div
        className={`${styles.rail} ${styles.rightRail}`}
        aria-hidden="true"
      />
      <div className={`${styles.face} ${styles.front}`}>
        <div className={styles.screen}>
          <div className={styles.status} aria-hidden="true">
            <span className={styles.signal}>▂▄▆</span>
            <span className={styles.battery} />
          </div>
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
