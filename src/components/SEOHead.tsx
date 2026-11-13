import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { buildCanonicalUrl, OG_IMAGE_URL } from '../utils/seo';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  noindex = false,
  schema,
}) => {
  const fullCanonical = buildCanonicalUrl(canonicalPath);

  useEffect(() => {
    const desired = noindex ? 'noindex, follow' : 'index, follow';
    const robotsTags = Array.from(document.head.querySelectorAll('meta[name="robots"]'));
    if (robotsTags.length > 1) {
      robotsTags.slice(0, -1).forEach((tag) => tag.remove());
    }
    const activeTag = document.head.querySelector('meta[name="robots"]');
    if (activeTag) {
      activeTag.setAttribute('content', desired);
    }
  }, [noindex]);

  return (
    <Helmet>
      {/* Title, Description & Robots */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <link rel="canonical" href={fullCanonical} />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="Word Counter for Assignment" />
      <meta property="og:image" content={OG_IMAGE_URL} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE_URL} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
