# QA Report

**Project:** COPA Jewelry Prototype
**Report date:** 2026-08-03
**Environment:** Local macOS 13.7.8, Node 22.22.0, Chrome executable fallback
**Verification status:** PARTIAL — static/unit/content gates pass; browser QA has documented failures

## Verification commands

Run from repository root after `npm install`:

```bash
# Install
npm install

# Static analysis
npm run typecheck
npm run lint

# Unit tests
npm run test

# Production build
npm run build

# Content audit (claims + placeholders)
npm run audit:content

# Link check (requires running server)
npm run dev   # terminal 1
npm run audit:links   # terminal 2, BASE_URL=http://localhost:3000

# E2E (build + start server automatically)
npm run test:e2e

# Accessibility subset
npm run test:a11y

# Full verify script
npm run verify
```

## Results

| Check | Command | Result | Notes |
|-------|---------|--------|-------|
| Install | `npm install` | PASS | 416 packages audited; npm reported 8 upstream dependency vulnerabilities (3 moderate, 4 high, 1 critical). No automatic dependency rewrite applied. |
| Typecheck | `npm run typecheck` | PASS | Strict TypeScript check passed. |
| Lint | `npm run lint` | PASS WITH WARNING | Next.js warns that custom Google font `<link>` tags are discouraged. |
| Unit tests | `npm run test` | PASS | 7 suites, 30 tests. |
| Production build | `npm run build` | PASS | 35 pages statically generated. |
| Content audit | `npm run audit:content` | PASS | 21 claims, 6 unresolved claims documented, 20 placeholders, zero critical placeholders marked ready. |
| E2E shopper flow | `npm run test:e2e` | PARTIAL | 8/13 passed using local Chrome. Failures: homepage a11y contrast/landmark/link defects; shop navigation expectation mismatch; ambiguous zero-result locator; unavailable contact and reminder form flows. |
| E2E a11y | `npm run test:a11y` | BLOCKED BY E2E FAILURES | Local Chrome can run the suite; do not claim WCAG pass until contrast and landmark failures are fixed. |
| Playwright managed Chromium | `npx playwright install chromium` | BLOCKED | Playwright reports Chromium unsupported on macOS 13. Local Google Chrome fallback is configured through `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. |
| Responsive visual | Manual | PENDING | Review at 375, 428, 768, and 1280 after browser failures are fixed. |
| Performance | Lighthouse/local | PENDING | See performance-report.md. |

## Unit test coverage (planned)

| Suite | File | Behaviors |
|-------|------|-----------|
| Cart | `tests/unit/cart.test.ts` | add, remove, qty, subtotal, shipping progress |
| Filters | `tests/unit/filters.test.ts` | category, price, sort, toggle |
| Recommendations | `tests/unit/recommendations.test.ts` | curated relations, cart add-ons |
| Forms | `tests/unit/forms.test.ts` | email, phone, contact, reminder |
| Claims gate | `tests/unit/claims-gate.test.ts` | publishability, audit violations |
| Variants | `tests/unit/variants.test.ts` | selection, purchasability, one-of-one |

## E2E scenarios

| Spec | Flow |
|------|------|
| `e2e/shopper-flow.spec.ts` | homepage → collection → filter → PDP → size guide → cart → search zero → forms validation |
| `e2e/a11y.spec.ts` | axe on /, collection, PDP, cart |
| `e2e/keyboard.spec.ts` | Tab through purchase path |

## Defects found

None recorded — verification not yet executed.

## Sign-off criteria (from spec)

- [ ] All commands pass with real output captured
- [ ] No unresolved claim presented as verified
- [ ] Primary shopper path passes E2E
- [ ] Zero critical axe violations
- [ ] Owner-review placeholders visible

## Report history

| Run | Date | Executor | Outcome |
|-----|------|----------|---------|
| Initial template | 2026-08-03 | Documentation | PENDING |

**Do not interpret PENDING as PASS.**
