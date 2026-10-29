"use client";
import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessengerIcon } from "@/components/messenger-icons";
import { messengerContacts as contacts } from "@/lib/messenger-contacts";
import styles from "./messenger-links.module.css";

export function MessengerLinks() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const maxButton = useRef<HTMLButtonElement>(null);
  const id = useId();
  const feedback = {
    whileHover: reduced ? undefined : { y: -3, scale: 1.06 },
    whileTap: reduced ? undefined : { scale: 0.93 },
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
  };
  const entrance = (index: number) => ({
    initial: false as const,
    whileInView: reduced ? undefined : { opacity: [0.5, 1], y: [8, 0] },
    viewport: { once: true },
    transition: { duration: 0.35, delay: index * 0.07 },
  });
  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(contacts.max.phone);
      setStatus("Номер скопирован");
    } catch {
      setStatus("Выделите и скопируйте номер выше");
    }
  }
  return (
    <div
      className={styles.messengers}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          maxButton.current?.focus();
        }
      }}
    >
      <div
        className={styles.row}
        role="group"
        aria-label="Связаться в мессенджере"
      >
        {(["whatsapp", "telegram"] as const).map((name, index) => (
          <motion.div key={name} {...entrance(index)}>
            <motion.a
              className={styles.icon}
              href={contacts[name].href}
              aria-label={contacts[name].label}
              title={contacts[name].label}
              target="_blank"
              rel="noopener noreferrer"
              {...feedback}
            >
              <MessengerIcon name={name} />
              <span className="sr-only"> (в новой вкладке)</span>
            </motion.a>
          </motion.div>
        ))}
        <motion.div {...entrance(2)}>
          <motion.button
            ref={maxButton}
            type="button"
            className={styles.icon}
            aria-label="Связаться в MAX"
            title="Связаться в MAX"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => {
              setOpen(!open);
              setStatus("");
            }}
            {...feedback}
          >
            <MessengerIcon name="max" />
          </motion.button>
        </motion.div>
      </div>
      <div id={id} className={styles.maxContact} hidden={!open}>
        <p>Найдите меня в MAX по номеру</p>
        <p className={styles.number}>{contacts.max.displayPhone}</p>
        <button type="button" className={styles.copy} onClick={copyNumber}>
          Скопировать номер
        </button>
        <p className={styles.status} role="status">
          {status}
        </p>
      </div>
    </div>
  );
}
