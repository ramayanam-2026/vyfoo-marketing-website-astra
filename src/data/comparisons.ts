export interface Comparison {
  slug: string;
  competitor: string;
  /** Short, neutral note on what the competitor is generally known for. Not a ranking claim. */
  competitorSummary: string;
  bestFitVyfoo: string;
  bestFitCompetitor: string;
  verifiedNote: string;
}

/**
 * Pricing and feature-availability claims about competitors are not hard-coded here because
 * they change frequently and must come from current, cited research (web search) at the time
 * a page is written or updated — not from static data that can go stale. Each comparison page
 * should pull current detail via research and clearly mark anything unverified for follow-up,
 * per the build directive. This file holds only the stable, non-factual scaffolding.
 */
export const comparisons: Comparison[] = [
  {
    slug: "vyfoo-vs-toast",
    competitor: "Toast",
    competitorSummary: "A widely used US restaurant POS and payments platform, generally associated with integrated hardware and payment processing.",
    bestFitVyfoo: "Restaurants and groups outside the US, or those wanting a hybrid offline architecture and flexible hardware options.",
    bestFitCompetitor: "US-based restaurants wanting an all-in-one hardware-plus-payments package from a single vendor.",
    verifiedNote: "Toast's current pricing, hardware bundles, and contract terms change over time — confirm directly with Toast and with our team before comparing specific numbers.",
  },
  {
    slug: "vyfoo-vs-square",
    competitor: "Square (Square for Restaurants)",
    competitorSummary: "A widely used POS and payments platform popular with small businesses and independent restaurants, known for simple setup.",
    bestFitVyfoo: "Independent restaurants and growing chains that want deeper kitchen, inventory, and multi-outlet connectivity beyond payments.",
    bestFitCompetitor: "Very small operations prioritizing fast setup and integrated payments above deeper operational tooling.",
    verifiedNote: "Square's current plan tiers and transaction fees change over time — confirm directly with Square before comparing specific numbers.",
  },
  {
    slug: "vyfoo-vs-lightspeed",
    competitor: "Lightspeed Restaurant",
    competitorSummary: "A POS platform serving restaurants and retail, generally associated with broader retail/hospitality coverage.",
    bestFitVyfoo: "Restaurant-specific operators wanting a purpose-built restaurant operating system rather than a broader retail-oriented platform.",
    bestFitCompetitor: "Businesses operating across both retail and restaurant formats wanting one vendor relationship.",
    verifiedNote: "Lightspeed's current feature set and pricing change over time — confirm directly with Lightspeed before comparing specific numbers.",
  },
  {
    slug: "vyfoo-vs-posist",
    competitor: "Posist (Restroworks)",
    competitorSummary: "A restaurant management platform with a strong presence in South Asian and Middle Eastern markets.",
    bestFitVyfoo: "Operators comparing offline-capable, connected-operations platforms in similar regional markets.",
    bestFitCompetitor: "Groups with existing Posist/Restroworks integrations or regional support relationships already in place.",
    verifiedNote: "Posist's current capabilities and pricing change over time — confirm directly with Restroworks before comparing specific numbers.",
  },
  {
    slug: "vyfoo-vs-petpooja",
    competitor: "Petpooja",
    competitorSummary: "A restaurant POS and management platform widely used by independent restaurants and chains in India.",
    bestFitVyfoo: "Operators wanting a connected operating-system approach with multi-outlet governance as they scale.",
    bestFitCompetitor: "Single-outlet Indian restaurants prioritizing an established local aggregator integration ecosystem.",
    verifiedNote: "Petpooja's current aggregator integrations and pricing change over time — confirm directly with Petpooja before comparing specific numbers.",
  },
  {
    slug: "vyfoo-vs-foodics",
    competitor: "Foodics",
    competitorSummary: "A restaurant management platform with significant presence in the Middle East, including Saudi Arabia and the UAE.",
    bestFitVyfoo: "Operators evaluating offline architecture and multi-outlet reporting alongside regional tax configuration.",
    bestFitCompetitor: "Groups with existing Foodics regional partner or integration relationships.",
    verifiedNote: "Foodics' current regional compliance features (e.g. ZATCA) and pricing change over time — confirm directly with Foodics before comparing specific numbers.",
  },
  {
    slug: "vyfoo-vs-sapaad",
    competitor: "Sapaad",
    competitorSummary: "A cloud-based restaurant POS and delivery management platform used across multiple regions including Asia and the Middle East.",
    bestFitVyfoo: "Operators wanting deeper multi-outlet governance and offline resilience as part of the core platform.",
    bestFitCompetitor: "Delivery-heavy operations prioritizing Sapaad's established delivery-management workflow.",
    verifiedNote: "Sapaad's current feature set and pricing change over time — confirm directly with Sapaad before comparing specific numbers.",
  },
  {
    slug: "vyfoo-vs-touchbistro",
    competitor: "TouchBistro",
    competitorSummary: "An iPad-based restaurant POS popular with independent restaurants, especially in North America.",
    bestFitVyfoo: "Operators wanting hardware flexibility beyond iPad-only deployment and multi-outlet reporting.",
    bestFitCompetitor: "Single-location restaurants standardized on iPad hardware wanting a focused POS experience.",
    verifiedNote: "TouchBistro's current pricing and add-on modules change over time — confirm directly with TouchBistro before comparing specific numbers.",
  },
  {
    slug: "vyfoo-vs-revel",
    competitor: "Revel Systems",
    competitorSummary: "An iPad-based POS platform serving restaurants and retail businesses, often positioned for enterprise and multi-location operators.",
    bestFitVyfoo: "Multi-outlet restaurant groups wanting a restaurant-specific connected order flow rather than a broader retail/restaurant hybrid platform.",
    bestFitCompetitor: "Enterprise operators already standardized on Revel's broader retail-and-restaurant ecosystem.",
    verifiedNote: "Revel's current enterprise pricing and contract structure change over time — confirm directly with Revel before comparing specific numbers.",
  },
];

export function getComparisonBySlug(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}
