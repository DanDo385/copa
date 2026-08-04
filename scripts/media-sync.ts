#!/usr/bin/env tsx
/**
 * Media sync — inventories first-party COPA imagery from copajewelry.com.
 * Prototype-only; writes manifest to data/media-manifest.json.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MANIFEST_PATH = path.join(process.cwd(), "data", "media-manifest.json");
const PUBLIC_MEDIA = path.join(process.cwd(), "public", "media");

async function main() {
  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await mkdir(PUBLIC_MEDIA, { recursive: true });

  const manifest = {
    synced_at: new Date().toISOString(),
    source: "https://copajewelry.com/",
    note: "Run full crawl in Phase 3. Scaffold creates empty manifest.",
    assets: [] as unknown[],
  };

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`Media manifest written to ${MANIFEST_PATH}`);
  console.log("Add COPA first-party assets to public/media/ as they are inventoried.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
