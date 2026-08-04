import { describe, it, expect } from "vitest";
import {
  createEmptyCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  getSubtotalCents,
  getItemCount,
  getFreeShippingProgress,
  DEMO_FREE_SHIPPING_THRESHOLD_CENTS,
} from "@/lib/cart";

const sampleLine = {
  id: "line-1",
  productHandle: "imperial-necklace",
  variantId: "var-gold",
  title: "Imperial Necklace",
  variantTitle: "Gold",
  priceCents: 4500,
};

describe("cart", () => {
  it("starts empty", () => {
    const cart = createEmptyCart();
    expect(cart.lines).toHaveLength(0);
    expect(getSubtotalCents(cart)).toBe(0);
    expect(getItemCount(cart)).toBe(0);
  });

  it("adds items and merges duplicate variants", () => {
    let cart = createEmptyCart();
    cart = addToCart(cart, sampleLine);
    cart = addToCart(cart, { ...sampleLine, quantity: 2 });
    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0].quantity).toBe(3);
  });

  it("updates quantity and removes at zero", () => {
    let cart = addToCart(createEmptyCart(), sampleLine);
    cart = updateQuantity(cart, "var-gold", 5);
    expect(cart.lines[0].quantity).toBe(5);
    cart = updateQuantity(cart, "var-gold", 0);
    expect(cart.lines).toHaveLength(0);
  });

  it("removes by variant id", () => {
    let cart = addToCart(createEmptyCart(), sampleLine);
    cart = addToCart(cart, {
      ...sampleLine,
      id: "line-2",
      variantId: "var-silver",
      variantTitle: "Silver",
    });
    cart = removeFromCart(cart, "var-gold");
    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0].variantId).toBe("var-silver");
  });

  it("calculates subtotal", () => {
    let cart = addToCart(createEmptyCart(), sampleLine);
    cart = addToCart(cart, {
      ...sampleLine,
      id: "line-2",
      variantId: "var-silver",
      priceCents: 3200,
      quantity: 2,
    });
    expect(getSubtotalCents(cart)).toBe(4500 + 6400);
  });

  it("tracks free shipping progress", () => {
    const progress = getFreeShippingProgress(6000, DEMO_FREE_SHIPPING_THRESHOLD_CENTS);
    expect(progress.remainingCents).toBe(2000);
    expect(progress.percent).toBe(75);
    expect(progress.qualified).toBe(false);
    const qualified = getFreeShippingProgress(8000, DEMO_FREE_SHIPPING_THRESHOLD_CENTS);
    expect(qualified.qualified).toBe(true);
  });
});
