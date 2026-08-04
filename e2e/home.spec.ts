import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("homepage @a11y", () => {
  test("has no automatically detectable accessibility violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("homepage navigation", () => {
  test("loads and shows brand", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "COPA Jewelry" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("skip link targets main content", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Skip to content" }).focus();
    await expect(page.locator("#main-content")).toBeVisible();
  });
});
