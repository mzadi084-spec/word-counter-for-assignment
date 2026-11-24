export const SITE_URL = 'https://wordcounterforassignment.com';
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

export const STATIC_PAGE_PATHS = new Set([
  '/urdu-word-counter',
  '/roman-urdu-word-counter',
  '/words-to-pages-converter',
  '/character-counter',
  '/paragraph-counter',
  '/sentence-counter',
  '/essay-word-counter',
  '/reading-time-calculator',
  '/speech-time-calculator',
  '/assignment-word-limit-calculator',
  '/words-per-minute-calculator',
  '/line-counter',
  '/unique-word-counter',
  '/pdf-word-counter',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/disclaimer',
  '/blog',
]);

// Routes served by standalone legacy static HTML files in public/
export const PUBLIC_STANDALONE_PATHS = new Set([
  '/urdu-word-counter',
  '/words-to-pages-converter',
  '/character-counter',
  '/paragraph-counter',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/blog',
]);

export function isStaticPagePath(path: string): boolean {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const withoutTrailing = normalized.replace(/\/+$/, '');
  return STATIC_PAGE_PATHS.has(withoutTrailing);
}

export function isPublicStandalonePath(path: string): boolean {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const withoutTrailing = normalized.replace(/\/+$/, '');
  return PUBLIC_STANDALONE_PATHS.has(withoutTrailing);
}

export function getStaticPageHref(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const withoutTrailing = normalized.replace(/\/+$/, '');
  if (!withoutTrailing) return '/';
  return `${withoutTrailing}/`;
}

export function buildCanonicalUrl(canonicalPath = ''): string {
  if (!canonicalPath || canonicalPath === '/') {
    return `${SITE_URL}/`;
  }
  const normalized = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const withoutTrailing = normalized.replace(/\/+$/, '');
  if (STATIC_PAGE_PATHS.has(withoutTrailing)) {
    return `${SITE_URL}${withoutTrailing}/`;
  }
  return `${SITE_URL}${normalized}`;
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}
