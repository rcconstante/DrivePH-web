export const brand = {
  name: 'DrivePH Guide',
  title: 'DrivePH Guide - Philippine Driving Guide, LTO Reviewer & Road Safety App',
  siteUrl: 'https://driveph.rcconstante.dev',
  displayUrl: 'driveph.rcconstante.dev',
  supportEmail: 'support@driveph.com',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.djacobsen91.DrivePHGuide',
  routes: {
    home: '/',
    privacy: '/privacy-policy',
    legacyPrivacy: '/privacy',
    terms: '/terms',
    license: '/license',
    support: '/support',
  },
  assets: {
    icon: '/driveph/icon.png',
    hero: '/driveph/home-car.webp',
    screenshots: [
      '/driveph/onboarding-2.webp',
      '/driveph/onboarding-3.webp',
      '/driveph/home-car.webp',
      '/driveph/home-driver.webp',
      '/driveph/road-signs-guide.webp',
      '/driveph/lto-quiz.webp',
    ],
  },
  iconAlt: 'DrivePH Guide app icon',
} as const;

export const getAbsoluteUrl = (path = '/') => new URL(path, brand.siteUrl).toString();
