import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "SentinelHeaders - Professional HTTP Security Headers Scanner",
  description = "Professional HTTP security headers scanner with modern React GUI. Analyze website security, detect vulnerabilities, and get detailed reports.",
  keywords = "HTTP security headers, security scanner, web security, vulnerability assessment, HSTS, CSP, security testing",
  image = "/og-image.png",
  url = "https://sentinelheaders.com",
  type = "website"
}) => {
  const fullTitle = title.includes('SentinelHeaders') ? title : `${title} | SentinelHeaders`;
  const fullUrl = url.startsWith('http') ? url : `https://sentinelheaders.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://sentinelheaders.com${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Harsh Parashar (Sneckey0day), Prashant Kumar" />
    </Helmet>
  );
};

export default SEO;