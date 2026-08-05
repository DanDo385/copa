export interface RecommendationContext {
  productHandle: string;
  category?: string;
  finish?: string;
}

export interface CuratedRelation {
  sourceHandle: string;
  relatedHandles: string[];
  label: "complete-the-look" | "same-finish" | "styled-by-copa";
}

/** Owner-curated only — not behavioral order data */
export const curatedRelations: CuratedRelation[] = [
  {
    sourceHandle: "imperial-necklace",
    relatedHandles: ["fleur-earrings", "tiara-ring"],
    label: "complete-the-look",
  },
  {
    sourceHandle: "tiara-ring",
    relatedHandles: ["imperial-necklace", "diamond-dust-ring"],
    label: "complete-the-look",
  },
  {
    sourceHandle: "fleur-earrings",
    relatedHandles: ["imperial-necklace", "intaglio-bracelet"],
    label: "styled-by-copa",
  },
  {
    sourceHandle: "diamond-dust-ring",
    relatedHandles: ["diamond-dust-hoops", "tiara-ring"],
    label: "same-finish",
  },
  {
    sourceHandle: "intaglio-bracelet",
    relatedHandles: ["fleur-earrings"],
    label: "complete-the-look",
  },
];

export function getRecommendations(
  handle: string,
  catalogHandles: string[],
  max = 4,
): { handle: string; label: CuratedRelation["label"] }[] {
  const relation = curatedRelations.find((r) => r.sourceHandle === handle);
  if (!relation) return [];
  return relation.relatedHandles
    .filter((h) => catalogHandles.includes(h))
    .slice(0, max)
    .map((h) => ({ handle: h, label: relation.label }));
}

export function getCartAddOns(cartHandles: string[], catalogHandles: string[], max = 3): string[] {
  const suggestions = new Set<string>();
  for (const handle of cartHandles) {
    for (const rec of getRecommendations(handle, catalogHandles)) {
      if (!cartHandles.includes(rec.handle)) suggestions.add(rec.handle);
    }
  }
  return [...suggestions].slice(0, max);
}

export const RECOMMENDATION_LABELS: Record<CuratedRelation["label"], string> = {
  "complete-the-look": "Complete the look",
  "same-finish": "Same finish",
  "styled-by-copa": "Styled by CopaJewelry",
};
