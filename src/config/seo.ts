import { useEffect } from 'react';
import { brand, getAbsoluteUrl } from './brand';

const INDEX_ROBOTS = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
const NOINDEX_ROBOTS = 'noindex,nofollow';
const DEFAULT_IMAGE_URL = getAbsoluteUrl(brand.assets.icon);
const DEFAULT_IMAGE_ALT = `${brand.name} app icon`;

type OpenGraphType = 'website' | 'article';

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  robots?: string;
  type?: OpenGraphType;
  imageUrl?: string;
  imageAlt?: string;
};

export const pageSeo = {
  home: {
    title: brand.title,
    description: brand.description,
    path: brand.routes.home,
  },
  privacy: {
    title: `Privacy Policy | ${brand.name}`,
    description: `${brand.name} privacy policy for the independent Philippine driving education app.`,
    path: brand.routes.privacy,
  },
  terms: {
    title: `Terms of Service | ${brand.name}`,
    description: `Read the terms for using ${brand.name}, an independent Philippine driving education app.`,
    path: brand.routes.terms,
  },
  license: {
    title: `Open Source Licenses | ${brand.name}`,
    description: `Open source licenses for key third-party libraries used by ${brand.name}.`,
    path: brand.routes.license,
  },
  support: {
    title: `Support | ${brand.name}`,
    description: `Get help with ${brand.name} lessons, quizzes, scenarios, and support questions.`,
    path: brand.routes.support,
  },
  notFound: {
    title: `Page Not Found | ${brand.name}`,
    description: `The requested ${brand.name} page was not found.`,
    path: '/404',
    robots: NOINDEX_ROBOTS,
  },
} as const satisfies Record<string, PageSeo>;

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }

  element.href = url;
}

function upsertAlternate(url: string) {
  const alternates = [
    { hreflang: 'en-PH', href: url },
    { hreflang: 'x-default', href: url },
  ];

  for (const alternate of alternates) {
    let element = document.head.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${alternate.hreflang}"]`,
    );

    if (!element) {
      element = document.createElement('link');
      element.rel = 'alternate';
      element.hreflang = alternate.hreflang;
      document.head.appendChild(element);
    }

    element.href = alternate.href;
  }
}

export function applyPageSeo(config: PageSeo) {
  const canonicalUrl = getAbsoluteUrl(config.path);
  const robots = config.robots ?? INDEX_ROBOTS;
  const imageUrl = config.imageUrl ?? DEFAULT_IMAGE_URL;
  const imageAlt = config.imageAlt ?? DEFAULT_IMAGE_ALT;

  document.documentElement.lang = 'en-PH';
  document.title = config.title;

  upsertMeta('name', 'description', config.description);
  upsertMeta('name', 'robots', robots);
  upsertMeta('name', 'googlebot', robots);
  upsertMeta('name', 'bingbot', robots);
  upsertMeta('name', 'application-name', brand.name);
  upsertMeta('name', 'apple-mobile-web-app-title', brand.name);
  upsertMeta('name', 'theme-color', '#2f973b');
  upsertMeta('name', 'geo.region', 'PH');
  upsertMeta('name', 'geo.placename', 'Philippines');

  upsertMeta('property', 'og:type', config.type ?? 'website');
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:title', config.title);
  upsertMeta('property', 'og:description', config.description);
  upsertMeta('property', 'og:image', imageUrl);
  upsertMeta('property', 'og:image:alt', imageAlt);
  upsertMeta('property', 'og:site_name', brand.name);
  upsertMeta('property', 'og:locale', 'en_PH');

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', config.title);
  upsertMeta('name', 'twitter:description', config.description);
  upsertMeta('name', 'twitter:image', imageUrl);
  upsertMeta('name', 'twitter:image:alt', imageAlt);

  upsertCanonical(canonicalUrl);
  upsertAlternate(canonicalUrl);
}

export function usePageSeo(config: PageSeo) {
  useEffect(() => {
    applyPageSeo(config);

    return () => {
      applyPageSeo(pageSeo.home);
    };
  }, [config]);
}
