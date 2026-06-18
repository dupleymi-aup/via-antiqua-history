import type { MetadataRoute } from 'next'
import { allRegions } from '@/lib/history-data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://via-antiqua-history.vercel.app'

  const cityUrls = allRegions.flatMap((region) =>
    region.cities.map((city) => ({
      url: `${baseUrl}/${region.id}/${city.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  const landmarkUrls = allRegions.flatMap((region) =>
    region.cities.flatMap((city) =>
      city.landmarks.map((landmark) => ({
        url: `${baseUrl}/${region.id}/${city.id}/${landmark.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    )
  )

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...cityUrls,
    ...landmarkUrls,
  ]
}
