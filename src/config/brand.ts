export const brand = {
  name: 'DrivePH Guide',
  shortName: 'DrivePH',
  title: 'DrivePH Guide | LTO Reviewer, Road Signs & Philippine Driving Guide',
  description:
    'DrivePH Guide is an independent Philippine driving app for LTO reviewer quizzes, student permit prep, road signs, traffic rules, scenarios, and vehicle care.',
  siteUrl: 'https://driveph.rcconstante.dev',
  displayUrl: 'driveph.rcconstante.dev',
  supportEmail: 'support@driveph.com',
  appStoreUrl: 'https://apps.apple.com/ph/app/driveph-guide/id6740705206',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.driveph.guide',
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
      {
        src: '/driveph/asset1.png',
        alt: 'DrivePH Guide home screen with daily check-in, progress, and continue learning',
        width: 852,
        height: 1844,
      },
      {
        src: '/driveph/asset2.png',
        alt: 'DrivePH Guide daily check-in streak and progress screen',
        width: 853,
        height: 1844,
      },
      {
        src: '/driveph/asset3.png',
        alt: 'DrivePH Guide level and rank progress screen',
        width: 853,
        height: 1844,
      },
      {
        src: '/driveph/asset4.png',
        alt: 'DrivePH Guide lessons and recommended driving modules screen',
        width: 853,
        height: 1844,
      },
      {
        src: '/driveph/asset5.png',
        alt: 'DrivePH Guide rain driving scenario lesson screen',
        width: 853,
        height: 1844,
      },
      {
        src: '/driveph/asset6.png',
        alt: 'DrivePH Guide LTO reviewer quiz set selection screen',
        width: 853,
        height: 1844,
      },
      {
        src: '/driveph/asset7.png',
        alt: 'DrivePH Guide language selection screen',
        width: 853,
        height: 1844,
      },
      {
        src: '/driveph/asset8.png',
        alt: 'DrivePH Guide road signs quiz answer review screen',
        width: 853,
        height: 1844,
      },
    ],
  },
  iconAlt: 'DrivePH Guide app icon',
} as const;

export const getAbsoluteUrl = (path = '/') => new URL(path, brand.siteUrl).toString();
