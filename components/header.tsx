"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const links = [
    ["/services/", "Что делаю"],
    ["/cases/", "Проекты"],
    ["/about/", "Подход"],
    ["/blog/", "Заметки"],
  ];
  return (
    <header className="header wrap">
      <Link
        className="logo"
        href="/"
        aria-label="Marseloid — на главную"
        onClick={() => setOpen(false)}
      >
        marseloid<span className="brand-dot">.</span>
        <span className="logo-caption">независимый разработчик</span>
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Закрыть" : "Меню"}
      </button>
      <nav
        id="navigation"
        aria-label="Основная навигация"
        className={open ? "nav is-open" : "nav"}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
          }
        }}
      >
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              path.startsWith(href.slice(0, -1)) ? "page" : undefined
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          className="nav-cta"
          href={path === "/" ? "#contact" : "/contact/"}
          onClick={() => setOpen(false)}
        >
          Обсудить задачу <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
