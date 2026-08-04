#!/usr/bin/env node
/**
 * Prototype asset sync only — read-only toward live store (GET only).
 * Fetches product JSON from copajewelry.com and downloads images to public/images/products/.
 * Does NOT modify the live Shopify store.
 *
 * Usage: node scripts/download-media.mjs
 *        node scripts/download-media.mjs --handles imperial-necklace,tiara-ring
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "products");
const MANIFEST_PATH = path.join(ROOT, "docs", "media-manifest.json");

const DEFAULT_HANDLES = [
  "imperial-necklace",
  "tiara-ring",
  "fleur-earrings",
  "diamond-dust-ring",
  "diamond-dust-hoops",
  "snake-necklace",
  "sultan-snake-ring",
  "intaglio-bracelet",
];

const STORE_BASE = "https://copajewelry.com";

function parseArgs() {
  const handlesArg = process.argv.find((a) => a.startsWith("--handles="));
  const handles = handlesArg
    ? handlesArg.split("=")[1].split(",").map((h) => h.trim())
    : DEFAULT_HANDLES;
  return { handles };
}

async function fetchProductJson(handle) {
  const url = `${STORE_BASE}/products/${handle}.js`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  return res.json();
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error(`Image GET ${url} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(path.dirname(destPath), { recursive: true });
  await writeFile(destPath, buf);
  return destPath;
}

async function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) {
    return { generated_at: null, assets: [], products: [] };
  }
  return JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
}

async function main() {
  const { handles } = parseArgs();
  const manifest = await loadManifest();
  const productEntries = [];
  const assetEntries = [...(manifest.assets ?? [])];

  console.log("COPA prototype media sync — GET only, no store writes\n");

  for (const handle of handles) {
    try {
      const product = await fetchProductJson(handle);
      const images = product.images ?? [];
      const localImages = [];

      for (let i = 0; i < images.length; i++) {
        const srcUrl = typeof images[i] === "string" ? images[i] : images[i].src;
        if (!srcUrl) continue;
        const ext = path.extname(new URL(srcUrl).pathname) || ".jpg";
        const filename = `${handle}-${i + 1}${ext}`;
        const dest = path.join(OUT_DIR, filename);
        await downloadImage(srcUrl.startsWith("//") ? `https:${srcUrl}` : srcUrl, dest);
        localImages.push(`/images/products/${filename}`);
        assetEntries.push({
          asset_id: `ASSET-${handle}-${i + 1}`,
          source_url: srcUrl,
          source_page: `${STORE_BASE}/products/${handle}`,
          subject_product: handle,
          local_path: localImages[localImages.length - 1],
          rights_status: "first-party-store — prototype internal use only",
          synced_at: new Date().toISOString(),
        });
        console.log(`  ✓ ${handle} image ${i + 1}`);
      }

      productEntries.push({
        handle,
        title: product.title,
        source_url: `${STORE_BASE}/products/${handle}.js`,
        image_count: localImages.length,
        local_images: localImages,
      });
    } catch (err) {
      console.warn(`  ✗ ${handle}: ${err.message}`);
      productEntries.push({ handle, error: err.message });
    }
  }

  const out = {
    generated_at: new Date().toISOString(),
    purpose: "Prototype asset sync only — not authorized for production publication without owner review",
    store_base: STORE_BASE,
    products: productEntries,
    assets: assetEntries,
  };

  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(out, null, 2));
  console.log(`\nManifest written: ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
