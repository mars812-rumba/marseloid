"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
export function Brief() {
  const reduced = useReducedMotion();
  const [industry, setIndustry] = useState("");
  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  async function prepare(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = `Привет! Хочу обсудить задачу.\n\nСфера: ${industry.trim()}\nЧто нужно: ${task.trim()}`;
    setMessage(text);
    try {
      await navigator.clipboard.writeText(text);
      setStatus(
        "Описание скопировано. Откройте Telegram, вставьте его в сообщение и отправьте мне.",
      );
    } catch {
      setStatus(
        "Не удалось скопировать автоматически. Скопируйте текст ниже и отправьте в Telegram.",
      );
    }
  }
  return (
    <form className="brief" onSubmit={prepare}>
      <h2>С чего начать сообщение</h2>
      <p>
        Если проще с подсказками — соберите короткое описание. Оно остаётся
        только в вашем браузере.
      </p>
      <label htmlFor="industry">
        Ваша сфера *
        <input
          id="industry"
          name="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
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
          onChange={(e) => setTask(e.target.value)}
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
        whileHover={reduced ? undefined : { y: -3 }}
        whileTap={reduced ? undefined : { scale: 0.98 }}
      >
        Подготовить и скопировать <span aria-hidden="true">↗</span>
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
            <textarea id="ready" readOnly value={message} />
          </label>
          <a
            className="text-link"
            href="https://t.me/marseloid"
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть @marseloid в Telegram ↗
            <span className="sr-only"> (в новой вкладке)</span>
          </a>
        </>
      )}
    </form>
  );
}
