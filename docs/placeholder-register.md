# Placeholder Register

Mirrors `src/data/placeholders.ts`. Customer-facing pitch view may render natural example copy with visible "Prototype placeholder" indicator.

## Status labels

- `[PLACEHOLDER]`
- `[OWNER INPUT REQUIRED]`
- `[SUPPLIER DATA REQUIRED]`
- `[LEGAL REVIEW REQUIRED]`

## Register

| ID | Route | Component | Example copy | Required input | Risk | Replacement |
|----|-------|-----------|--------------|----------------|------|-------------|
| PH-001 | `/warranty` | WarrantyPolicyBody | Warranty term requires owner approval | Gate G5 | critical | pending |
| PH-002 | `/shipping-and-returns` | ReturnsPolicyBody | Single canonical policy pending | Gate G3 | critical | pending |
| PH-003 | `/founders` | FounderBio | Placeholder biography | Gate G7 | medium | pending |
| PH-004 | `/contact` | SupportContactBlock | support@copajewelry.com (placeholder) | Gate G6 | high | pending |
| PH-005 | `/live-shows` | ShowSchedule | Wed/Fri times TBC | Gate G9 | medium | pending |
| PH-006 | `/products/[handle]` | ProductSpecifications | Plating thickness: TBC | Gate G8 | high | pending |
| PH-007 | `/privacy` | PrivacyPolicyBody | Legal review required | Gate G13 | critical | pending |
| PH-008 | `/cart` | GiftOption | Gift wrap price/contents TBC | Owner approval | medium | pending |

## Owner-review mode

When `.owner-review-mode` is active on `<body>`, elements with `[data-placeholder="true"]` receive dashed warning outline per `globals.css`.

## Audit rule

`npm run audit:content` exits **1** if any placeholder has `incorrectly_verified: true` or unresolved item is emitted as verified in structured data / feed export.

## Adding placeholders

1. Assign next `PH-###` ID.
2. Add to `src/data/placeholders.ts`.
3. Mirror row in this document.
4. Mark component with `data-placeholder="true"` when UI exists.
