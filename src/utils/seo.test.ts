import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildBreadcrumbSchema,
  buildCanonicalUrl,
  getStaticPageHref,
  isStaticPagePath,
  isPublicStandalonePath,
  OG_IMAGE_URL,
} from './seo';

test('buildCanonicalUrl formats home canonical with trailing slash', () => {
  assert.equal(buildCanonicalUrl(''), 'https://wordcounterforassignment.com/');
  assert.equal(buildCanonicalUrl('/'), 'https://wordcounterforassignment.com/');
});

test('buildCanonicalUrl adds trailing slash to all static and tool directory routes', () => {
  const directoryPaths = [
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
  ];
  for (const p of directoryPaths) {
    assert.equal(isStaticPagePath(p), true);
    assert.equal(getStaticPageHref(p), `${p}/`);
    assert.equal(buildCanonicalUrl(p), `https://wordcounterforassignment.com${p}/`);
    assert.equal(buildCanonicalUrl(`${p}/`), `https://wordcounterforassignment.com${p}/`);
  }
});

test('isPublicStandalonePath distinguishes legacy public HTML tools from React tool pages', () => {
  assert.equal(isPublicStandalonePath('/urdu-word-counter'), true);
  assert.equal(isPublicStandalonePath('/words-to-pages-converter'), true);
  assert.equal(isPublicStandalonePath('/roman-urdu-word-counter'), false);
  assert.equal(isPublicStandalonePath('/pdf-word-counter'), false);
});

test('buildCanonicalUrl leaves React blog article slugs unchanged', () => {
  assert.equal(
    buildCanonicalUrl('/blog/how-to-check-assignment-word-count'),
    'https://wordcounterforassignment.com/blog/how-to-check-assignment-word-count'
  );
});

test('OG_IMAGE_URL points to og-image.png at site root', () => {
  assert.equal(OG_IMAGE_URL, 'https://wordcounterforassignment.com/og-image.png');
});

test('buildBreadcrumbSchema builds BreadcrumbList with trailing-slash canonical URLs', () => {
  const schema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Pdf Word Counter', path: '/pdf-word-counter' },
  ]) as {
    '@type': string;
    itemListElement: Array<{ position: number; name: string; item: string }>;
  };

  assert.equal(schema['@type'], 'BreadcrumbList');
  assert.equal(schema.itemListElement.length, 2);
  assert.equal(schema.itemListElement[0].item, 'https://wordcounterforassignment.com/');
  assert.equal(
    schema.itemListElement[1].item,
    'https://wordcounterforassignment.com/pdf-word-counter/'
  );
});
