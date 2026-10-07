import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nobtech.fr';

  const staticPages = [
    '/',
    '/a-propos',
    '/services',
    '/secteurs',
    '/realisations',
    '/contact',
    '/faq',
    '/tarifs',
    '/carrieres',
    '/certifications',
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
