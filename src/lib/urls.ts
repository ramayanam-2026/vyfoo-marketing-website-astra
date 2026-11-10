/**
 * Centralized destinations for all conversion CTAs.
 *
 * The product application, authentication, and sandbox infrastructure live
 * outside this repository. Every CTA in the marketing site should import
 * from here rather than hardcoding a URL, so the real destinations can be
 * configured once real endpoints are confirmed.
 *
 * Required environment variables (see .env.example):
 *   PUBLIC_VYFOO_APP_URL      - base URL of the product application
 *   PUBLIC_VYFOO_SIGNUP_URL   - self-serve trial signup route
 *   PUBLIC_VYFOO_LOGIN_URL    - existing customer login route
 *   PUBLIC_VYFOO_SANDBOX_URL  - pre-populated sandbox/demo environment
 *
 * None of these are known/verified yet, so they fall back to on-site
 * contact/trial pages that collect intent instead of silently pointing at
 * an invented external URL.
 */

const env = import.meta.env;

export const urls = {
  /** Self-serve trial. Falls back to the on-site trial start page until
   *  PUBLIC_VYFOO_SIGNUP_URL is configured. */
  startTrial: env.PUBLIC_VYFOO_SIGNUP_URL || "/pricing#start-trial",

  /** Existing customer login. */
  login: env.PUBLIC_VYFOO_LOGIN_URL || "/contact",

  /** Interactive product sandbox. */
  sandbox: env.PUBLIC_VYFOO_SANDBOX_URL || "/pricing#start-trial",

  /** Marketing-site enterprise demo request form. */
  bookDemo: "/contact/demo",

  /** Marketing-site enterprise sales contact. */
  talkToSales: "/contact/enterprise",

  /** General contact. */
  contact: "/contact",
} as const;

/**
 * Webhook that receives every lead form (Book Demo, Enterprise Sales, Contact).
 * Read from PUBLIC_VYFOO_LEADS_ENDPOINT at build time (Vercel: Project Settings >
 * Environment Variables). It is intentionally NOT committed: this repository is public.
 * Each form receives it through a `data-endpoint` attribute. Empty means "not connected".
 */
export const leadsEndpoint: string = (env.PUBLIC_VYFOO_LEADS_ENDPOINT ?? "").trim();

export const CONTACT_EMAIL = "contact@vyfoo.com";
export const CONTACT_PHONE = "+91 72172 15635";
export const COMPANY_NAME = "VYQDA Technologies";
export const SITE_NAME = "Vyfoo";
export const SITE_URL = "https://vyfoo.com";
