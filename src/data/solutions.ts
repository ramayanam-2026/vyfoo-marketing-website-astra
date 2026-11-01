export interface Solution {
  slug: string;
  name: string;
  category: "enterprise" | "specialized";
  buyer: string;
  headline: string;
  problem: string;
  focusAreas: string[];
  mappedCapabilities: { module: string; href: string; note: string }[];
  integrationCaveat?: string;
}

export const solutions: Solution[] = [
  {
    slug: "qsr",
    name: "Quick Service Restaurants",
    category: "specialized",
    buyer: "QSR owners and operations managers running high-volume counter service",
    headline: "Built for the speed of a QSR counter.",
    problem:
      "QSR margins depend on throughput. A slow order entry screen, a kitchen that doesn't see combos clearly, or a pickup counter that creates congestion during peak hours all cost real turns per hour.",
    focusAreas: [
      "Fast order entry built for repeat, high-frequency transactions",
      "Combo and modifier workflows",
      "Kitchen ticket visibility during peak-period load",
      "Pickup/order-ready status to reduce counter crowding",
    ],
    mappedCapabilities: [
      { module: "Restaurant POS", href: "/features/restaurant-pos", note: "fast counter order entry" },
      { module: "Kitchen Display System", href: "/features/kitchen-display-system", note: "live ticket visibility during rushes" },
      { module: "Order Status Display", href: "/features/order-status-display", note: "reduce pickup-counter congestion" },
    ],
  },
  {
    slug: "cafe",
    name: "Cafés & Bakeries",
    category: "specialized",
    buyer: "Café and bakery owners managing a morning rush and perishable stock",
    headline: "Handle the morning rush without losing track of what's left in the case.",
    problem:
      "Cafés deal with a short, intense rush window, heavy drink customization, and perishable inventory that spoils if it isn't tracked closely — different pressures than a QSR or fine-dining floor.",
    focusAreas: [
      "Counter speed during the morning rush",
      "Drink modifier workflows",
      "Coordinated bar and pastry-case preparation",
      "Recipe-based stock tracking for perishable inventory, where configured",
    ],
    mappedCapabilities: [
      { module: "Restaurant POS", href: "/features/restaurant-pos", note: "quick modifier-heavy order entry" },
      { module: "Inventory & Recipes", href: "/features/inventory-management", note: "track perishable stock against recipes" },
    ],
  },
  {
    slug: "fine-dining",
    name: "Fine Dining",
    category: "specialized",
    buyer: "Fine-dining owners and floor managers running a table-service room",
    headline: "Pace the room, not just the ticket.",
    problem:
      "Fine dining runs on pacing and precision — course timing, accurate allergy and modifier notes, and controlled discounting — issues a QSR-oriented POS usually wasn't built to handle well.",
    focusAreas: [
      "Table management across a full-service room",
      "Course pacing",
      "Seat- and item-level bill splitting",
      "Controlled discounts and voids with visibility for management",
    ],
    mappedCapabilities: [
      { module: "Restaurant POS", href: "/features/restaurant-pos", note: "table and seat-level billing" },
      { module: "Multi-Outlet Management", href: "/features/multi-outlet-management", note: "discount and void controls where configured" },
    ],
  },
  {
    slug: "cloud-kitchen",
    name: "Cloud Kitchens",
    category: "specialized",
    buyer: "Delivery-only and cloud kitchen operators running one or more brands",
    headline: "Run delivery-first production without losing visibility into the kitchen queue.",
    problem:
      "Cloud kitchens are production-first: no dining room, often multiple brands sharing one kitchen, and a dependency on external delivery platforms that need to be reconciled against internal stock and reporting.",
    focusAreas: [
      "Delivery-oriented production queues",
      "Kitchen queue management across concurrent orders",
      "Recipe and stock visibility shared across brands",
      "Multi-brand and multi-outlet structure",
    ],
    mappedCapabilities: [
      { module: "Kitchen Display System", href: "/features/kitchen-display-system", note: "manage a shared production queue" },
      { module: "Inventory & Recipes", href: "/features/inventory-management", note: "stock visibility across brands" },
    ],
    integrationCaveat:
      "Connections to third-party delivery aggregators are integration-specific and should be confirmed for your platforms during scoping — they are not presented here as pre-built native integrations.",
  },
  {
    slug: "multi-outlet",
    name: "Multi-Outlet Restaurant Chains",
    category: "enterprise",
    buyer: "Operations directors and COOs running several company-owned outlets",
    headline: "Run every outlet with a clearer operating model.",
    problem:
      "Past a handful of locations, consistency and visibility become the bottleneck: menus drift, reporting lags, and headquarters ends up reconciling spreadsheets from each outlet instead of seeing the business in one place.",
    focusAreas: [
      "Headquarters visibility across all outlets",
      "Outlet-to-outlet comparison reporting",
      "Centralized menu and pricing governance, where configured",
      "Regional configuration for tax and operations",
    ],
    mappedCapabilities: [
      { module: "Multi-Outlet Management", href: "/features/multi-outlet-management", note: "centralized configuration and visibility" },
      { module: "Restaurant Reporting", href: "/features/restaurant-reporting", note: "cross-outlet comparison" },
    ],
  },
  {
    slug: "food-truck",
    name: "Food Trucks",
    category: "specialized",
    buyer: "Food truck and cart operators needing portable, low-friction tools",
    headline: "A counter system that fits in a truck, not a back office.",
    problem:
      "Food trucks run on small screens, short menus, fast checkout, and unreliable connectivity — requirements closer to a mobile pop-up than a full-service restaurant.",
    focusAreas: [
      "Small-screen, short-menu workflows",
      "Fast checkout",
      "Portable hardware compatibility",
      "Operating under intermittent connectivity",
    ],
    mappedCapabilities: [
      { module: "Restaurant POS", href: "/features/restaurant-pos", note: "fast checkout on compact hardware" },
      { module: "Hybrid & Offline POS", href: "/features/hybrid-offline-pos", note: "designed to keep taking orders through connectivity gaps" },
    ],
  },
  {
    slug: "bars-and-breweries",
    name: "Bars & Breweries",
    category: "specialized",
    buyer: "Bar and brewery managers running tabs and high SKU-turnover inventory",
    headline: "Keep tabs, modifiers, and pour-level inventory under control.",
    problem:
      "Bars run on open tabs, frequent promotions, and a high-SKU beverage inventory where small unlogged pours add up — different operational pressure than a food-only counter.",
    focusAreas: [
      "Open tabs and checks, where supported",
      "Drink modifiers and promotions",
      "SKU-level beverage inventory",
      "Transaction controls on discounts and comps",
    ],
    mappedCapabilities: [
      { module: "Restaurant POS", href: "/features/restaurant-pos", note: "tab and modifier handling" },
      { module: "Inventory & Recipes", href: "/features/inventory-management", note: "SKU-level beverage tracking" },
    ],
  },
  {
    slug: "hotel-fb",
    name: "Hotel F&B",
    category: "enterprise",
    buyer: "Hotel F&B managers running restaurant and bar outlets within a property",
    headline: "Run the restaurant and bar side of the property on one connected system.",
    problem:
      "Hotel F&B outlets need restaurant-grade POS and kitchen workflows, but also need their settlement data to be exportable into whatever property management and finance systems the hotel already runs.",
    focusAreas: [
      "Dining-room and bar POS",
      "Kitchen operations tied to the same system",
      "Room-service order handling, where supported",
      "Settlement data export for downstream finance/PMS reconciliation",
    ],
    mappedCapabilities: [
      { module: "Restaurant POS", href: "/features/restaurant-pos", note: "dining-room and bar order entry" },
      { module: "Restaurant Reporting", href: "/features/restaurant-reporting", note: "exportable settlement and sales data" },
    ],
    integrationCaveat:
      "Native folio posting into a specific hotel PMS is not assumed here — any PMS connection should be scoped and confirmed for your property's system.",
  },
  {
    slug: "central-kitchen",
    name: "Central Kitchen & Commissary",
    category: "enterprise",
    buyer: "Commissary and central-production managers supplying multiple outlets",
    headline: "Give central production the same visibility as the outlets it supplies.",
    problem:
      "A central kitchen's output drives every outlet downstream of it, but production queues, ingredient visibility, and multi-location stock reporting are often managed separately from outlet-level POS.",
    focusAreas: [
      "Production workflows and preparation queues",
      "Recipe and ingredient visibility",
      "Multi-location stock and reporting tied back to central production",
      "Clear separation between central production and outlet-level operations",
    ],
    mappedCapabilities: [
      { module: "Inventory & Recipes", href: "/features/inventory-management", note: "recipe and ingredient visibility" },
      { module: "Multi-Outlet Management", href: "/features/multi-outlet-management", note: "central-to-outlet reporting structure" },
    ],
    integrationCaveat:
      "Specific production-planning or ERP integrations require scoping and are not presented as pre-built.",
  },
  {
    slug: "franchise-restaurant-management",
    name: "Franchise Operations",
    category: "enterprise",
    buyer: "Franchisors and franchise operations teams managing brand consistency across operators",
    headline: "Keep every franchise location consistent, without micromanaging every one of them.",
    problem:
      "Franchise systems need brand-level consistency — menu, pricing, process — while still giving each location room to operate, and need visibility into outlet-level performance without a manual rollup process.",
    focusAreas: [
      "Brand consistency across outlets",
      "Outlet-level visibility for the franchisor",
      "Permission structures distinguishing central vs. local control",
      "Standardized operating processes",
    ],
    mappedCapabilities: [
      { module: "Multi-Outlet Management", href: "/features/multi-outlet-management", note: "centralized governance with outlet-level visibility" },
      { module: "Restaurant Reporting", href: "/features/restaurant-reporting", note: "franchise-wide performance visibility" },
    ],
  },
  {
    slug: "multi-brand-cloud-kitchen",
    name: "Multi-Brand Cloud Kitchens",
    category: "enterprise",
    buyer: "Operators running several delivery-only brands out of shared kitchen space",
    headline: "Run several brands out of one kitchen without losing track of which order belongs to which.",
    problem:
      "Multi-brand cloud kitchens share production space and staff across several concurrent menus, which makes kitchen execution, inventory draw-down, and outlet-level reporting harder to keep straight than a single-brand kitchen.",
    focusAreas: [
      "Shared production environments across brands",
      "Multiple menus running concurrently",
      "Kitchen execution clarity by brand and order",
      "Outlet- and brand-level reporting and inventory draw-down",
    ],
    mappedCapabilities: [
      { module: "Kitchen Display System", href: "/features/kitchen-display-system", note: "execution clarity across concurrent brand menus" },
      { module: "Restaurant Reporting", href: "/features/restaurant-reporting", note: "brand-level performance visibility" },
    ],
    integrationCaveat:
      "Aggregator-specific brand routing should be confirmed for your delivery platforms during scoping.",
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
