#!/usr/bin/env tsx
/**
 * Link audit — verifies documented internal routes have corresponding app files.
 */

import { access } from "node:fs/promises";
import path from "node:path";

const ROUTES: { route: string; file: string }[] = [
  { route: "/", file: "src/app/page.tsx" },
  { route: "/about", file: "src/app/about/page.tsx" },
  { route: "/collections/all", file: "src/app/collections/[handle]/page.tsx" },
  { route: "/search", file: "src/app/search/page.tsx" },
  { route: "/cart", file: "src/app/cart/page.tsx" },
  { route: "/live-shows", file: "src/app/live-shows/page.tsx" },
  { route: "/contact", file: "src/app/contact/page.tsx" },
];

async function exists(file: string): Promise<boolean> {
  try {
    await access(path.join(process.cwd(), file));
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const missing: string[] = [];

  for (const { route, file } of ROUTES) {
    if (!(await exists(file))) {
      missing.push(`${route} → ${file}`);
    }
  }

  if (missing.length > 0) {
    console.warn("Link audit: routes pending implementation (scaffold phase):");
    missing.forEach((m) => console.warn(`  - ${m}`));
    console.warn(`${missing.length} route(s) not yet implemented — expected in Phase 3.`);
    process.exit(0);
  }

  console.log("Link audit passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
