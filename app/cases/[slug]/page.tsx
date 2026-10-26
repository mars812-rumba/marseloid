import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/case-studies";
import { CaseStudyPage } from "@/components/case-study";
import { cases } from "@/lib/content";
import { CaseGallery } from "@/components/case-gallery";
import {
  ArticleSections,
  CTA,
  PageIntro,
  ProjectArt,
} from "@/components/shared";
export const dynamicParams = false;
export function generateStaticParams() {
  return cases.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = cases.find((c) => c.slug === slug);
  return {
    title: c?.title,
    description: c?.description,
    alternates: { canonical: `/cases/${slug}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = cases.find((c) => c.slug === slug);
  if (!c) notFound();
  const study = caseStudies[c.slug];
  if (study) {
    return (
      <CaseStudyPage
        project={c}
        study={study}
        demonstration={c.slug === "chimneys" ? <CaseGallery /> : undefined}
      />
    );
  }

  return (
    <>
      <article className="wrap">
        <PageIntro
          label={`Проект / ${c.status}`}
          title={c.title}
          description={c.description}
        />
        {c.slug === "chimneys" ? (
          <CaseGallery />
        ) : (
          <>
            <ProjectArt tone={c.tone} />
            <p className="caption">
              Иллюстрация процесса, не снимок интерфейса.
            </p>
          </>
        )}
        <div className="detail-grid">
          <aside className="detail-aside">
            <span className="eyebrow">{c.category}</span>
            <p>{c.status}</p>
            <a
              className="text-link"
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Открыть сайт ↗<span className="sr-only"> (в новой вкладке)</span>
            </a>
          </aside>
          <ArticleSections sections={c.sections} />
        </div>
      </article>
      <CTA />
    </>
  );
}
