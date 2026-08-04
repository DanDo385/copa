# Lifecycle Flows

Documented email/SMS lifecycle flows for future Shopify Email, Flow, or ESP integration.

**Prototype:** consent capture UI only — **no sending**, no customer contact, no marketplace data import.

## Consent principles

- Email and SMS consent **separate** — never prechecked
- Record: source, timestamp, disclosure version, preferences
- Whatnot buyer data is **not** owned marketing consent
- Channel-specific opt-in required for COPA-owned surfaces

## Flow catalog

| Flow | Trigger | Channel | Consent | Prototype status |
|------|---------|---------|---------|------------------|
| Welcome | First email signup + optional first-order offer | Email | marketing | Form UI only |
| Browse abandonment | Collection/PDP view, no cart (24–48h) | Email | marketing | Documented only |
| Cart abandonment | Cart non-empty, no checkout (1–24h) | Email/SMS | marketing | Documented only |
| Post-purchase care | Order fulfilled | Email | transactional + optional marketing | Documented only |
| Review request | Delivered + delay (Judge.me) | Email | transactional | Judge.me config later |
| Second purchase | 30–60d post first order | Email | marketing | Documented only |
| Back in stock | Notify signup on OOS variant | Email/SMS | marketing | Form UI only |
| Limited-edition waitlist | LE page signup | Email/SMS | marketing | Form UI only |
| VIP / first look | Segment: repeat buyers | Email/SMS | marketing | Documented only |
| Win-back | 90–120d inactive | Email | marketing | Documented only |
| Show reminder | Live show reminder signup | Email/SMS | marketing | Validate-only form |

## Flow details (implementation spec)

### Welcome

- **Trigger:** `email_signup` with welcome preference
- **Delay:** Immediate
- **Content:** Brand intro, founders, shop CTA — no unverified claims
- **Gate:** G2 (first-order offer), G13 (consent copy)
- **Shopify:** Customer created → Flow → Email template

### Browse abandonment

- **Trigger:** Viewed 2+ products, no `add_to_cart` in session; identified customer
- **Delay:** 24h
- **Content:** Recently viewed products (curated fallback)
- **Gate:** Consent + personalization policy
- **Dedupe:** Max 1 per 7 days

### Cart abandonment

- **Trigger:** `add_to_cart`, no `begin_checkout` within 1h
- **Delay:** 1h, reminder at 24h
- **Content:** Cart lines, shipping threshold progress
- **Gate:** G4 threshold approved
- **SMS:** Separate opt-in only

### Post-purchase care

- **Trigger:** Order fulfilled
- **Delay:** 3 days after delivery estimate
- **Content:** Care instructions linked to material metafields
- **Channel:** Transactional — no promo without consent

### Review request

- **Trigger:** Judge.me post-delivery timing
- **Delay:** Per Judge.me settings (audit on staging)
- **Content:** Product-specific; incentive disclosed if any
- **Gate:** G11 review permissions

### Back in stock

- **Trigger:** Variant `available` after OOS + notify list
- **Delay:** Immediate on inventory update
- **Content:** Single variant CTA
- **Dedupe:** One send per signup per restock event

### Show reminder

- **Trigger:** `show_reminder_signup` + schedule metaobject
- **Delay:** T-24h and T-1h before show
- **Content:** Show time (timezone), Whatnot link
- **Gate:** G9 schedule approved
- **Prototype:** `validateReminderForm()` only — no submit endpoint

## Data captured (prototype forms)

| Form | Fields | Stored in prototype |
|------|--------|---------------------|
| Email capture | email, preferences[], consent | No — validation only |
| SMS signup | phone, consent | No |
| Show reminder | email, phone, channel consents | No |
| Contact | name, email, subject, message | No |
| Custom inquiry | project type, budget range, message | No |

## Future Shopify Flow outline

```
Customer tagged "email-marketing"
  → Segment: engaged browsers
  → Flow: browse abandonment (24h)
  → Check: still subscribed + not purchased
  → Send: Shopify Email template
```

## Compliance checklist (pre-activate)

- [ ] G13 privacy and consent approved
- [ ] Unsubscribe in every marketing message
- [ ] SMS STOP handling
- [ ] No Whatnot list import
- [ ] Review incentive disclosure (if used)
- [ ] Owner sign-off on each active flow

## Related docs

- `docs/analytics-event-map.md` — signup events
- `docs/owner-decision-register.md` — G2, G9, G13
- `src/lib/validation.ts` — form validators
