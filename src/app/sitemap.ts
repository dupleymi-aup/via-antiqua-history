import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://via-antiqua-history.vercel.app'

  const sections = [
    '#greece', '#rome', '#mesopotamia', '#kuban',
    '#persons', '#wonders', '#orders', '#epochs',
    '#timeline', '#map', '#comparison', '#analysis',
    '#glossary', '#quiz', '#sources',
  ]

  const sectionEntries: MetadataRoute.Sitemap = sections.map((hash) => ({
    url: `${baseUrl}/${hash}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...sectionEntries,
  ]
}
