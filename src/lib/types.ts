/**
 * COPA Jewelry prototype domain types.
 * Structured for Shopify Online Store 2.0 migration (metafields, metaobjects).
 */

/** Claim approval lifecycle for public-facing content */
export type ClaimApprovalStatus =
  | "VERIFIED"
  | "OWNER APPROVED"
  | "SUPPLIER EVIDENCE REQUIRED"
  | "LEGAL REVIEW REQUIRED"
  | "DO NOT PUBLISH";

/** Registered marketing or product claim with evidence trail */
export interface Claim {
  claim_id: string;
  proposed_public_wording: string;
  applicable_products_or_variants: string[];
  evidence_source: string;
  evidence_owner: string;
  approval_status: ClaimApprovalStatus;
  usage_boundary: string;
  warranty_or_remedy_implication: string | null;
  allowed_surfaces: string[];
  last_verified_date: string | null;
}

/** Owner decision gate status */
export type DecisionStatus =
  | "OPEN"
  | "ASSUMPTION"
  | "OWNER APPROVED"
  | "BLOCKED";

/** Visible owner decision register entry */
export interface Decision {
  decision_id: string;
  topic: string;
  question: string;
  status: DecisionStatus;
  assumption_for_prototype: string | null;
  owner_response: string | null;
  blocks_production: boolean;
  blocks_ads: boolean;
  related_routes: string[];
  last_updated: string;
}

/** Placeholder content risk and replacement tracking */
export type PlaceholderRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type PlaceholderLabel =
  | "PLACEHOLDER"
  | "OWNER INPUT REQUIRED"
  | "SUPPLIER DATA REQUIRED"
  | "LEGAL REVIEW REQUIRED";

/** Placeholder register entry */
export interface Placeholder {
  placeholder_id: string;
  route: string;
  component: string;
  label: PlaceholderLabel;
  displayed_example: string;
  required_input: string;
  risk_level: PlaceholderRiskLevel;
  production_replacement_status: "PENDING" | "IN REVIEW" | "APPROVED" | "REPLACED";
}

/** Media asset provenance for reused COPA imagery */
export type MediaRightsStatus =
  | "FIRST_PARTY"
  | "EDITORIAL_PENDING"
  | "THIRD_PARTY_RESTRICTED"
  | "REPLACEMENT_REQUIRED";

export interface MediaAsset {
  asset_id: string;
  source_url: string;
  source_page: string;
  subject_or_product_id: string | null;
  proposed_placements: string[];
  crop_treatment: string | null;
  width: number | null;
  height: number | null;
  alt_text: string;
  rights_status: MediaRightsStatus;
  quality_status: "GOOD" | "ACCEPTABLE" | "POOR" | "UNSUITABLE";
  production_replacement_required: boolean;
  local_path: string | null;
}

/** Channel role for variant-level inventory control */
export type ChannelRole =
  | "shopify_primary"
  | "whatnot_show"
  | "whatnot_exclusive"
  | "website_exclusive"
  | "auction_only"
  | "custom_bespoke"
  | "discontinued";

/** Inventory availability state */
export type InventoryState =
  | "available"
  | "reserved_shopify"
  | "reserved_whatnot_show"
  | "sold_reconciliation_pending"
  | "unavailable"
  | "repair"
  | "return_hold"
  | "sample"
  | "gift"
  | "damaged";

/** Inventory class for merchandising rules */
export type InventoryClass =
  | "evergreen"
  | "limited_multi_unit"
  | "one_of_one"
  | "clearance"
  | "preorder"
  | "sold_out";

/** Product variant with channel and material metadata */
export interface Variant {
  id: string;
  sku: string;
  title: string;
  price: number;
  compare_at_price: number | null;
  currency: string;
  available: boolean;
  inventory_state: InventoryState;
  inventory_class: InventoryClass;
  channel_role: ChannelRole;
  option_values: Record<string, string>;
  image_id: string | null;
  base_metal: string;
  plating_method: string | null;
  plating_thickness: string | null;
  stone_type: string | null;
  stone_treatment: string | null;
  dimensions: string | null;
  weight: string | null;
  closure: string | null;
  country_of_origin: string | null;
  care_instructions: string | null;
  claim_status: ClaimApprovalStatus;
}

/** Product with Shopify-ready structure */
export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  product_type: string;
  vendor: string;
  tags: string[];
  variants: Variant[];
  images: MediaAsset[];
  collections: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
  styling_note: string | null;
  complete_the_look: string[];
  review_preview_placeholder: boolean;
  placeholder_fields: string[];
}

/** Collection for shop navigation and filters */
export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  product_handles: string[];
  image: MediaAsset | null;
  sort_options: CollectionSortOption[];
  filter_groups: CollectionFilterGroup[];
  seo_title: string | null;
  seo_description: string | null;
  placeholder: boolean;
}

export type CollectionSortOption =
  | "featured"
  | "best_selling"
  | "newest"
  | "price_asc"
  | "price_desc";

export interface CollectionFilterGroup {
  id: string;
  label: string;
  type: "checkbox" | "range" | "select";
  options: { value: string; label: string }[];
}

/** Cart line item for prototype checkout simulation */
export interface CartItem {
  line_id: string;
  product_id: string;
  variant_id: string;
  handle: string;
  title: string;
  variant_title: string;
  sku: string;
  price: number;
  quantity: number;
  image: MediaAsset | null;
  inventory_state: InventoryState;
  gift_wrap: boolean;
  gift_note: string | null;
}

/** Prototype cart state */
export interface Cart {
  items: CartItem[];
  gift_option_enabled: boolean;
  free_shipping_threshold: number | null;
  free_shipping_threshold_is_demo: boolean;
  currency: string;
}

/** Search result shape */
export interface SearchResult {
  query: string;
  products: Product[];
  collections: Collection[];
  total_count: number;
}

/** Analytics event names (spec only — not wired in prototype) */
export type AnalyticsEventName =
  | "view_item_list"
  | "select_item"
  | "view_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "search"
  | "filter_use"
  | "size_guide_open"
  | "review_interaction"
  | "complete_the_look_click"
  | "email_signup"
  | "sms_signup"
  | "show_reminder_signup"
  | "whatnot_outbound_click"
  | "custom_inquiry_start"
  | "warranty_or_policy_view";
