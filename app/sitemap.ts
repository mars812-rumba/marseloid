import type { MetadataRoute } from "next";
import { cases, posts, services, site } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/services",
    "/cases",
    "/about",
    "/contact",
    "/blog",
    "/privacy",
    ...services.map((s) => `/services/${s.slug}`),
    ...cases.map((c) => `/cases/${c.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ].map((path) => ({ url: site + path }));
}
