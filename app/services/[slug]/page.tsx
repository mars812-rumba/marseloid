import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import { WebsitesService } from "@/components/websites-service";
import { DetailedService } from "@/components/detailed-services";
import { servicePages, type DetailedServiceSlug } from "@/lib/service-pages";
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
  const item = services.find((service) => service.slug === slug);
  if (!item) notFound();
  const detail =
    slug in servicePages
      ? servicePages[slug as DetailedServiceSlug]
      : undefined;
  const title = detail?.title ?? item.title;
  const description = detail?.description ?? item.description;
  const canonical = `/services/${slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    ...(detail
      ? {
          openGraph: {
            title,
            description,
            url: canonical,
            type: "website",
            locale: "ru_RU",
            siteName: "Марсель",
            images: [
              {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: "Марсель — сайты и веб-системы для бизнеса",
              },
            ],
          },
          twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/og.png"],
          },
        }
      : {}),
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!services.some((service) => service.slug === slug)) notFound();
  if (slug === "websites-and-improvements") return <WebsitesService />;
  if (slug in servicePages)
    return <DetailedService slug={slug as DetailedServiceSlug} />;
  notFound();
}
