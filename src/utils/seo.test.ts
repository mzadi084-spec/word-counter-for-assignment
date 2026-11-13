import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCanonicalUrl, getStaticPageHref, isStaticPagePath, OG_IMAGE_URL } from './seo';

test('buildCanonicalUrl formats home canonical with trailing slash', () => {
  assert.equal(buildCanonicalUrl(''), 'https://wordcounterforassignment.com/');
  assert.equal(buildCanonicalUrl('/'), 'https://wordcounterforassignment.com/');
});

test('buildCanonicalUrl adds trailing slash to static directory routes', () => {
  const staticPaths = [
    '/urdu-word-counter',
    '/words-to-pages-converter',
    '/character-counter',
    '/paragraph-counter',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/blog',
  ];
  for (const p of staticPaths) {
    assert.equal(isStaticPagePath(p), true);
    assert.equal(getStaticPageHref(p), `${p}/`);
    assert.equal(buildCanonicalUrl(p), `https://wordcounterforassignment.com${p}/`);
    assert.equal(buildCanonicalUrl(`${p}/`), `https://wordcounterforassignment.com${p}/`);
  }
});

test('buildCanonicalUrl leaves React-only routes without static HTML unchanged', () => {
  assert.equal(isStaticPagePath('/sentence-counter'), false);
  assert.equal(isStaticPagePath('/essay-word-counter'), false);
  assert.equal(isStaticPagePath('/reading-time-calculator'), false);
  assert.equal(
    buildCanonicalUrl('/sentence-counter'),
    'https://wordcounterforassignment.com/sentence-counter'
  );
  assert.equal(
    buildCanonicalUrl('/blog/how-to-check-assignment-word-count'),
    'https://wordcounterforassignment.com/blog/how-to-check-assignment-word-count'
  );
});

test('OG_IMAGE_URL points to og-image.png at site root', () => {
  assert.equal(OG_IMAGE_URL, 'https://wordcounterforassignment.com/og-image.png');
});
