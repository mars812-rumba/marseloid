import Link from "next/link";
import { posts } from "@/lib/content";
import { CTA, PageIntro } from "@/components/shared";
export const metadata = {
  title: "Заметки о конфигураторах и автоматизации",
  description:
    "Практические разборы: как определить задачу и подготовить данные для разработки бизнес-системы.",
  alternates: { canonical: "/blog" },
};
export default function Page() {
  return (
    <>
      <div className="wrap">
        <PageIntro
          label="Заметки"
          title="О сложных системах. По существу."
          description="Как разобраться в задаче до разработки: что автоматизировать, какие данные собрать и где остановить первую версию."
        />
        <div className="post-list">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`}>
              <span className="eyebrow">
                {p.tag} / {p.reading}
              </span>
              <h2>{p.title} ↗</h2>
              <p>{p.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <CTA />
    </>
  );
}
