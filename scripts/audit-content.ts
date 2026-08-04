#!/usr/bin/env tsx
/**
 * Content audit — fails if unresolved claim/placeholder markers appear as verified.
 */

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const FORBIDDEN_PATTERNS = [
  /\b(always water-resistant|tarnish-free|hypoallergenic|nickel-free|lifetime guarantee)\b/i,
  /approval_status:\s*["']VERIFIED["']/,
];

const SCAN_ROOTS = ["src", "data"];
const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".json"]);

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
    } else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const files: string[] = [];

  for (const root of SCAN_ROOTS) {
    try {
      const rootStat = await stat(root);
      if (rootStat.isDirectory()) {
        files.push(...(await collectFiles(root)));
      }
    } catch {
      // directory may not exist yet
    }
  }

  const violations: string[] = [];

  for (const file of files) {
    const content = await readFile(file, "utf-8");
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(content)) {
        violations.push(`${file}: matched ${pattern}`);
      }
    }
  }

  if (violations.length > 0) {
    console.error("Content audit FAILED:");
    violations.forEach((v) => console.error(`  - ${v}`));
    process.exit(1);
  }

  console.log(`Content audit passed (${files.length} files scanned).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
