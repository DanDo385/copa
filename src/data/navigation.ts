/**
 * COPA Jewelry site navigation registry.
 */

export type NavItemType = 'link' | 'dropdown' | 'placeholder' | 'action';

export interface NavChild {
  label: string;
  href: string;
  collectionHandle?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  type: NavItemType;
  children?: NavChild[];
  placeholder?: boolean;
  icon?: 'search' | 'account' | 'cart';
}

export const primaryNavigation: NavItem[] = [
  {
    id: 'nav-shop',
    label: 'Shop',
    href: '/collections/all',
    type: 'link',
  },
  {
    id: 'nav-new',
    label: 'New',
    href: '/collections/new-arrivals',
    type: 'link',
  },
  {
    id: 'nav-best-sellers',
    label: 'Best Sellers',
    href: '/collections/best-sellers',
    type: 'link',
  },
  {
    id: 'nav-categories',
    label: 'Categories',
    type: 'dropdown',
    children: [
      { label: 'Earrings', href: '/collections/earrings', collectionHandle: 'earrings' },
      { label: 'Necklaces', href: '/collections/necklaces', collectionHandle: 'necklaces' },
      { label: 'Rings', href: '/collections/rings', collectionHandle: 'rings' },
      { label: 'Bracelets', href: '/collections/bracelets', collectionHandle: 'bracelets' },
      { label: 'Ear Cuffs', href: '/collections/ear-cuffs', collectionHandle: 'ear-cuffs' },
    ],
  },
  {
    id: 'nav-live-shows',
    label: 'Live Shows',
    href: '/live-shows',
    type: 'link',
    placeholder: true,
  },
  {
    id: 'nav-custom',
    label: 'Custom',
    href: '/custom',
    type: 'link',
    placeholder: true,
  },
  {
    id: 'nav-our-story',
    label: 'Our Story',
    href: '/our-story',
    type: 'link',
    placeholder: true,
  },
];

export const utilityNavigation: NavItem[] = [
  {
    id: 'nav-search',
    label: 'Search',
    href: '/search',
    type: 'action',
    icon: 'search',
  },
  {
    id: 'nav-account',
    label: 'Account',
    href: '/account',
    type: 'placeholder',
    icon: 'account',
    placeholder: true,
  },
  {
    id: 'nav-cart',
    label: 'Cart',
    href: '/cart',
    type: 'action',
    icon: 'cart',
  },
];

export const allNavigation: NavItem[] = [...primaryNavigation, ...utilityNavigation];
