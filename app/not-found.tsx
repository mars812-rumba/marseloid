import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap page-intro">
      <p className="eyebrow">404 / Ничего не найдено</p>
      <h1>
        Здесь пока
        <br />
        ничего не собрано.
      </h1>
      <p className="intro-text">Проверьте адрес или вернитесь к проектам.</p>
      <Link className="button" href="/cases/">
        Посмотреть проекты ↗
      </Link>
    </section>
  );
}
