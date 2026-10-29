import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import { CTA, PageIntro } from "@/components/shared";
import Link from "next/link";
import { WebsitesService } from "@/components/websites-service";
import { CanopyDemo } from "@/components/canopy-demo";
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = services.find((s) => s.slug === slug);
  return {
    title: item?.title,
    description: item?.description,
    alternates: { canonical: `/services/${slug}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  if (slug === "websites-and-improvements") return <WebsitesService />;
  return (
    <>
      <div className="wrap">
        <PageIntro
          label={`Услуга / ${s.number}`}
          title={s.title}
          description={s.short}
        />
        {slug === "product-configurators" && <CanopyDemo />}
        <div className="detail-grid">
          <aside className="detail-aside">
            <span className="eyebrow">От ручной работы — к системе</span>
            <p>
              Параметры
              <br />↓<br />
              Правила
              <br />↓<br />
              Проверенный результат
            </p>
            <Link className="text-link" href="/cases/chimneys/">
              Пример: Дымоход Трейд ↗
            </Link>
          </aside>
          <div className="prose">
            <section>
              <h2>Знакомая ситуация?</h2>
              <p>{s.problem}</p>
            </section>
            <section>
              <h2>Что меняется</h2>
              <p>{s.result}</p>
            </section>
            <section>
              <h2>Что делаем в первую очередь</h2>
              <ol>
                {s.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
            <section>
              <h2>Важный нюанс</h2>
              <p>{s.detail}</p>
            </section>
          </div>
        </div>
      </div>
      <CTA />
    </>
  );
}
