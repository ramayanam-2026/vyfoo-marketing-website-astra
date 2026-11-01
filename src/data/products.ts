export interface ProductModule {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  capabilities: string[];
  /** Capabilities that depend on configuration/plan and should not be stated as universal. */
  conditionalCapabilities?: string[];
}

export const productModules: ProductModule[] = [
  {
    slug: "restaurant-pos",
    name: "Restaurant POS",
    shortName: "POS",
    tagline: "Order entry and billing built for real restaurant floors.",
    description:
      "The counter and table-side system staff use to take orders, run payments, and close out the shift — connected to the kitchen and the back office instead of standing alone.",
    capabilities: [
      "Table-based dine-in order entry",
      "Takeaway order workflows",
      "Split bills and itemized discounts",
      "Configurable tax calculation",
      "KOT (kitchen order ticket) generation",
      "Staff-facing operations and shift close-out",
    ],
    conditionalCapabilities: ["Delivery-channel workflows, where supported for your region"],
  },
  {
    slug: "kitchen-display-system",
    name: "Kitchen Display System",
    shortName: "KDS",
    tagline: "Replace the paper ticket rail with a live kitchen queue.",
    description:
      "Orders placed at the counter or through QR ordering appear on kitchen screens the moment they're fired, with status updates that flow back to the front of house automatically.",
    capabilities: [
      "Digital kitchen tickets replacing printed dockets",
      "Live order visibility across stations",
      "Order status updates (new, preparing, ready)",
      "Preparation workflow tracking",
    ],
    conditionalCapabilities: ["Station-based order routing, where configured for your kitchen layout"],
  },
  {
    slug: "qr-ordering",
    name: "QR Ordering",
    shortName: "QR Ordering",
    tagline: "Table-linked menus guests can browse and order from directly.",
    description:
      "A QR code at the table opens a mobile menu tied to that table or order channel, feeding directly into the same operational flow as a counter order — not a disconnected side system.",
    capabilities: [
      "Table-linked QR menus",
      "Mobile menu browsing and cart",
      "Orders that flow into the same kitchen and billing pipeline as POS orders",
    ],
  },
  {
    slug: "order-status-display",
    name: "Order Status Display",
    shortName: "OSDS",
    tagline: "Let customers see when their order is ready — without asking.",
    description:
      "A browser-based display for a counter screen, tablet, or smart TV that shows live preparing/ready status by order number, reducing crowding at the pickup counter.",
    capabilities: [
      "Browser-based customer-facing display",
      "Preparing and ready status by order number",
    ],
    conditionalCapabilities: ["Smart TV and tablet display, where the device supports a standard browser"],
  },
  {
    slug: "inventory-management",
    name: "Inventory & Recipes",
    shortName: "Inventory",
    tagline: "Connect what's sold to what's actually in stock.",
    description:
      "Recipe-linked inventory tracking means a sold dish can deduct its ingredients, giving you a more accurate read on stock levels and variance than a till-only system.",
    capabilities: ["Stock monitoring", "Recipe-based deduction, where recipes are configured"],
    conditionalCapabilities: [
      "Waste and variance tracking, where enabled",
      "Purchase and supplier management, where implemented for your plan",
    ],
  },
  {
    slug: "multi-outlet-management",
    name: "Multi-Outlet Management",
    shortName: "Multi-Outlet",
    tagline: "One operating model across every location.",
    description:
      "Centralized menu and configuration management with store-level visibility, so a growing group isn't reconciling five different spreadsheets to understand how the business is performing.",
    capabilities: ["Centralized menu and operational management", "Store-level visibility", "Cross-location reporting"],
    conditionalCapabilities: ["Role and permission management, where configured for your organization"],
  },
  {
    slug: "restaurant-reporting",
    name: "Restaurant Reporting",
    shortName: "Reporting",
    tagline: "See sales, volume, and performance without waiting on a spreadsheet.",
    description:
      "Sales, order volume, and product performance reporting drawn from the same transaction data that runs the floor — not a separate export someone has to reconcile by hand.",
    capabilities: ["Sales reports", "Order volume and average order value", "Product performance"],
    conditionalCapabilities: ["Staff and payment reports, exports, where implemented for your plan"],
  },
  {
    slug: "hybrid-offline-pos",
    name: "Hybrid & Offline POS",
    shortName: "Offline POS",
    tagline: "A connectivity drop shouldn't stop the counter from taking orders.",
    description:
      "Vyfoo is architected to keep core order-taking available during an internet outage, with data synchronizing back to the cloud once connectivity returns. See the full architecture breakdown for what that covers.",
    capabilities: ["Local order entry designed to continue during connectivity interruptions", "Synchronization back to the cloud once connectivity returns"],
    conditionalCapabilities: [
      "The specific scope of offline behavior depends on hardware, network configuration, and deployment — see the architecture page for a precise breakdown rather than a blanket guarantee",
    ],
  },
  {
    slug: "restaurant-crm",
    name: "Restaurant CRM",
    shortName: "CRM",
    tagline: "Know who's ordering, without a separate loyalty tool.",
    description:
      "Customer records and order history captured through QR and counter interactions, so repeat guests and order patterns are visible in one place.",
    capabilities: ["Customer records", "Order history, where captured"],
    conditionalCapabilities: ["WhatsApp-related workflows, where implemented for your region"],
  },
];

export function getProductBySlug(slug: string) {
  return productModules.find((p) => p.slug === slug);
}
