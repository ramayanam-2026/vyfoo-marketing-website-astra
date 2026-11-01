import { SITE_NAME, SITE_URL } from "./urls";

export interface SeoProps {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/features/restaurant-pos" */
  path: string;
  /** Set true for thin/utility pages that should not be indexed. */
  noindex?: boolean;
  ogImage?: string;
}

export function buildSeo(props: SeoProps) {
  const canonical = new URL(props.path, SITE_URL).toString();
  const fullTitle = props.title.includes(SITE_NAME)
    ? props.title
    : `${props.title} | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description: props.description,
    canonical,
    robots: props.noindex ? "noindex, nofollow" : "index, follow",
    ogImage: props.ogImage || new URL("/images/og-default.png", SITE_URL).toString(),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vyfoo",
    url: SITE_URL,
    logo: new URL("/icons/vyfoo-logo.svg", SITE_URL).toString(),
    parentOrganization: {
      "@type": "Organization",
      name: "VYQDA Technologies",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vyfoo",
    url: SITE_URL,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Vyfoo",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iPadOS, Android",
    description:
      "Hybrid cloud-and-offline restaurant operating system connecting POS billing, kitchen display, QR ordering, inventory, and reporting.",
    offers: {
      "@type": "Offer",
      price: "99",
      priceCurrency: "USD",
      url: new URL("/pricing", SITE_URL).toString(),
    },
  };
}
