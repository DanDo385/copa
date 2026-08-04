import { describe, it, expect } from "vitest";
import { auditContentGates, canRenderClaimPublicly } from "@/lib/claims-gate";

describe("claims gate", () => {
  it("reports no error-severity false-verification violations", () => {
    const result = auditContentGates();
    expect(result.passed).toBe(true);
    expect(result.violations.filter((violation) => violation.severity === "error")).toHaveLength(0);
  });

  it("blocks DO NOT PUBLISH claims from public render", () => {
    expect(canRenderClaimPublicly("lifetime-warranty")).toBe(false);
    expect(canRenderClaimPublicly("hypoallergenic-blanket")).toBe(false);
  });

  it("allows VERIFIED and OWNER APPROVED claims", () => {
    expect(canRenderClaimPublicly("whatnot-followers-17-4k")).toBe(true);
    expect(canRenderClaimPublicly("free-shipping-80-threshold")).toBe(true);
  });

  it("treats unknown claim IDs as blocked", () => {
    expect(canRenderClaimPublicly("unknown-claim")).toBe(false);
  });
});
