'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product, ProductVariant } from '@/data/products';
import { FREE_SHIPPING_THRESHOLD_CENTS } from '@/lib/catalog';

const STORAGE_KEY = 'copa-cart-v1';

export interface CartLine {
  lineId: string;
  productId: string;
  productHandle: string;
  variantId: string;
  title: string;
  variantLabel: string;
  priceCents: number;
  quantity: number;
  imageSrc?: string;
}

interface PersistedCart {
  lines: CartLine[];
  giftOption: boolean;
}

export interface AddToCartInput {
  product: Product;
  variant: ProductVariant;
  quantity?: number;
}

interface CartContextValue {
  lines: CartLine[];
  giftOption: boolean;
  subtotalCents: number;
  itemCount: number;
  freeShippingThresholdCents: number;
  amountUntilFreeShippingCents: number;
  qualifiesForFreeShipping: boolean;
  addItem: (input: AddToCartInput) => void;
  removeItem: (lineId: string) => void;
  updateQty: (lineId: string, quantity: number) => void;
  clear: () => void;
  setGiftOption: (enabled: boolean) => void;
  toggleGiftOption: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function buildLineId(productId: string, variantId: string): string {
  return `${productId}:${variantId}`;
}

function buildVariantLabel(variant: ProductVariant): string {
  const parts = [variant.finish, variant.size, variant.title].filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : 'Default';
}

function readStoredCart(): PersistedCart {
  if (typeof window === 'undefined') {
    return { lines: [], giftOption: false };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [], giftOption: false };
    const parsed = JSON.parse(raw) as PersistedCart;
    if (!Array.isArray(parsed.lines)) return { lines: [], giftOption: false };
    return {
      lines: parsed.lines.filter(
        (line) =>
          line &&
          typeof line.lineId === 'string' &&
          typeof line.quantity === 'number' &&
          line.quantity > 0,
      ),
      giftOption: Boolean(parsed.giftOption),
    };
  } catch {
    return { lines: [], giftOption: false };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [giftOption, setGiftOptionState] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredCart();
    setLines(stored.lines);
    setGiftOptionState(stored.giftOption);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: PersistedCart = { lines, giftOption };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [lines, giftOption, hydrated]);

  const addItem = useCallback(({ product, variant, quantity = 1 }: AddToCartInput) => {
    const lineId = buildLineId(product.id, variant.id);
    const variantLabel = buildVariantLabel(variant);

    setLines((prev) => {
      const existing = prev.find((line) => line.lineId === lineId);
      if (existing) {
        return prev.map((line) =>
          line.lineId === lineId
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );
      }

      return [
        ...prev,
        {
          lineId,
          productId: product.id,
          productHandle: product.handle,
          variantId: variant.id,
          title: product.title,
          variantLabel,
          priceCents: variant.priceCents,
          quantity,
          imageSrc: product.images[0],
        },
      ];
    });
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((line) => line.lineId !== lineId));
  }, []);

  const updateQty = useCallback((lineId: string, quantity: number) => {
    if (quantity < 1) {
      setLines((prev) => prev.filter((line) => line.lineId !== lineId));
      return;
    }
    setLines((prev) =>
      prev.map((line) => (line.lineId === lineId ? { ...line, quantity } : line)),
    );
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    setGiftOptionState(false);
  }, []);

  const setGiftOption = useCallback((enabled: boolean) => {
    setGiftOptionState(enabled);
  }, []);

  const toggleGiftOption = useCallback(() => {
    setGiftOptionState((prev) => !prev);
  }, []);

  const subtotalCents = useMemo(
    () => lines.reduce((sum, line) => sum + line.priceCents * line.quantity, 0),
    [lines],
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

  const amountUntilFreeShippingCents = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents);
  const qualifiesForFreeShipping = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      giftOption,
      subtotalCents,
      itemCount,
      freeShippingThresholdCents: FREE_SHIPPING_THRESHOLD_CENTS,
      amountUntilFreeShippingCents,
      qualifiesForFreeShipping,
      addItem,
      removeItem,
      updateQty,
      clear,
      setGiftOption,
      toggleGiftOption,
    }),
    [
      lines,
      giftOption,
      subtotalCents,
      itemCount,
      amountUntilFreeShippingCents,
      qualifiesForFreeShipping,
      addItem,
      removeItem,
      updateQty,
      clear,
      setGiftOption,
      toggleGiftOption,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
