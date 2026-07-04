export const brand = {
  name: 'DrivePH Guide',
  shortName: 'DrivePH',
  title: 'DrivePH Guide | LTO Reviewer, Road Signs & Philippine Driving Guide',
  description:
    'DrivePH Guide is an independent Philippine driving app for LTO reviewer quizzes, student permit prep, road signs, traffic rules, scenarios, and vehicle care.',
  siteUrl: 'https://driveph.rcconstante.dev',
  displayUrl: 'driveph.rcconstante.dev',
  supportEmail: 'support@driveph.com',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.djacobsen91.DrivePHGuide',
  version: '1.0.0',
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
