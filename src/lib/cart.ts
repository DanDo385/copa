export interface CartLine {
  id: string;
  productHandle: string;
  variantId: string;
  title: string;
  variantTitle: string;
  priceCents: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  lines: CartLine[];
}

export function createEmptyCart(): CartState {
  return { lines: [] };
}

export function addToCart(
  cart: CartState,
  line: Omit<CartLine, "quantity"> & { quantity?: number },
): CartState {
  const qty = line.quantity ?? 1;
  const existing = cart.lines.find((l) => l.variantId === line.variantId);
  if (existing) {
    return {
      lines: cart.lines.map((l) =>
        l.variantId === line.variantId ? { ...l, quantity: l.quantity + qty } : l,
      ),
    };
  }
  return {
    lines: [...cart.lines, { ...line, quantity: qty }],
  };
}

export function removeFromCart(cart: CartState, variantId: string): CartState {
  return { lines: cart.lines.filter((l) => l.variantId !== variantId) };
}

export function updateQuantity(cart: CartState, variantId: string, quantity: number): CartState {
  if (quantity <= 0) return removeFromCart(cart, variantId);
  return {
    lines: cart.lines.map((l) => (l.variantId === variantId ? { ...l, quantity } : l)),
  };
}

export function getSubtotalCents(cart: CartState): number {
  return cart.lines.reduce((sum, l) => sum + l.priceCents * l.quantity, 0);
}

export function getItemCount(cart: CartState): number {
  return cart.lines.reduce((sum, l) => sum + l.quantity, 0);
}

export function getFreeShippingProgress(subtotalCents: number, thresholdCents: number): {
  subtotalCents: number;
  thresholdCents: number;
  remainingCents: number;
  percent: number;
  qualified: boolean;
} {
  const remainingCents = Math.max(0, thresholdCents - subtotalCents);
  const percent = Math.min(100, Math.round((subtotalCents / thresholdCents) * 100));
  return {
    subtotalCents,
    thresholdCents,
    remainingCents,
    percent,
    qualified: subtotalCents >= thresholdCents,
  };
}

export const DEMO_FREE_SHIPPING_THRESHOLD_CENTS = 8000;
