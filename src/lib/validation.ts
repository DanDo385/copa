export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[1-9]\d{7,14}$/;

export function validateEmail(value: string): ValidationResult {
  const trimmed = value.trim();
  if (!trimmed) return { valid: false, error: "Email is required" };
  if (!EMAIL_RE.test(trimmed)) return { valid: false, error: "Enter a valid email address" };
  return { valid: true };
}

export function validatePhone(value: string): ValidationResult {
  const normalized = value.replace(/[\s()-]/g, "");
  if (!normalized) return { valid: false, error: "Phone number is required" };
  if (!PHONE_RE.test(normalized)) return { valid: false, error: "Enter a valid phone number" };
  return { valid: true };
}

export function validateSmsConsent(emailConsent: boolean, smsConsent: boolean, phone: string): ValidationResult {
  if (smsConsent && !emailConsent) {
    // SMS can be independent — but phone required
  }
  if (smsConsent) {
    const phoneResult = validatePhone(phone);
    if (!phoneResult.valid) return phoneResult;
  }
  if (!smsConsent && !emailConsent) {
    return { valid: false, error: "Select at least one reminder method" };
  }
  return { valid: true };
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  privacyAcknowledged: boolean;
}

export function validateContactForm(input: ContactFormInput): ValidationResult {
  if (!input.name.trim()) return { valid: false, error: "Name is required" };
  const emailResult = validateEmail(input.email);
  if (!emailResult.valid) return emailResult;
  if (!input.subject.trim()) return { valid: false, error: "Subject is required" };
  if (input.message.trim().length < 10) return { valid: false, error: "Message must be at least 10 characters" };
  if (!input.privacyAcknowledged) return { valid: false, error: "Acknowledge the privacy notice to continue" };
  return { valid: true };
}

export interface ReminderFormInput {
  email: string;
  phone: string;
  emailConsent: boolean;
  smsConsent: boolean;
}

export function validateReminderForm(input: ReminderFormInput): ValidationResult {
  if (input.emailConsent) {
    const emailResult = validateEmail(input.email);
    if (!emailResult.valid) return emailResult;
  }
  return validateSmsConsent(input.emailConsent, input.smsConsent, input.phone);
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value.trim()) return { valid: false, error: `${fieldName} is required` };
  return { valid: true };
}
