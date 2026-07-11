import type { MetadataRoute } from "next";
import { DEFAULT_SITE_URL } from "@/lib/constants";
import {
  allRegions,
  glossary,
  persons,
  wonders,
  epochs,
} from "@/lib/history-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Add region/city pages
  const citySlugs: {
    slug: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
  }[] = [];
  for (const region of allRegions) {
    citySlugs.push({
      slug: region.id,
      priority: 0.8,
      changeFrequency: "weekly",
    });
    for (const city of region.cities) {
      citySlugs.push({
        slug: `${region.id}/${city.id}`,
        priority: 0.7,
        changeFrequency: "monthly",
      });
    }
  }

  // Add glossary pages
  for (const term of glossary) {
    citySlugs.push({
      slug: `glossary/${term.term.toLowerCase().replace(/\s+/g, "-")}`,
      priority: 0.5,
      changeFrequency: "monthly",
    });
  }

  // Add persons pages
  for (const person of persons) {
    citySlugs.push({
      slug: `persons/${person.id}`,
      priority: 0.6,
      changeFrequency: "monthly",
    });
  }

  // Add wonders pages
  for (const wonder of wonders) {
    citySlugs.push({
      slug: `wonders/${wonder.id}`,
      priority: 0.6,
      changeFrequency: "monthly",
    });
  }

  // Add epochs pages
  for (const epoch of epochs) {
    citySlugs.push({
      slug: `epochs/${epoch.id}`,
      priority: 0.6,
      changeFrequency: "monthly",
    });
  }

  return [
    ...staticPages,
    ...citySlugs.map(({ slug, priority, changeFrequency }) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
  ];
}
