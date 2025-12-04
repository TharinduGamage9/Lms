import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freenote.lk'
  
  const routes = [
    '',
    '/ol',
    '/al',
    '/notes',
    '/nvq',
    '/psychology',
    '/bcom',
    '/languages',
    '/ba-external',
    '/grade5',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))
}

