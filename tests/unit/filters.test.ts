import { describe, it, expect } from "vitest";
import {
  applyFilters,
  sortProducts,
  getActiveFilterCount,
  toggleFilterValue,
  defaultFilterState,
  type ProductFilterRecord,
} from "@/lib/filters";

const catalog: ProductFilterRecord[] = [
  {
    handle: "a",
    title: "A",
    category: "earrings",
    finish: "gold",
    material: "steel",
    stone: "none",
    size: "one-size",
    style: "statement",
    priceCents: 5000,
    available: true,
    createdAt: "2026-01-01",
    featuredRank: 2,
    bestSellerRank: 1,
  },
  {
    handle: "b",
    title: "B",
    category: "rings",
    finish: "silver",
    material: "brass",
    stone: "cz",
    size: "7",
    style: "everyday",
    priceCents: 3000,
    available: false,
    createdAt: "2026-06-01",
    featuredRank: 1,
    bestSellerRank: 2,
  },
];

describe("filters", () => {
  it("filters by category and availability", () => {
    const filters = { ...defaultFilterState(), categories: ["earrings"], availableOnly: true };
    const result = applyFilters(catalog, filters);
    expect(result).toHaveLength(1);
    expect(result[0].handle).toBe("a");
  });

  it("filters by price range", () => {
    const filters = { ...defaultFilterState(), priceMinCents: 4000, priceMaxCents: 6000 };
    expect(applyFilters(catalog, filters)).toHaveLength(1);
  });

  it("sorts by price and featured", () => {
    const byPrice = sortProducts(catalog, "price-asc");
    expect(byPrice[0].handle).toBe("b");
    const featured = sortProducts(catalog, "featured");
    expect(featured[0].handle).toBe("b");
  });

  it("counts active filters", () => {
    const filters = {
      ...defaultFilterState(),
      categories: ["earrings"],
      finishes: ["gold"],
      availableOnly: true,
    };
    expect(getActiveFilterCount(filters)).toBe(3);
  });

  it("toggles filter values", () => {
    expect(toggleFilterValue(["gold"], "silver")).toEqual(["gold", "silver"]);
    expect(toggleFilterValue(["gold", "silver"], "gold")).toEqual(["silver"]);
  });
});
