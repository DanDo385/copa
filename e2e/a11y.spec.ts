import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { name: "homepage", path: "/" },
  { name: "collection", path: "/collections/all" },
  { name: "pdp", path: "/products/imperial-necklace" },
  { name: "cart", path: "/cart" },
];

for (const { name, path } of pages) {
  test(`@a11y ${name} has no critical violations`, async ({ page }, testInfo) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();

    testInfo.annotations.push({
      type: "axe",
      description: `${results.violations.length} violations on ${path}`,
    });

    expect(results.violations.filter((v) => v.impact === "critical")).toEqual([]);
  });
}
