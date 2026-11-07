# Vyfoo Marketing Website

Public marketing site for **Vyfoo**, a hybrid cloud-and-offline restaurant operating
system by VYQDA Technologies. This repository is the marketing site only. It does not
contain the product application, staff dashboard, or backend.

## Stack

- **Astro 5** (static output), TypeScript (strict), no UI framework.
  Astro 5 is used because Astro 7 requires Node ≥ 22.23.4; upgrade once that is available.
- Hand-written CSS design system (`src/styles/`), no Tailwind.
- `@astrojs/sitemap`, Astro Content Collections (blog).
- Client JavaScript is limited to small bundled scripts (tabs, mobile menu / dropdowns,
  lead forms, calculator, kitchen-timer ticker, GA4 event tracking). No JS framework ships to the browser.
- Fonts: Plus Jakarta Sans (display), Inter (body), JetBrains Mono (technical labels),
  loaded from Google Fonts in `BaseLayout.astro`.

## Commands

```bash
npm install
npm run dev         # local dev server
npm run build       # runs check:css first, then the production build to dist/
npm run preview     # preview the production build
npm run check       # Astro + TypeScript diagnostics
npm run check:css   # fails if any var(--x) points at an undefined custom property
npm run check:env   # prints a notice (never fails) when the webhook / signup URL are unset
```

## Design system

Everything visual flows from two files:

- `src/styles/tokens.css`: colours, type, a **complete** spacing scale, radii, shadows,
  and the single button size.
- `src/styles/global.css`: base typography, sections, buttons, cards, forms chrome, the
  dark product-window primitives, and shared patterns.

Rules the system enforces:

- **Rhythm:** white → slate-50 → obsidian (`#090D16`). Dark sections are used for hybrid
  architecture, governance, closing CTA bars, and the footer.
- **Brand crimson `#E11D48`** is reserved for primary CTAs, active indicators, and key
  highlights. No large pastel/pink surfaces.
- **One button size** everywhere: 52px tall, 28px horizontal padding, 12px radius.
  Variants (`btn--primary`, `btn--ghost`, `btn--on-ink`, `btn--outline-on-ink`) change colour
  only. Below 640px every `.btn` is full-width. `.btn--lg` is intentionally a no-op.
- **Sans-serif only.** No serif faces anywhere.
- **Spacing tokens must exist.** An undefined `var(--space-N)` silently invalidates the
  whole CSS declaration (padding collapses to 0). `npm run check:css` runs automatically
  before every build and fails on any undefined variable without a fallback.

Reusable pieces: `ui/Icon` (single SVG icon set), `ui/BrandLogo`, `navigation/SiteHeader`,
`layout/SiteFooter`, `marketing/ProductPreviewTabs`, `WorkflowPipeline`,
`ArchitectureDiagram`, `HQDashboardPreview`, `FaqAccordion`, `LeakageCalculator`,
`conversion/EnterpriseLeadForm`, `conversion/ContactForm`.

## Configuration

Copy `.env.example` to `.env`. Nothing is required to build.

| Variable | Used for | Fallback until set |
|---|---|---|
| `PUBLIC_VYFOO_SIGNUP_URL` | "Start Free Trial" CTAs | `/pricing#start-trial` |
| `PUBLIC_VYFOO_LOGIN_URL` | Customer login | `/contact` |
| `PUBLIC_VYFOO_SANDBOX_URL` | Product sandbox | `/pricing#start-trial` |
| `PUBLIC_VYFOO_APP_URL` | Base app URL (reserved) | none |
| `PUBLIC_VYFOO_LEADS_ENDPOINT` | Webhook that receives all three lead forms | forms say they are not connected (mailto fallback) |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 ID override | `G-14XFNTXMSY` (see `src/lib/analytics.ts`) |

All CTA destinations are centralised in `src/lib/urls.ts`. `PUBLIC_` values are inlined
into the browser bundle, so never put secrets in them.

### Lead forms and the webhook

Three forms share one engine (`src/lib/forms.ts`): **Book Enterprise Demo** (`/contact/demo`),
**Talk to Enterprise Sales** (`/contact/enterprise`) and **General Contact** (`/contact`).
Each POSTs JSON to the webhook in `PUBLIC_VYFOO_LEADS_ENDPOINT`.

> **The webhook URL is deliberately not in this repository.** The repo is public, and a
> webhook URL works like a write key to your automation. Put it in a local `.env` and in your
> hosting provider's environment variables (it is read at build time, so **redeploy after
> setting it**). `npm run build` prints a notice when it is missing.

Payload (JSON, `Content-Type: application/json`):

```jsonc
{
  "formType": "contact" | "demo" | "enterprise",   // use this to route in your workflow
  "formName": "General Contact" | "Book Enterprise Demo" | "Talk to Enterprise Sales",
  "fullName": "...", "workEmail": "...", "company": "...",
  // contact:    "phone", "message"
  // demo/sales: "role", "country", "outletCount", "operatingModel", "currentSystem",
  //             "primaryChallenge", "implementationTimeline"
  "pageUrl": "https://vyfoo.com/contact/demo", "referrer": "...",
  "utm": { "utm_source": "...", "utm_medium": "..." },   // only when present in the URL
  "submittedAt": "2026-01-01T00:00:00.000Z", "site": "vyfoo.com"
}
```

The receiving webhook must **allow cross-origin POSTs from `https://vyfoo.com`** (n8n: Webhook
node → Options → Allowed Origins) and answer **2xx** on success. If CORS is missing, the form
shows its error state instead of success.

Behaviour guarantees: validation is per field with accessible errors; success is shown only for
a 2xx response; on any failure the visitor's input is kept and a mailto fallback is offered; with
no endpoint configured it says so plainly and sends nothing; a hidden honeypot drops bot
submissions without contacting the webhook; no form values are sent to Google Analytics.
The webhook URL is visible to anyone who views the page source (unavoidable for browser
posts), so consider rate limiting or a bot check on the receiving workflow if spam appears.

### Analytics (Google Analytics 4)

GA4 (`G-14XFNTXMSY`) loads on every page in **production builds only** (never under
`astro dev`); the bootstrap is in `src/layouts/BaseLayout.astro`. Preview and staging
deployments are production builds, so they will report to the same property unless you set
`PUBLIC_GA_MEASUREMENT_ID` for them or filter by hostname in GA.

- **Consent Mode v2:** analytics storage is *denied by default* for the EEA, UK and Switzerland
  (no analytics cookies there, cookieless signals only) and granted elsewhere; advertising
  storage, ad personalization and Google signals are off everywhere. There is **no consent
  banner**, so EEA/UK visitors stay in the denied state. Add one (and call
  `gtag("consent", "update", ...)`) if you want full measurement there.
- **Events** (`src/lib/analytics.ts`, delegated click tracking in `BaseLayout.astro`):
  `enterprise_demo_cta_clicked`, `contact_sales_clicked`, `trial_cta_clicked`,
  `pricing_plan_selected` (with `plan`), `comparison_page_viewed` (with `competitor`),
  `calculator_used` (once per page view), `enterprise_form_started` / `enterprise_form_submitted`,
  `contact_form_started` / `contact_form_submitted`, and GA's `generate_lead` on any successful
  form. Event parameters never contain personal data.
- `/privacy` and `/cookies` describe this behaviour; they remain placeholders pending legal review.

## Deployment notes

- Output is static (`dist/`). Any static host works.
- **404:** confirm the host serves `dist/404.html` with HTTP status **404** for unknown
  paths rather than returning the homepage with a 200.
- **`/contact/sales`** is a meta-refresh redirect stub to `/contact/enterprise`
  (`noindex`, excluded from the sitemap). Configure a real **301** at the host if possible.
- `site` in `astro.config.mjs` is `https://vyfoo.com`; it drives canonicals, the sitemap,
  and structured data.

## Claims that still need product-side verification

The copy avoids invented certifications, integrations, customers, and metrics. These
statements describe intended product behaviour and should be confirmed against the real
product before launch:

- "Hybrid Local-Network Offline Mode", the **Local node** in the architecture diagram,
  and `LOCAL NODE READY` in the preview chrome. The page already states that exact
  offline scope depends on hardware and network setup.
- Workflow tags such as `AUTO-DEDUCT` (recipe-level stock deduction) and `STATION ROUTED`.
- Governance capabilities (role-based permissions, audit trail, discount limits, cash
  reconciliation).
- "$99/mo All-Inclusive Starter" next to the plan's "where supported" items (e.g. WhatsApp).

All figures inside the product previews are labelled illustrative sample data.
Legal pages (`/privacy`, `/terms`, `/cookies`) are placeholders pending counsel review.
Competitor pages mark vendor-specific facts as "confirm directly" rather than asserting them.

## Not yet done

- Competitor-specific researched detail on `/compare/*`.
- More blog articles (two starter posts exist).
- Self-hosting the fonts (currently Google Fonts, as specified).
