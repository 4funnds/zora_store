import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const siteName = 'Zora Fashion';
  const defaultDescription = 'Discover Indonesian-inspired fashion for the modern entrepreneur at Zora.';
  const defaultKeywords = 'fashion, Indonesian clothing, batik, SME fashion, Zora';
  const siteUrl = 'https://zora.com';
  const defaultImage = '../../../public/zora.png';

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta
        name="description"
        content={description || defaultDescription}
      />
      <meta
        name="keywords"
        content={keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords}
      />
      <meta property="og:title" content={title || siteName} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={image || defaultImage} />
      <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />
    </Helmet>
  );
};

export default SEO;