#!/usr/bin/env node
/**
 * Broken link check for prototype routes.
 * HTTP check against BASE_URL (default http://localhost:3000).
 * Exits 1 on any non-2xx/3xx response.
 *
 * Usage: BASE_URL=http://127.0.0.1:3000 node scripts/check-links.mjs
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE_URL = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

async function loadRoutes() {
  const { register } = await import("tsx/esm/api");
  register();
  const mod = await import(path.join(ROOT, "src/data/routes.ts"));
  return mod.prototypeRoutes;
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    return { url, status: res.status, ok: res.status >= 200 && res.status < 400 };
  } catch (err) {
    return { url, status: 0, ok: false, error: err.message };
  }
}

async function main() {
  const routes = await loadRoutes();
  console.log(`Link check — ${routes.length} routes @ ${BASE_URL}\n`);

  const failures = [];
  for (const route of routes) {
    const url = `${BASE_URL}${route.path}`;
    const result = await checkUrl(url);
    const icon = result.ok ? "✓" : "✗";
    console.log(`  ${icon} ${result.status || "ERR"} ${route.path} (${route.name})`);
    if (!result.ok) failures.push({ ...route, ...result });
  }

  if (failures.length) {
    console.log(`\n❌ ${failures.length} broken route(s). Is the dev server running?`);
    console.log("   Start with: npm run dev");
    process.exit(1);
  }

  console.log("\n✓ All routes responded OK.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
