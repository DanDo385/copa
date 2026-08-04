import { describe, expect, it } from "vitest";
import type { CartItem, ClaimApprovalStatus } from "@/lib/types";

describe("domain types", () => {
  it("accepts a valid cart item shape", () => {
    const item: CartItem = {
      line_id: "line_1",
      product_id: "prod_1",
      variant_id: "var_1",
      handle: "sample-ring",
      title: "Sample Ring",
      variant_title: "Gold / 7",
      sku: "SKU-001",
      price: 89,
      quantity: 1,
      image: null,
      inventory_state: "available",
      gift_wrap: false,
      gift_note: null,
    };

    expect(item.price).toBe(89);
    expect(item.inventory_state).toBe("available");
  });

  it("restricts claim approval statuses", () => {
    const status: ClaimApprovalStatus = "SUPPLIER EVIDENCE REQUIRED";
    expect(status).toBe("SUPPLIER EVIDENCE REQUIRED");
  });
});
