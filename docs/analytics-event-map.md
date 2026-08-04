# Analytics Event Map

Implementation: `src/lib/events.ts` — **prototype mode only** (`console.debug`, no production destination).

Set `NEXT_PUBLIC_ANALYTICS_MODE=production` to disable stubs (production hook intentionally unimplemented).

## Events

### view_item_list

| Field | Value |
|-------|-------|
| **Trigger** | Collection/search grid visible (IntersectionObserver or route mount) |
| **Params** | `list_id`, `items[]` (handles) |
| **Consent** | analytics |
| **Destination** | GA4 `view_item_list` (future) |
| **Dedupe** | Once per list_id per session |
| **QA** | Debug log on collection page load; verify item IDs match DOM |

### select_item

| Trigger | Product card click |
| Params | `item_id`, `list_id?` |
| Consent | analytics |
| Destination | GA4 `select_item` |
| Dedupe | None |
| QA | Click card → debug log before navigation |

### view_item

| Trigger | PDP mount |
| Params | `item_id`, `value`, `currency` (USD) |
| Consent | analytics |
| Destination | GA4 `view_item` |
| Dedupe | Once per item_id per session (unless variant change) |
| QA | PDP load → log includes price |

### add_to_cart

| Trigger | Successful add (drawer or PDP) |
| Params | `item_id`, `quantity`, `value` |
| Consent | analytics |
| Destination | GA4 `add_to_cart` |
| Dedupe | Per interaction |
| QA | Unit test + E2E add flow |

### remove_from_cart

| Trigger | Remove line or qty → 0 |
| Params | `item_id`, `quantity` |
| Consent | analytics |
| Destination | GA4 `remove_from_cart` |
| Dedupe | Per interaction |
| QA | Cart remove → debug log |

### view_cart

| Trigger | Cart drawer open or `/cart` view |
| Params | `value`, `item_count` |
| Consent | analytics |
| Destination | GA4 `view_cart` |
| Dedupe | Once per open per session |
| QA | Open drawer → log |

### begin_checkout

| Trigger | Prototype checkout button (blocked — no real order) |
| Params | `value`, `item_count` |
| Consent | analytics |
| Destination | GA4 `begin_checkout` |
| Dedupe | Once per session |
| QA | Click checkout → log; confirm no transaction |

### search

| Trigger | Search submit |
| Params | `search_term`, `results_count` |
| Consent | analytics |
| Destination | GA4 `search` |
| Dedupe | Per query submit |
| QA | Search "snake" → log count |

### filter_use

| Trigger | Filter toggle apply |
| Params | `filter_type`, `filter_value` |
| Consent | analytics |
| Destination | GA4 custom event |
| Dedupe | Per filter application |
| QA | Apply finish filter → log |

### size_guide_open

| Trigger | Size guide link/modal open |
| Params | `product_type` (ring, bracelet, necklace) |
| Consent | analytics |
| Destination | GA4 custom event |
| Dedupe | Once per open |
| QA | PDP → size guide → log |

### review_interaction

| Trigger | Review expand, sort, helpful vote |
| Params | `action`, `item_id?` |
| Consent | analytics |
| Destination | GA4 custom / Judge.me |
| Dedupe | Per action |
| QA | Manual on staging with Judge.me |

### complete_the_look_click

| Trigger | Curated recommendation click |
| Params | `source_item_id`, `target_item_id` |
| Consent | personalization |
| Destination | GA4 custom |
| Dedupe | Per click |
| QA | PDP recommendation click → log |

### email_signup

| Trigger | Newsletter submit success (post-consent) |
| Params | `source`, `preferences[]?` |
| Consent | marketing |
| Destination | ESP + GA4 |
| Dedupe | Server-side by email |
| QA | Form validation only in prototype |

### sms_signup

| Trigger | SMS consent opt-in success |
| Params | `source` |
| Consent | marketing |
| Destination | SMS platform |
| Dedupe | Server-side by phone |
| QA | Prototype — no send |

### show_reminder_signup

| Trigger | Live show reminder form success |
| Params | `channel` (email \| sms \| both) |
| Consent | marketing |
| Destination | ESP/SMS |
| Dedupe | Per show + contact |
| QA | E2E validation without submit |

### whatnot_outbound_click

| Trigger | Whatnot CTA click |
| Params | `placement` (hero, live-shows, proof) |
| Consent | analytics |
| Destination | GA4 outbound |
| Dedupe | Per click |
| QA | Click CTA → log placement |

### custom_inquiry_start

| Trigger | Custom/bespoke form focus or start |
| Params | `source` |
| Consent | analytics |
| Destination | GA4 |
| Dedupe | Once per session |
| QA | `/custom` form focus → log |

### warranty_or_policy_view

| Trigger | Policy page view |
| Params | `policy_type` |
| Consent | essential |
| Destination | GA4 page_view or custom |
| Dedupe | Standard page view |
| QA | Navigate to warranty → log |

## purchase (production only)

| Trigger | Shopify checkout completed |
| Params | transaction_id, value, currency, items |
| Consent | analytics (after consent) |
| Destination | GA4 purchase + Ads conversion |
| Dedupe | transaction_id |
| QA | **Requires real test order on authorized staging** — not run in prototype |

## Consent categories

| Category | Events |
|----------|--------|
| essential | warranty_or_policy_view |
| analytics | view_*, search, filter, whatnot_outbound |
| marketing | email_signup, sms_signup, show_reminder |
| personalization | complete_the_look_click |

## Prototype QA status

All events: **PENDING** real browser verification until UI routes implemented and dev server run.
