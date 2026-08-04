# Accessibility Report

**Target:** WCAG 2.2 Level AA
**Scope:** COPA Jewelry prototype
**Date:** 2026-08-03
**Overall status:** PENDING — automated and manual verification not yet run against complete UI

## Methodology

- Automated: `@axe-core/playwright` in `e2e/a11y.spec.ts` (`npm run test:a11y`)
- Manual keyboard: `e2e/keyboard.spec.ts` + checklist below
- Contrast: design tokens chosen for ≥4.5:1 body text on `--color-bg` (formal audit PENDING)

## Known gaps (anticipated)

| Area | Gap | Severity | Remediation |
|------|-----|----------|-------------|
| Routes | UI not fully implemented | — | Complete build then re-test |
| Judge.me widgets | Third-party iframe/a11y unknown | Medium | Audit on staging |
| Placeholder content | Some policy pages incomplete | Low | Not a11y blocker |
| Video clips | Live show clips not yet present | Low | Poster + user play |
| Cart gift error | Live store Liquid error (reference) | High on live | Fix in migration |

## WCAG 2.2 AA checklist

| Criterion | Requirement | Status |
|-----------|-------------|--------|
| 1.1.1 Non-text content | Alt text on images; decorative SVGs marked | UNVERIFIED |
| 1.3.1 Info and relationships | Landmarks, headings, lists | UNVERIFIED |
| 1.4.3 Contrast (minimum) | Text 4.5:1, large 3:1 | UNVERIFIED |
| 1.4.11 Non-text contrast | UI components 3:1 | UNVERIFIED |
| 2.1.1 Keyboard | All functionality keyboard operable | UNVERIFIED |
| 2.1.2 No keyboard trap | Modals/drawers escapable | UNVERIFIED |
| 2.4.1 Bypass blocks | Skip link present in CSS | UNVERIFIED |
| 2.4.3 Focus order | Logical tab order | UNVERIFIED |
| 2.4.7 Focus visible | `:focus-visible` in tokens | UNVERIFIED |
| 2.5.5 Target size | `--touch-target` 44px | UNVERIFIED |
| 3.2.2 On input | No unexpected context change | UNVERIFIED |
| 3.3.1 Error identification | Form errors linked | UNVERIFIED |
| 3.3.2 Labels or instructions | Form labels | UNVERIFIED |
| 4.1.2 Name, role, value | Custom controls | UNVERIFIED |

## Keyboard navigation checklist (primary purchase flow)

| Step | Control | Expected | Verified |
|------|---------|----------|----------|
| 1 | Skip link | First Tab focuses skip → main | ☐ |
| 2 | Header nav | Tab through Shop, Search, Cart | ☐ |
| 3 | Collection filters | Space/Enter toggle; Esc closes panel | ☐ |
| 4 | Product card | Enter navigates to PDP | ☐ |
| 5 | Variant buttons | Arrow keys or roving tabindex | ☐ |
| 6 | Add to cart | Enter activates; focus moves sensibly | ☐ |
| 7 | Cart drawer | Focus trap; Esc closes; return focus | ☐ |
| 8 | Quantity | Spinbutton keyboard adjust | ☐ |
| 9 | Remove | Announced cart update | ☐ |
| 10 | Checkout (prototype) | Disabled/blocked state clear | ☐ |

## Reduced motion

`tokens.css` sets `--duration-*: 0ms` under `prefers-reduced-motion: reduce`. UNVERIFIED in browser.

## Screen reader announcements

- Cart updates: live region on add/remove — PLANNED
- Stock state: not color-only — PLANNED
- Price changes on variant select — PLANNED

## Test commands

```bash
npm run test:a11y          # axe on homepage, collection, PDP, cart
npm run test:e2e -- e2e/keyboard.spec.ts
```

**Results:** PENDING — run after `npm run dev` / build and route implementation.

## Sign-off

| Role | Name | Date | Status |
|------|------|------|--------|
| Engineering | — | — | PENDING |
| Owner | — | — | PENDING |
