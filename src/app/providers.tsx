"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart-context";
import { OwnerReviewProvider } from "@/lib/owner-review-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <OwnerReviewProvider>
      <CartProvider>{children}</CartProvider>
    </OwnerReviewProvider>
  );
}
