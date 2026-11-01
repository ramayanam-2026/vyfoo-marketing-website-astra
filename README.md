# Vyfoo Marketing Website

The public marketing website for **Vyfoo**, a hybrid cloud-and-offline restaurant
operating system, built by VYQDA Technologies. This repository is the marketing
site only — it does not contain the Vyfoo product application, staff dashboard,
or backend.

## Stack

- **Astro 5** (static output) — chosen over Astro 7 to match this environment's
  Node version; upgrade is straightforward once Node ≥22.23.4 is available.
- TypeScript (strict)
- Astro-native components + hand-written CSS design system (no Tailwind, no
  large UI library) — see `src/styles/tokens.css`
- `@astrojs/sitemap` for XML sitemap generation
- Astro Content Collections for the blog (`src/content/blog`)
- Minimal client-side JavaScript: a handful of small, framework-free `<script>`
  blocks for tabs, the FAQ accordion (native `<details>`), the mobile nav
  drawer, the leakage calculator, and the lead form. No React is installed;
  none of the current interactive pieces needed it. Add `@astrojs/react` only
  if a future interactive feature genuinely requires it.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run check     # Astro + TypeScript diagnostics
```

Node: `^18.17.1 || ^20.3.0 || >=22.0.0` (see `package.json#engines`).

## Project structure

```
src/
  components/
    navigation/   SiteHeader (mega menu + mobile drawer)
    layout/       SiteFooter (dual-conversion cards + full nav)
    marketing/    ProductPreviewTabs, FaqAccordion, LeakageCalculator
    conversion/   EnterpriseLeadForm
  layouts/        BaseLayout, MarketingLayout, ArticleLayout
  pages/          File-based routes — see "Routes" below
  content/blog/   Markdown blog posts (Content Collections)
  data/           navigation.ts, products.ts, solutions.ts, pricing.ts,
                  faqs.ts, comparisons.ts — the single source of truth for
                  copy that's reused across pages
  lib/            urls.ts (centralized CTA destinations), seo.ts (metadata +
                  JSON-LD helpers), forms.ts (lead-form integration contract)
  styles/         tokens.css (design tokens), global.css (base styles)
```

### Routes implemented

- `/`, `/about`, `/contact`, `/contact/demo`, `/contact/enterprise`,
  `/contact/sales` (redirects to `/contact/enterprise`)
- `/features`, `/features/[9 product slugs]`
- `/solutions`, `/solutions/[11 vertical slugs]`, plus
  `/solutions/uae`, `/solutions/saudi-arabia`, `/solutions/india-restaurant-pos`
- `/pricing`, `/pricing/india`
- `/restaurant-operating-system`, `/what-is-a-kitchen-display-system`,
  `/restaurant-pos-guide`
- `/stop-restaurant-cash-leakage` (with the interactive calculator),
  `/restaurant-staff-theft-prevention`, `/restaurant-inventory-variance`,
  `/multi-outlet-reporting`
- `/compare`, `/compare/[9 competitor slugs]`
- `/blog`, `/blog/[slug]` (2 starter articles)
- `/security`, `/hardware-compatibility`, `/integrations`, `/deployment`,
  `/case-studies` (placeholder — no fabricated case studies)
- `/privacy`, `/terms`, `/cookies`
- `/404` (returns a real 404 route; confirm your host serves it with HTTP 404 —
  see "Deployment notes" below)

## Centralized CTA configuration (`src/lib/urls.ts`)

The product application, trial signup, login, and sandbox all live **outside**
this repository and were not verified during this build. Every CTA imports
its destination from `src/lib/urls.ts` rather than hardcoding a URL:

| Variable | Used for | Fallback until configured |
|---|---|---|
| `PUBLIC_VYFOO_SIGNUP_URL` | "Start Free Trial" | `/pricing#start-trial` |
| `PUBLIC_VYFOO_LOGIN_URL` | Existing customer login | `/contact` |
| `PUBLIC_VYFOO_SANDBOX_URL` | Product sandbox | `/pricing#start-trial` |
| `PUBLIC_VYFOO_APP_URL` | Base app URL (reserved) | — |

"Book Enterprise Demo" and "Talk to Enterprise Sales" always point at the
on-site forms (`/contact/demo`, `/contact/enterprise`), since those are
real, working pages in this repo.

## Enterprise lead form (`src/components/conversion/EnterpriseLeadForm.astro`)

No CRM or lead-management endpoint is connected. Submitting the form:

- **If `PUBLIC_VYFOO_LEADS_ENDPOINT` is set** — POSTs the lead as JSON to that
  endpoint and shows a success/error state based on the response.
- **If it isn't set** — the form clearly tells the visitor it isn't connected
  yet and gives them `contact@vyfoo.com` to email directly. It never claims
  success, and it never silently discards the submission.

Wire up a real endpoint (serverless function, CRM webhook, etc.) and set
`PUBLIC_VYFOO_LEADS_ENDPOINT` to turn this into a live integration. Do not
put secrets in a `PUBLIC_` variable — if the endpoint needs auth, put the
secret server-side (e.g. in the function itself) and keep the public value
limited to the endpoint URL.

## Content and claims

Per the build directive, this site avoids:

- Invented certifications (SOC 2, PCI DSS, GDPR) for Vyfoo as a whole
- Invented native integrations — `/integrations` distinguishes what's
  available today (export) from what requires scoping
- Fabricated customer counts, testimonials, logos, or case studies —
  `/case-studies` is an honest placeholder
- Absolute "zero downtime" / "100% offline" claims — the offline architecture
  copy is deliberately scoped and points to configuration-dependent caveats
- Fabricated competitor pricing or missing-feature claims on `/compare/*`
  pages — each page marks vendor-specific facts as "confirm directly"
  rather than asserting them

**Still needs verification before launch:** every claim flagged with
"where supported," "where configured," or a `caveat-note` in the UI reflects
an actual product capability that should be confirmed against the real
Vyfoo product before this copy is treated as final. The author/attribution
on blog posts ("Vyfoo Team") and the legal pages (`/privacy`, `/terms`,
`/cookies`) are placeholder structures, not counsel-reviewed text.

## Deployment notes

- Static output (`output: "static"` is Astro's default) — deploy `dist/` to
  any static host (Vercel, Netlify, Cloudflare Pages, S3+CDN, etc.).
- **Confirm your host returns an actual HTTP 404** for unknown paths using
  `dist/404.html`, rather than silently serving `index.html` with a 200 —
  this varies by hosting platform's configuration.
- `astro.config.mjs` sets `site: "https://vyfoo.com"` — update this if the
  production domain differs, since it feeds canonical URLs, the sitemap, and
  structured data.
- No analytics are loaded by default (`src/lib` has no analytics adapter yet).
  Add one deliberately and respect applicable consent requirements before
  loading any third-party script.

## What was NOT built in this pass

- Full competitor-specific pricing/feature research for `/compare/*` pages
  (each page is structured correctly but marks vendor facts as
  "confirm directly" — see `src/data/comparisons.ts`)
- Additional blog articles beyond the two starter posts
- A production OG share image (`/images/og-default.png` is referenced in
  `src/lib/seo.ts` but not yet created — add a real 1200×630 image there)
- Real brand logo/wordmark asset (currently a text wordmark by design, per
  the build directive, pending official brand assets)
