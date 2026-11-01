export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  columns: { heading?: string; links: NavLink[] }[];
}

export const productGroup: NavGroup = {
  label: "Product",
  href: "/features",
  columns: [
    {
      heading: "Operations",
      links: [
        { label: "Restaurant POS", href: "/features/restaurant-pos" },
        { label: "Kitchen Display System", href: "/features/kitchen-display-system" },
        { label: "QR Ordering", href: "/features/qr-ordering" },
        { label: "Order Status Display", href: "/features/order-status-display" },
      ],
    },
    {
      heading: "Management",
      links: [
        { label: "Inventory & Recipes", href: "/features/inventory-management" },
        { label: "Multi-Outlet Management", href: "/features/multi-outlet-management" },
        { label: "Restaurant Reporting", href: "/features/restaurant-reporting" },
        { label: "Restaurant CRM", href: "/features/restaurant-crm" },
      ],
    },
    {
      heading: "Platform",
      links: [
        { label: "Restaurant Operating System", href: "/restaurant-operating-system" },
        { label: "Hybrid & Offline POS", href: "/features/hybrid-offline-pos" },
      ],
    },
  ],
};

export const solutionsGroup: NavGroup = {
  label: "Solutions",
  href: "/solutions",
  columns: [
    {
      heading: "Enterprise & multi-location",
      links: [
        { label: "Multi-Outlet Chains", href: "/solutions/multi-outlet" },
        { label: "Franchise Operations", href: "/solutions/franchise-restaurant-management" },
        { label: "Central Kitchen & Commissary", href: "/solutions/central-kitchen" },
        { label: "Multi-Brand Cloud Kitchens", href: "/solutions/multi-brand-cloud-kitchen" },
        { label: "Hotel F&B", href: "/solutions/hotel-fb" },
      ],
    },
    {
      heading: "High-velocity & specialized",
      links: [
        { label: "QSR", href: "/solutions/qsr" },
        { label: "Cloud Kitchens", href: "/solutions/cloud-kitchen" },
        { label: "Cafés & Bakeries", href: "/solutions/cafe" },
        { label: "Fine Dining", href: "/solutions/fine-dining" },
        { label: "Bars & Breweries", href: "/solutions/bars-and-breweries" },
        { label: "Food Trucks", href: "/solutions/food-truck" },
      ],
    },
  ],
};

export const whyVyfooGroup: NavGroup = {
  label: "Why Vyfoo",
  columns: [
    {
      links: [
        { label: "Hybrid & Offline Architecture", href: "/features/hybrid-offline-pos" },
        { label: "Restaurant Staff Theft Prevention", href: "/restaurant-staff-theft-prevention" },
        { label: "Stop Restaurant Cash Leakage", href: "/stop-restaurant-cash-leakage" },
        { label: "Restaurant Inventory Variance", href: "/restaurant-inventory-variance" },
        { label: "Hardware Compatibility", href: "/hardware-compatibility" },
        { label: "Security & Deployment", href: "/security" },
      ],
    },
  ],
};

export const resourcesGroup: NavGroup = {
  label: "Resources",
  columns: [
    {
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Compare Vyfoo", href: "/compare" },
        { label: "Case Studies", href: "/case-studies" },
      ],
    },
  ],
};

export const pricingGroup: NavGroup = {
  label: "Pricing",
  href: "/pricing",
  columns: [
    {
      links: [
        { label: "Global Pricing", href: "/pricing" },
        { label: "India Pricing", href: "/pricing/india" },
      ],
    },
  ],
};

export const primaryNav: NavGroup[] = [
  productGroup,
  solutionsGroup,
  whyVyfooGroup,
  resourcesGroup,
  pricingGroup,
];

export const footerNav = {
  product: productGroup.columns.flatMap((c) => c.links),
  solutions: solutionsGroup.columns.flatMap((c) => c.links),
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Compare Vyfoo", href: "/compare" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Security", href: "/security" },
    { label: "Integrations", href: "/integrations" },
    { label: "Deployment", href: "/deployment" },
    { label: "Hardware Compatibility", href: "/hardware-compatibility" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Pricing", href: "/pricing" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};
