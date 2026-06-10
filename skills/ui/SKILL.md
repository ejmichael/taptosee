---
name: saas-ui-design
description: >
  Use this skill when building any SaaS product UI — landing pages, dashboards,
  auth flows, profile pages, or component libraries. It supplements frontend-design
  with product-specific patterns: spacing systems, component anatomy, interaction
  states, dark-mode craft, and the specific anti-patterns that make AI-built UIs
  look like AI-built UIs. Trigger whenever the project is a web app, SaaS product,
  or multi-page frontend (not just a single visual or poster).
---

# SaaS UI Design — Professional Standard

You are designing as a senior product designer at a studio that ships Stripe-quality,
Linear-quality, Vercel-quality interfaces. That means: every spacing decision is
intentional, every component has all its states, hierarchy is communicated through
contrast and weight rather than decoration, and the whole product feels like one
designer's hand — not an assembly of parts from different templates.

Read `/mnt/skills/public/frontend-design/SKILL.md` first. Everything in that skill
applies. This skill adds SaaS- and product-specific depth on top of it.

---

## 1. The baseline bar

A professional SaaS UI clears these before anything else is considered "done":

- **Spacing is systematic.** Every margin, padding, and gap comes from a 4px base grid.
  Common values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96. Arbitrary values like
  `padding: 13px` or `margin-top: 22px` are red flags that spacing was eyeballed.
- **Type scale is locked.** Pick 5–6 sizes (e.g. 12, 14, 16, 18, 24, 32, 48px) and
  use only those. Never use `font-size: 15px` or `font-size: 17px`.
- **Color roles are defined, not improvised.** Every color in the UI has a role name:
  `background`, `surface`, `border`, `text-primary`, `text-muted`, `accent`,
  `accent-hover`, `destructive`. Use roles, not raw hex values, in components.
  When you assign hex values, assign them once (CSS variables or Tailwind config)
  and reference the variable everywhere.
- **Interactive elements have all states:** default, hover, focus (visible ring),
  active/pressed, disabled, loading. A component missing any of these is unfinished.
- **Hierarchy is solved with contrast, weight, and size — not borders.**
  If you're reaching for a border to separate two things, first try whitespace.
  If you're reaching for a card to group things, first ask if proximity alone works.

---

## 2. Specific AI design anti-patterns — avoid every single one

These are the signals that mark a UI as AI-generated. Eliminate them deliberately:

**Layout & spacing**
- Section padding that's the same on every section (monotony). Real pages breathe
  differently — a tight feature grid, then a generous hero, then a compact footer.
- Centred everything. Professional UIs are mostly left-aligned text with intentional
  exceptions for specific moments (a hero headline, a pricing card CTA).
- Cards with identical height forced via `min-height` when content varies. Let content
  breathe; handle visual alignment with grid/flex alignment, not fixed heights.
- Outer container `max-width` not matching the grid. Pick one max-width for the page
  (e.g. 1200px), one for content columns (e.g. 720px prose), and stick to them.

**Color**
- Gradient abuse: gradients on backgrounds, gradients on cards, gradients on buttons,
  gradient text, gradient borders — all at once. Pick one place for the gradient and
  let it be the signature. Everything else is flat or subtly transparent.
- Purple + pink as the only identity. This is the #1 AI SaaS color cliché in 2024–25.
  If the brief calls for it, earn it with specificity: a very particular shade, an
  unusual secondary, a monochromatic discipline that makes the pink feel chosen.
- Using `opacity: 0.1` backgrounds for every card variant. Use actual color values.
- White text on a mid-range colored background (low contrast). Always check contrast
  ratios. Aim for 4.5:1 minimum on body text, 3:1 minimum on large/bold text.

**Typography**
- `font-weight: 600` on everything. Real hierarchy uses 400 (body), 500 (label/nav),
  600 (subheading), 700+ (heading only). Semibold everywhere flattens hierarchy.
- Hero headlines set in a Google Font that's on every other SaaS site (Inter for body
  is fine; Inter for the hero display is lazy). Use Inter for UI chrome, reach for
  something with more personality for display: Instrument Serif, Fraunces, Syne,
  Cabinet Grotesk, Satoshi, Bricolage Grotesque.
- Line height too tight on large display text (looks compressed) or too loose on body
  (looks like a rough draft). Display: `line-height: 1.1–1.2`. Body: `1.5–1.6`.
  UI labels/buttons: `1.2–1.3`.
- Letter-spacing on body text. Only add `letter-spacing` to uppercase labels or
  small caps. Never add it to paragraph or heading text — it reads as AI filler.

**Components**
- Buttons that are the same size everywhere. Use size variants: sm (dashboard
  actions, table rows), md (default forms), lg (hero CTAs only).
- Icon + label misalignment. Icons should be optically centred with their label,
  not just flex-aligned. Sometimes optical centre requires nudging 1–2px.
- Placeholder text as the only affordance. Always pair placeholder with a visible
  label above the input. Labels disappear on focus; they should not be the only
  indicator of what a field contains.
- Toast notifications in a random corner. Pick one position and use it universally
  (bottom-center on mobile, bottom-right on desktop).
- Modal backdrops at full black. Use `rgba(0,0,0,0.6)` with a `backdrop-blur(4px)`.

**Interaction & motion**
- `transition: all 0.3s ease` on everything. Be specific: `transition: background-color
  150ms ease, box-shadow 150ms ease`. Avoid `all` — it catches unintended properties.
- Entrance animations on every element. Animate the page, not each atom. A section
  fades up; the cards inside it don't each need their own staggered delay.
- Hover states that only change color. Add a subtle `transform: translateY(-1px)` or
  a shadow shift on interactive cards. Color + transform together feels intentional.

---

## 3. Component quality standard

Every component ships with:

```
□ Default state
□ Hover state (color shift + subtle transform)
□ Focus state (visible ring, 2px, accent color, 2px offset)
□ Active/pressed state (scale down slightly: transform: scale(0.98))
□ Disabled state (opacity-50, cursor-not-allowed, no hover effects)
□ Loading state (spinner or skeleton, not just "disabled")
□ Error state (for inputs: red border + error message below)
□ Empty state (for lists/tables: illustration or icon + CTA copy)
```

---

## 4. Dark mode craft

Most SaaS apps use dark mode as default or offer it. A quality dark mode is not
`background: #000` and `color: #fff`. It's a layered system:

```
Layer 0 (page background):   #0a0a0f  — near-black, slight blue undertone
Layer 1 (cards, panels):      #111118  — one step up
Layer 2 (inputs, code blocks): #1a1a24  — two steps up
Layer 3 (hover surfaces):      #22222f  — interactive highlight
Border:                        #2a2a3a  — subtle, not white
Text primary:                  #f0f0f5  — not pure white (too harsh)
Text secondary:                #8888a0  — muted, slight cool tone
Text disabled:                 #44445a
Accent:                        one vivid color, used sparingly
```

Rules:
- Shadows don't read on dark backgrounds. Use glow instead: `box-shadow: 0 0 0 1px
  rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.4)`.
- Never use pure `#000000` for backgrounds or `#ffffff` for text in dark mode.
- Images and illustrations need a dark-mode-aware treatment: either use SVGs with
  `currentColor` strokes, or apply a subtle `brightness(0.9)` filter on photos.

---

## 5. Dashboard layout patterns

Dashboards have specific layout rules that differ from landing pages:

**Sidebar**
- Width: 240–260px fixed (desktop). Collapsible to 64px icon-only on smaller screens.
- Background: one step darker than the page (`Layer 0` sidebar, `Layer 1` content area).
- Nav items: icon (20px) + label, 40–44px tall, 8px corner radius, full-width.
- Active item: accent-tinted background (`accent at 10% opacity`) + accent text.
- Hover: Layer 3 background, no transition delay.
- Group labels: 10–11px, uppercase, tracked, text-disabled color.

**Content area**
- Max content width: 900–1100px (not full browser width — exhausting to read).
- Page header: title (24px, 700) + optional subtitle (14px, muted) + primary action
  button, all on one row, 32–40px bottom margin before content.
- Section spacing inside a page: 32px between groups, 16px between items in a group.

**Tables and lists**
- Row height: 48–52px for data tables, 56–64px for richer list items.
- Striped rows are a cliché — use row hover highlight instead.
- Column headers: 11–12px uppercase, tracked, text-muted. Separate from data rows
  with a single 1px border, not a filled header background.
- Actions column: right-aligned, appear on row hover (opacity-0 → opacity-100).

**Stat cards**
- 3–4 across on desktop, 2 on tablet, 1 on mobile.
- Contents: label (12px muted uppercase), value (28–32px bold), optional delta badge.
- No gradients on stat cards. Flat surface, one number, one label.

---

## 6. Landing page structure for SaaS

A professional SaaS landing page follows a narrative arc, not a list of features:

```
1. Navbar          — Logo + nav + CTA. Sticky. Blur on scroll. 64–72px tall.
2. Hero            — The one-sentence promise. Big type. One primary CTA.
                     Social proof (logos or user count) below the fold break.
3. Problem/Hook    — What it's like before the product. 2–3 sentences max.
4. Product Demo    — Screenshot, video, or live interactive embed. Center stage.
5. Features        — 3–6 features. Each has a name, one sentence, and an icon or
                     small visual. Not a wall of bullets.
6. Social Proof    — Testimonials or logos. Real specificity > generic praise.
7. Pricing         — 2–3 tiers. Most popular highlighted. Annual/monthly toggle.
8. Final CTA       — Repeat the hero CTA. Short. Confident.
9. Footer          — Logo + links + legal. Not a sitemap. Clean and minimal.
```

Section transitions: don't use a different background color for every section —
alternate between `Layer 0` and `Layer 1` at most, or use whitespace alone to
separate sections.

---

## 7. Public profile page patterns (Linktree-style)

Profile pages are a unique design constraint: one column, mobile-first, minimal chrome.

- Max width: 480–520px, centered. Never full-width on desktop.
- Profile picture: 80–96px circle, subtle ring (`box-shadow: 0 0 0 3px accent`).
- Display name: 20–22px, 600 weight.
- Bio: 14px, text-muted, `max-width: 320px`, centered, `line-height: 1.6`.
- Social icons: 20–24px icon buttons, gap-3, centered row, below bio.
- Links: full-width buttons, 48–56px tall, 10–12px corner radius (or full pill).
  Icon left (optional), label centered, arrow or external icon right (optional).
  `margin-bottom: 10–12px` between links.
- Link states: subtle scale on hover (`scale(1.01)`), clear pressed state.
- Page background: set by template — but always test legibility of text on it.
- "Made with [Brand]" badge: bottom, 12px, muted, link to marketing site.

Template differentiation: each template should change at least 3 of these 5 axes
to feel genuinely distinct: (1) color palette, (2) typography, (3) button shape,
(4) background treatment, (5) layout density/spacing.

---

## 8. Auth page patterns

- Center card on full-height background. Card: 400–440px wide, 32–40px padding.
- Brand logo above the card, or inside at the top.
- Input label above (never placeholder-only). Inputs: 40–44px tall.
- Primary button: full-width, 44px tall, inside the card.
- "Or continue with" divider: actual `<hr>` with label, not just text.
- Error messages: below the field, 12px, destructive color, with an icon.
- Never show a generic "Something went wrong." Name the actual error.
- Multi-step forms: progress bar or step dots at top. Back button always present.
  Don't lose form state when going back between steps.

---

## 9. Pre-build checklist

Before writing a single line of component code, confirm:

```
□ Color roles defined as CSS variables (--color-bg, --color-surface, etc.)
□ Type scale locked (list the 5–6 sizes you will use)
□ Spacing scale locked (list the values from the 4px grid you will use)
□ All font imports ready (Google Fonts or local)
□ Component list enumerated (know what you're building before you start)
□ One signature design element identified and planned
□ All AI anti-patterns from Section 2 reviewed and avoided
```

---

## 10. Reference quality bar

When in doubt, ask: would this pass a design review at Vercel, Linear, or Stripe?

Those products share these properties:
- You can remove any element and the page still makes sense — nothing is decorative filler.
- Spacing is generous but not wasteful — everything has room to breathe.
- The personality comes from typography and one bold color choice, not gradients and icons.
- Every interactive state is handled. Nothing feels broken or half-finished.
- It works at every viewport from 375px to 1920px without obvious breakage.

If a section feels "a bit generic," it is generic. Fix it before moving on.