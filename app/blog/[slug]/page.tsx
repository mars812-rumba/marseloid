import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
import { ArticleSections, CTA, PageIntro } from "@/components/shared";
export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  return {
    title: p?.title,
    description: p?.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <article className="wrap reading">
        <PageIntro
          label={`${p.tag} / ${p.reading}`}
          title={p.title}
          description={p.description}
        />
        <ArticleSections sections={p.sections} />
        <p className="caption">Автор: Marseloid · Независимый разработчик</p>
      </article>
      <CTA />
    </>
  );
}
