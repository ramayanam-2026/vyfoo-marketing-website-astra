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
  lead form, calculator, kitchen-timer ticker). No JS framework ships to the browser.
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
`conversion/EnterpriseLeadForm`.

## Configuration

Copy `.env.example` to `.env`. Nothing is required to build.

| Variable | Used for | Fallback until set |
|---|---|---|
| `PUBLIC_VYFOO_SIGNUP_URL` | "Start Free Trial" CTAs | `/pricing#start-trial` |
| `PUBLIC_VYFOO_LOGIN_URL` | Customer login | `/contact` |
| `PUBLIC_VYFOO_SANDBOX_URL` | Product sandbox | `/pricing#start-trial` |
| `PUBLIC_VYFOO_APP_URL` | Base app URL (reserved) | none |
| `PUBLIC_VYFOO_LEADS_ENDPOINT` | Enterprise lead form POST target | form reports it is not connected |

All CTA destinations are centralised in `src/lib/urls.ts`. `PUBLIC_` values are inlined
into the browser bundle, so never put secrets in them.

### Enterprise lead form

`src/components/conversion/EnterpriseLeadForm.astro` validates per field (accessible
errors, focus moves to the first invalid field). On submit:

- **No endpoint configured:** it says plainly that it is not connected and links
  `contact@vyfoo.com`. It never claims success and never sends anything.
- **Endpoint returns 2xx:** success message, form resets.
- **Endpoint fails:** error message plus the mailto fallback, so the lead is not lost.

## Deployment notes

- Output is static (`dist/`). Any static host works.
- **404:** confirm the host serves `dist/404.html` with HTTP status **404** for unknown
  paths rather than returning the homepage with a 200.
- **`/contact/sales`** is a meta-refresh redirect stub to `/contact/enterprise`
  (`noindex`, excluded from the sitemap). Configure a real **301** at the host if possible.
- `site` in `astro.config.mjs` is `https://vyfoo.com`; it drives canonicals, the sitemap,
  and structured data.
- No analytics are loaded. Add a provider deliberately and respect consent rules first.

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
