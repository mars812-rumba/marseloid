"use client";
import { telegramMessageLink, telegramGreeting } from "@/lib/telegram-contact";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
export function Brief() {
  const reduced = useReducedMotion();
  const [industry, setIndustry] = useState("");
  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const readyRef = useRef<HTMLTextAreaElement>(null);
  function prepare(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const field = e.currentTarget.elements.namedItem(
      "industry",
    ) as HTMLInputElement;
    const taskField = e.currentTarget.elements.namedItem(
      "task",
    ) as HTMLTextAreaElement;
    field.setCustomValidity(industry.trim() ? "" : "Укажите вашу сферу.");
    taskField.setCustomValidity(
      task.trim().length >= 10 ? "" : "Опишите задачу хотя бы в 10 символах.",
    );
    if (!e.currentTarget.reportValidity()) return;
    setMessage(
      `${telegramGreeting}\n\nСфера: ${industry.trim()}\nЧто нужно: ${task.trim()}`,
    );
    setStatus(
      "Сообщение готово. Откройте Telegram по кнопке ниже, проверьте текст и отправьте его.",
    );
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus(
        "Текст скопирован. Если Telegram не подставил его, вставьте из буфера обмена.",
      );
    } catch {
      readyRef.current?.focus();
      readyRef.current?.select();
      setStatus("Текст выделен. Скопируйте его вручную и вставьте в Telegram.");
    }
  }
  return (
    <form className="brief" onSubmit={prepare}>
      <noscript>
        Для формы нужен JavaScript. Можно написать напрямую по ссылке Telegram
        рядом.
      </noscript>
      <h2>С чего начать сообщение</h2>
      <p>
        Соберите короткое описание и откройте Telegram с готовым сообщением.
        Отправку подтверждаете вы.
      </p>
      <label htmlFor="industry">
        Ваша сфера *
        <input
          id="industry"
          name="industry"
          value={industry}
          onChange={(e) => {
            setIndustry(e.target.value);
            e.target.setCustomValidity("");
            setMessage("");
            setStatus("");
          }}
          required
          maxLength={120}
          placeholder="Например, производство навесов"
        />
      </label>
      <label htmlFor="task">
        Что нужно упростить? *
        <textarea
          id="task"
          name="task"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            e.target.setCustomValidity("");
            setMessage("");
            setStatus("");
          }}
          required
          minLength={10}
          maxLength={3000}
          placeholder="Как считаете сейчас и что хотите получить на выходе"
        />
      </label>
      <motion.button
        className="button"
        type="submit"
        tabIndex={0}
        whileHover={reduced ? undefined : { scale: 1.015 }}
        whileTap={reduced ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        Подготовить сообщение <span aria-hidden="true">↗</span>
      </motion.button>
      <p className="brief-help">
        Не отправляйте пароли, ключи доступа или персональные данные клиентов.
      </p>
      <p className="status" role="status">
        {status}
      </p>
      {message && (
        <>
          <label htmlFor="ready">
            Текст сообщения
            <textarea ref={readyRef} id="ready" readOnly value={message} />
          </label>
          <a
            className="button"
            href={telegramMessageLink(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть Telegram с сообщением ↗
            <span className="sr-only"> (в новой вкладке)</span>
          </a>
          <button type="button" className="text-link" onClick={copy}>
            Скопировать текст
          </button>
        </>
      )}
    </form>
  );
}
