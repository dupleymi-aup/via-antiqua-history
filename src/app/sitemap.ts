import type { MetadataRoute } from 'next'

const sections = [
  'greece', 'rome', 'mesopotamia', 'kuban', 'persons',
  'wonders', 'orders', 'epochs', 'timeline', 'map',
  'comparison', 'analysis', 'glossary', 'quiz', 'sources',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://via-antiqua-history.vercel.app'
  const now = new Date()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...sections.map((id) => ({
      url: `${baseUrl}/#${id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
