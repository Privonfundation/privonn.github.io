import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  lang?: string;
  image?: string;
  type?: string;
}

const SITE_URL = 'https://obscuritysecurity.github.io';
const DEFAULT_IMAGE = '/og-image.png';

const Seo: React.FC<SeoProps> = ({ title, description, path, lang = 'en', image = DEFAULT_IMAGE, type = 'website' }) => {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ObscuritySecurity`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="ObscuritySecurity" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />

      {/* JSON-LD Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ObscuritySecurity',
          url: SITE_URL,
          logo: `${SITE_URL}/CrytoTool.png`,
          description: 'Open-source, privacy-first cybersecurity solutions. Zero data collection, zero tracking, zero knowledge.',
          foundingDate: '2026',
          legalName: 'ObscuritySecurity',
          sameAs: [
            'https://github.com/ObscuritySecurity',
            'https://matrix.to/#/#obscuritysecurity:matrix.org',
            'https://mastodon.social/@ObscuritySecurity',
            'https://pixelfed.social/i/web/profile/ObscuritySecurity',
            'https://lemmy.world/c/obscuritysecurity',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'obscurity.devv@protonmail.com',
            contactType: 'customer support',
          },
        })}
      </script>
    </Helmet>
  );
};

export default Seo;
