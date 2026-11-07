/**
 * Google Analytics 4 helpers.
 *
 * The Measurement ID is a public identifier (it is visible in any page's source),
 * so it is safe to keep in the repo. Override with PUBLIC_GA_MEASUREMENT_ID.
 * The gtag bootstrap itself lives in BaseLayout.astro and loads in production
 * builds only, so `astro dev` never sends hits.
 *
 * Never put personal data (names, emails, form values) in event parameters.
 */
export const GA_MEASUREMENT_ID: string = import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? "G-14XFNTXMSY";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a GA4 event. No-ops safely when GA isn't loaded (dev, or blocked by the visitor). */
export function track(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
