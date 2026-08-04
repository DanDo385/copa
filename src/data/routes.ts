/**
 * Prototype route inventory for link checking and documentation.
 */

export interface RouteEntry {
  path: string;
  name: string;
  type: "page" | "collection" | "product" | "policy" | "utility";
  status: "implemented" | "planned" | "placeholder";
}

export const prototypeRoutes: RouteEntry[] = [
  { path: "/", name: "Homepage", type: "page", status: "planned" },
  { path: "/collections/all", name: "Shop All", type: "collection", status: "planned" },
  { path: "/collections/earrings", name: "Earrings", type: "collection", status: "planned" },
  { path: "/collections/necklaces", name: "Necklaces", type: "collection", status: "planned" },
  { path: "/collections/rings", name: "Rings", type: "collection", status: "planned" },
  { path: "/collections/bracelets", name: "Bracelets", type: "collection", status: "planned" },
  { path: "/collections/ear-cuffs", name: "Ear Cuffs", type: "collection", status: "planned" },
  { path: "/collections/best-sellers", name: "Best Sellers", type: "collection", status: "planned" },
  { path: "/collections/new-arrivals", name: "New Arrivals", type: "collection", status: "planned" },
  { path: "/collections/gifts", name: "Gifts", type: "collection", status: "planned" },
  { path: "/collections/gifts-under-100", name: "Gifts Under Threshold", type: "collection", status: "planned" },
  { path: "/products/imperial-necklace", name: "Imperial Necklace PDP", type: "product", status: "planned" },
  { path: "/products/tiara-ring", name: "Tiara Ring PDP", type: "product", status: "planned" },
  { path: "/products/fleur-earrings", name: "Fleur Earrings PDP", type: "product", status: "planned" },
  { path: "/products/diamond-dust-ring", name: "Diamond Dust Ring PDP", type: "product", status: "planned" },
  { path: "/products/intaglio-bracelet", name: "Intaglio Bracelet PDP", type: "product", status: "planned" },
  { path: "/search", name: "Search", type: "utility", status: "planned" },
  { path: "/cart", name: "Cart", type: "utility", status: "planned" },
  { path: "/about", name: "Our Story", type: "page", status: "planned" },
  { path: "/founders", name: "Meet the Founders", type: "page", status: "planned" },
  { path: "/reviews", name: "Reviews", type: "page", status: "planned" },
  { path: "/live-shows", name: "Live Shows", type: "page", status: "planned" },
  { path: "/custom", name: "Custom & Bespoke", type: "page", status: "planned" },
  { path: "/materials-and-care", name: "Materials and Care", type: "policy", status: "planned" },
  { path: "/size-guide", name: "Size Guide", type: "policy", status: "planned" },
  { path: "/warranty", name: "Warranty", type: "policy", status: "planned" },
  { path: "/shipping-and-returns", name: "Shipping and Returns", type: "policy", status: "planned" },
  { path: "/faq", name: "FAQ", type: "policy", status: "planned" },
  { path: "/contact", name: "Contact", type: "page", status: "planned" },
  { path: "/privacy", name: "Privacy", type: "policy", status: "planned" },
  { path: "/terms", name: "Terms", type: "policy", status: "planned" },
  { path: "/limited-edition", name: "Limited Edition Template", type: "page", status: "planned" },
];

export const productHandles = [
  "imperial-necklace",
  "tiara-ring",
  "fleur-earrings",
  "diamond-dust-ring",
  "diamond-dust-hoops",
  "snake-necklace",
  "sultan-snake-ring",
  "intaglio-bracelet",
] as const;
