# Design Tokens — COPA Jewelry Prototype

Source of truth: `src/styles/tokens.css` and `src/styles/globals.css`.

## Design rationale

Brazilian modern editorial: warm Rio light, sunlit stone, sea teal, and gold accents. Avoids purple, black-gold nightclub, carnival clichés, and beige luxury minimalism (`#F4F1EA`).

## Color

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#f6f0e6` | Page background |
| `--color-bg-elevated` | `#fbf7f0` | Cards, inputs |
| `--color-bg-sunken` | `#ebe4d8` | Placeholder badges, inset areas |
| `--color-ink` | `#2c2924` | Primary text |
| `--color-ink-muted` | `#6e6760` | Secondary text |
| `--color-ink-subtle` | `#9a928a` | Tertiary text |
| `--color-accent` | `#c9952a` | Gold accent |
| `--color-accent-deep` | `#9a7020` | Accent hover/emphasis |
| `--color-accent-soft` | `#e8c878` | Soft gold fills |
| `--color-sea` | `#1f6363` | Primary CTA, focus ring |
| `--color-sea-soft` | `#3d8a8a` | CTA hover |
| `--color-coral-soft` | `#e4a090` | Warm accent |
| `--color-coral-muted` | `#d48878` | Coral secondary |
| `--color-border` | `#ddd4c6` | Default borders |
| `--color-border-strong` | `#c4b8a8` | Emphasized borders |
| `--color-success` | `#2d6a4e` | Success states |
| `--color-warning` | `#b8860b` | Owner-review outlines |
| `--color-error` | `#b83c3c` | Errors, invalid fields |
| `--color-focus-ring` | `#1f6363` | `:focus-visible` |
| `--color-overlay` | `rgba(44,41,36,0.48)` | Modals, drawers |

## Typography

| Token | Value |
|-------|-------|
| `--font-display` | Fraunces, Georgia, serif |
| `--font-body` | Source Sans 3, Helvetica Neue, sans-serif |
| `--font-mono` | ui-monospace stack |
| `--text-xs` … `--text-5xl` | 0.75rem – 3rem scale |
| `--leading-tight` … `--leading-relaxed` | 1.2 – 1.65 |
| `--weight-regular` … `--weight-bold` | 400 – 700 |

Headings use `--font-display`; body uses `--font-body`. Open-source fonts unless licensed brand fonts are supplied (Gate G1).

## Spacing

4px base scale: `--space-0` through `--space-24` (0 – 6rem).

## Radii

`--radius-sm` (0.25rem) through `--radius-full` (pill).

## Shadows

Warm, soft shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-drawer`.

## Motion

| Token | Default | Reduced motion |
|-------|---------|----------------|
| `--duration-fast` | 120ms | 0ms |
| `--duration-normal` | 220ms | 0ms |
| `--duration-slow` | 360ms | 0ms |
| `--ease-out` | cubic-bezier(0.22, 1, 0.36, 1) | — |
| `--ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) | — |

`prefers-reduced-motion: reduce` zeroes durations and limits animations.

## Layout

| Token | Value |
|-------|-------|
| `--container-sm` … `--container-2xl` | 640px – 1440px |
| `--header-height` | 4rem |
| `--announcement-height` | 2.5rem |
| `--touch-target` | 2.75rem (44px) |

## Breakpoints (reference)

| Token | px |
|-------|-----|
| `--bp-sm` | 640 |
| `--bp-md` | 768 |
| `--bp-lg` | 1024 |
| `--bp-xl` | 1280 |

Use in CSS `@media (min-width: …)`; JS may read via `getComputedStyle` if needed.

## Utility classes (globals.css)

- `.container`, `.container--narrow`, `.container--wide`
- `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--accent`
- `.link`, `.link--nav`
- `.form-field`, `.form-input`, `.form-error`, `.form-checkbox`
- `.grid`, `.grid--2`, `.grid--3`, `.grid--4`
- `.placeholder-badge`, `.owner-review-mode`
- `.skip-link`, `.visually-hidden`

## Shopify migration note

Map tokens to theme `settings_schema.json` color and typography settings, or CSS custom properties in `assets/base.css` for OS 2.0.
