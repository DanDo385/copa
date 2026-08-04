export type InventoryClass =
  | "evergreen"
  | "limited-multi"
  | "one-of-one"
  | "auction-only"
  | "clearance"
  | "preorder"
  | "website-exclusive"
  | "marketplace-exclusive"
  | "discontinued";

export type AvailabilityState =
  | "available"
  | "reserved-shopify"
  | "reserved-whatnot"
  | "sold-pending-reconciliation"
  | "unavailable";

export interface ProductVariant {
  id: string;
  sku: string;
  productHandle: string;
  title: string;
  option1?: string;
  option2?: string;
  priceCents: number;
  available: boolean;
  inventoryClass: InventoryClass;
  availabilityState: AvailabilityState;
  channelRole: "both" | "shopify-only" | "whatnot-only";
}

export function selectVariant(variants: ProductVariant[], variantId: string): ProductVariant | undefined {
  return variants.find((v) => v.id === variantId);
}

export function getAvailableVariants(variants: ProductVariant[]): ProductVariant[] {
  return variants.filter((v) => v.available && v.availabilityState === "available");
}

export function isPurchasable(variant: ProductVariant): boolean {
  if (!variant.available) return false;
  if (variant.availabilityState !== "available") return false;
  if (variant.inventoryClass === "one-of-one" && variant.availabilityState !== "available") return false;
  if (variant.channelRole === "whatnot-only") return false;
  return true;
}

export function formatVariantLabel(variant: ProductVariant): string {
  const parts = [variant.option1, variant.option2].filter(Boolean);
  return parts.length ? parts.join(" / ") : variant.title;
}

export function resolveVariantFromOptions(
  variants: ProductVariant[],
  options: { finish?: string; size?: string },
): ProductVariant | undefined {
  return variants.find((v) => {
    const finishMatch = !options.finish || v.option1 === options.finish;
    const sizeMatch = !options.size || v.option2 === options.size;
    return finishMatch && sizeMatch;
  });
}

export function assertSingleChannelOneOfOne(variant: ProductVariant): boolean {
  if (variant.inventoryClass !== "one-of-one") return true;
  return variant.channelRole !== "both" || variant.availabilityState !== "available";
}
