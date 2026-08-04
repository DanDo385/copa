/**
 * Client-side analytics event stubs — prototype mode only.
 * Events console.debug in development; no production analytics connection.
 * See docs/analytics-event-map.md for full specification.
 */

export type ConsentCategory = "essential" | "analytics" | "marketing" | "personalization";

export interface AnalyticsEventPayload {
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface AnalyticsEvent {
  name: string;
  params: AnalyticsEventPayload;
  consentCategory: ConsentCategory;
}

const PROTOTYPE_MODE = process.env.NEXT_PUBLIC_ANALYTICS_MODE !== "production";

function debugEvent(event: AnalyticsEvent): void {
  if (typeof console !== "undefined" && console.debug) {
    console.debug("[COPA analytics stub]", event.name, event.params, {
      consent: event.consentCategory,
      prototype: PROTOTYPE_MODE,
    });
  }
}

export function trackEvent(
  name: string,
  params: AnalyticsEventPayload = {},
  consentCategory: ConsentCategory = "analytics",
): void {
  if (!PROTOTYPE_MODE) {
    // Production hook point — intentionally unimplemented in prototype
    return;
  }
  debugEvent({ name, params, consentCategory });
}

export const events = {
  viewItemList: (params: { list_id: string; items: string[] }) =>
    trackEvent("view_item_list", params, "analytics"),

  selectItem: (params: { item_id: string; list_id?: string }) =>
    trackEvent("select_item", params, "analytics"),

  viewItem: (params: { item_id: string; value?: number; currency?: string }) =>
    trackEvent("view_item", { currency: "USD", ...params }, "analytics"),

  addToCart: (params: { item_id: string; quantity: number; value?: number }) =>
    trackEvent("add_to_cart", params, "analytics"),

  removeFromCart: (params: { item_id: string; quantity: number }) =>
    trackEvent("remove_from_cart", params, "analytics"),

  viewCart: (params: { value: number; item_count: number }) =>
    trackEvent("view_cart", params, "analytics"),

  beginCheckout: (params: { value: number; item_count: number }) =>
    trackEvent("begin_checkout", params, "analytics"),

  search: (params: { search_term: string; results_count: number }) =>
    trackEvent("search", params, "analytics"),

  filterUse: (params: { filter_type: string; filter_value: string }) =>
    trackEvent("filter_use", params, "analytics"),

  sizeGuideOpen: (params: { product_type: string }) =>
    trackEvent("size_guide_open", params, "analytics"),

  reviewInteraction: (params: { action: string; item_id?: string }) =>
    trackEvent("review_interaction", params, "analytics"),

  completeTheLookClick: (params: { source_item_id: string; target_item_id: string }) =>
    trackEvent("complete_the_look_click", params, "personalization"),

  emailSignup: (params: { source: string; preferences?: string[] }) =>
    trackEvent("email_signup", params, "marketing"),

  smsSignup: (params: { source: string }) => trackEvent("sms_signup", params, "marketing"),

  showReminderSignup: (params: { channel: "email" | "sms" | "both" }) =>
    trackEvent("show_reminder_signup", params, "marketing"),

  whatnotOutboundClick: (params: { placement: string }) =>
    trackEvent("whatnot_outbound_click", params, "analytics"),

  customInquiryStart: (params: { source: string }) =>
    trackEvent("custom_inquiry_start", params, "analytics"),

  warrantyOrPolicyView: (params: { policy_type: string }) =>
    trackEvent("warranty_or_policy_view", params, "essential"),
};

export type EventsApi = typeof events;
