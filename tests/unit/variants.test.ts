import { describe, it, expect } from "vitest";
import {
  selectVariant,
  getAvailableVariants,
  isPurchasable,
  resolveVariantFromOptions,
  assertSingleChannelOneOfOne,
  type ProductVariant,
} from "@/lib/variants";

const variants: ProductVariant[] = [
  {
    id: "v1",
    sku: "IMP-GOLD",
    productHandle: "imperial-necklace",
    title: "Gold",
    option1: "Gold",
    priceCents: 4500,
    available: true,
    inventoryClass: "evergreen",
    availabilityState: "available",
    channelRole: "both",
  },
  {
    id: "v2",
    sku: "IMP-SILVER",
    productHandle: "imperial-necklace",
    title: "Silver",
    option1: "Silver",
    priceCents: 4200,
    available: false,
    inventoryClass: "evergreen",
    availabilityState: "unavailable",
    channelRole: "both",
  },
  {
    id: "v3",
    sku: "OOO-1",
    productHandle: "one-of-one-ring",
    title: "Size 7",
    option1: "Gold",
    option2: "7",
    priceCents: 12000,
    available: true,
    inventoryClass: "one-of-one",
    availabilityState: "reserved-whatnot",
    channelRole: "whatnot-only",
  },
];

describe("variants", () => {
  it("selects variant by id", () => {
    expect(selectVariant(variants, "v1")?.sku).toBe("IMP-GOLD");
  });

  it("lists available variants only", () => {
    expect(getAvailableVariants(variants)).toHaveLength(1);
  });

  it("determines purchasability by channel and state", () => {
    expect(isPurchasable(variants[0])).toBe(true);
    expect(isPurchasable(variants[1])).toBe(false);
    expect(isPurchasable(variants[2])).toBe(false);
  });

  it("resolves variant from finish/size options", () => {
    expect(resolveVariantFromOptions(variants, { finish: "Gold" })?.id).toBe("v1");
  });

  it("enforces one-of-one single channel rule", () => {
    expect(assertSingleChannelOneOfOne(variants[2])).toBe(true);
    const bad: ProductVariant = {
      ...variants[2],
      channelRole: "both",
      availabilityState: "available",
    };
    expect(assertSingleChannelOneOfOne(bad)).toBe(false);
  });
});
