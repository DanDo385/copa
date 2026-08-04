import { describe, it, expect } from "vitest";
import {
  validateEmail,
  validatePhone,
  validateContactForm,
  validateReminderForm,
  validateSmsConsent,
} from "@/lib/validation";

describe("forms validation", () => {
  it("validates email", () => {
    expect(validateEmail("").valid).toBe(false);
    expect(validateEmail("bad").valid).toBe(false);
    expect(validateEmail("user@copajewelry.com").valid).toBe(true);
  });

  it("validates phone for SMS", () => {
    expect(validatePhone("").valid).toBe(false);
    expect(validatePhone("5551234567").valid).toBe(true);
    expect(validatePhone("+15551234567").valid).toBe(true);
  });

  it("requires consent channel for reminders", () => {
    expect(
      validateSmsConsent(false, false, "").valid,
    ).toBe(false);
    expect(
      validateReminderForm({
        email: "user@example.com",
        phone: "",
        emailConsent: true,
        smsConsent: false,
      }).valid,
    ).toBe(true);
  });

  it("validates contact form", () => {
    expect(
      validateContactForm({
        name: "Test",
        email: "user@example.com",
        subject: "Order",
        message: "Short",
        privacyAcknowledged: true,
      }).valid,
    ).toBe(false);
    expect(
      validateContactForm({
        name: "Test User",
        email: "user@example.com",
        subject: "Order question",
        message: "I have a question about sizing for the tiara ring.",
        privacyAcknowledged: true,
      }).valid,
    ).toBe(true);
  });
});
