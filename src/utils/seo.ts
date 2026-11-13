export const SITE_URL = 'https://wordcounterforassignment.com';
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

export const STATIC_PAGE_PATHS = new Set([
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

export function getStaticPageHref(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const withoutTrailing = normalized.replace(/\/+$/, '');
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
