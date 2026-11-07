import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_URL = 'https://wordcounterforassignment.com';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  schema,
}) => {
  const fullCanonical = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="Word Counter for Assignment" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
