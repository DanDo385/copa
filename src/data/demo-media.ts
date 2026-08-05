export const demoMedia = {
  hero: {
    sourceUrl: 'https://copajewelry.com/cdn/shop/files/13DC3D9F-213D-4F47-B328-0339C9DD5CB5.jpg?v=1772810246&width=3024',
    alt: 'CopaJewelry Spring 2026 campaign',
  },
  categories: {
    necklaces: 'https://copajewelry.com/cdn/shop/files/IMG_5232_JPG.jpg?v=1772810153&width=3024',
    rings: 'https://copajewelry.com/cdn/shop/files/2EC6B845-5DA0-4F00-8DFB-A8935DE0DF48.jpg?v=1759890725&width=2388',
    earrings: 'https://copajewelry.com/cdn/shop/files/372E79D8-CF9F-4F77-8117-EFC968C4BC7A.jpg?v=1760128250&width=3024',
  },
  whatnotStorefront: {
    sourceUrl: 'https://images.whatnot.com/fit-in/3840x0/filters:format(webp)/users%2F14387155%2Fstore%2F598ef0de-016a-4bbc-9b13-29d4d954527e.jpeg',
    alt: 'CopaJewelry Whatnot storefront',
  },
} as const;

export const demoMediaProvenance = {
  rights: 'INTERNAL_PROTOTYPE_ONLY',
  retrievedDate: '2026-08-04',
  sourcePages: [
    'https://copajewelry.com/',
    'https://www.whatnot.com/user/copajewelry/shop',
  ],
  note: 'Remote public-source imagery for the local CopaJewelry consulting prototype. Do not copy, deploy, or publish these assets without owner approval.',
} as const;
