export interface Faq {
  question: string;
  answer: string;
}

export const homepageFaqs: Faq[] = [
  {
    question: "What is Vyfoo?",
    answer:
      "Vyfoo is a restaurant operating system — a connected platform for POS billing, kitchen operations, QR ordering, customer fulfillment, inventory, and reporting, built for single restaurants and multi-outlet groups.",
  },
  {
    question: "How is a Restaurant OS different from a standalone POS?",
    answer:
      "A standalone POS typically handles order entry and payment. Vyfoo connects that same order to the kitchen display, customer fulfillment, inventory deduction, and management reporting, so one order updates every part of the operation instead of needing separate tools stitched together.",
  },
  {
    question: "Can Vyfoo support multiple outlets?",
    answer:
      "Yes. Multi-outlet management includes centralized menu configuration, store-level visibility, and cross-location reporting. See the Multi-Outlet Management and Growth/Enterprise pricing pages for details.",
  },
  {
    question: "What happens when internet connectivity fails?",
    answer:
      "Vyfoo's architecture is designed to keep core order-taking workflows available during a connectivity interruption, with data synchronizing to the cloud once the connection returns. The exact scope depends on your hardware and network setup — see the Hybrid & Offline Architecture page for a precise breakdown rather than a blanket guarantee.",
  },
  {
    question: "Which hardware is supported?",
    answer:
      "Vyfoo is built to run on common restaurant hardware categories including tablets, Android POS terminals, Windows touchscreens, browser-enabled displays, and thermal printers. See the Hardware Compatibility page for current, evidence-based detail — we don't claim compatibility with every manufacturer or model without validation.",
  },
  {
    question: "Does Vyfoo include a kitchen display?",
    answer:
      "Yes, a Kitchen Display System is part of the core platform, included in the Starter plan.",
  },
  {
    question: "Does Vyfoo support QR ordering?",
    answer:
      "Yes. QR ordering is included and feeds directly into the same kitchen and billing flow as counter orders, rather than operating as a separate system.",
  },
  {
    question: "How does restaurant inventory work?",
    answer:
      "Inventory can be linked to recipes so that a sold item deducts its ingredients, giving a more accurate read on stock than till data alone. The depth of waste tracking and supplier management depends on your configuration — see the Inventory & Recipes page.",
  },
  {
    question: "What does the $99/month plan include?",
    answer:
      "The Starter plan (Vyfoo Complete) includes POS, KDS, QR ordering, order status display, inventory, CRM, reporting, and staff mobile POS for a single outlet, with setup and training as outlined at signup. See the Pricing page for the full list and current terms.",
  },
  {
    question: "Is a credit card required for the trial?",
    answer: "No. The Starter plan trial does not require a credit card to begin.",
  },
  {
    question: "Is Vyfoo suitable for QSRs and cloud kitchens?",
    answer:
      "Yes — see the dedicated QSR and Cloud Kitchen solution pages for how the platform maps to those specific operational models, including where aggregator and delivery workflows require confirmation for your setup.",
  },
  {
    question: "How does implementation work?",
    answer:
      "Typical stages are discovery and requirements, data and menu preparation, configuration and hardware validation, staff training and a pilot, then rollout. Timeline depends on complexity, outlet count, and readiness — see the Deployment page.",
  },
  {
    question: "What integrations are available?",
    answer:
      "See the Integrations page, which distinguishes verified native integrations, available APIs or exports, and integrations that require custom scoping. We don't represent a proposed integration as already built.",
  },
  {
    question: "What security and compliance information is available?",
    answer:
      "See the Security page for current architecture and practices. We don't claim certifications such as SOC 2, PCI DSS, or GDPR certification for Vyfoo as a whole unless that has been independently verified and documented.",
  },
];
