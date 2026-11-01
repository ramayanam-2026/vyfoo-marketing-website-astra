export interface PricingTier {
  id: "starter" | "growth" | "enterprise";
  name: string;
  price: string;
  priceNote?: string;
  buyer: string;
  positioning: string;
  included: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter — Vyfoo Complete",
    price: "$99",
    priceNote: "/month, single outlet",
    buyer: "Independent restaurants, cafés, and single-outlet operators",
    positioning:
      "An integrated operating system for a single location, without a procurement process.",
    included: [
      "Restaurant POS & billing",
      "Kitchen Display System",
      "QR ordering",
      "Order Status Display",
      "Inventory & recipes",
      "Restaurant CRM",
      "Reporting",
      "Staff mobile POS",
      "WhatsApp-related workflows, where supported",
      "Setup and training as outlined at signup",
    ],
    ctaLabel: "Start Free Trial",
    ctaHref: "#start-trial",
  },
  {
    id: "growth",
    name: "Growth",
    price: "Custom",
    priceNote: "per-location pricing, subject to confirmed commercial policy",
    buyer: "Multi-outlet restaurant groups",
    positioning:
      "For growing groups that need cross-outlet visibility and more coordinated operations than a single-location plan covers.",
    included: [
      "Everything in Starter, per outlet",
      "Cross-outlet reporting",
      "Centralized menu and configuration management",
      "Regional configuration support",
      "Onboarding coordination across locations",
    ],
    ctaLabel: "Book a Demo",
    ctaHref: "/contact/demo",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    buyer: "Large restaurant groups, franchises, and enterprise F&B organizations",
    positioning:
      "For chains and enterprise operators that need scoped rollout planning, governance, and deployment support.",
    included: [
      "Everything in Growth",
      "Rollout and migration planning",
      "Architecture and deployment review",
      "Integration scoping",
      "Role, permission, and governance configuration",
      "Commercial and support terms confirmed during scoping",
    ],
    ctaLabel: "Contact Enterprise Sales",
    ctaHref: "/contact/enterprise",
  },
];

export const starterOfferTerms = [
  "No credit card required for the trial",
  "$0 setup fee, as outlined in the current offer",
  "No long-term lock-in, as outlined in the current offer",
  "30-day money-back guarantee, as outlined in the current offer — distinct from the free trial itself",
];
