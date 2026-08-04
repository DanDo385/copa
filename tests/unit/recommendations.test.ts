import { describe, it, expect } from "vitest";
import {
  getRecommendations,
  getCartAddOns,
  RECOMMENDATION_LABELS,
  curatedRelations,
} from "@/lib/recommendations";

const catalog = [
  "imperial-necklace",
  "tiara-ring",
  "fleur-earrings",
  "diamond-dust-ring",
  "diamond-dust-hoops",
  "intaglio-bracelet",
];

describe("recommendations", () => {
  it("returns owner-curated relations only", () => {
    const recs = getRecommendations("imperial-necklace", catalog);
    expect(recs.length).toBeGreaterThan(0);
    expect(recs.every((r) => catalog.includes(r.handle))).toBe(true);
    expect(recs[0].label).toBe("complete-the-look");
  });

  it("does not use behavioral language labels", () => {
    for (const label of Object.values(RECOMMENDATION_LABELS)) {
      expect(label.toLowerCase()).not.toContain("customers also bought");
    }
  });

  it("suggests cart add-ons excluding items already in cart", () => {
    const addOns = getCartAddOns(["imperial-necklace"], catalog, 3);
    expect(addOns).not.toContain("imperial-necklace");
    expect(addOns.length).toBeLessThanOrEqual(3);
  });

  it("has curated relations for representative PDPs", () => {
    const handles = curatedRelations.map((r) => r.sourceHandle);
    expect(handles).toContain("imperial-necklace");
    expect(handles).toContain("tiara-ring");
  });
});
