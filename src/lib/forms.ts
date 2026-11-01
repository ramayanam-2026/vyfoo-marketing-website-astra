/**
 * Lead-form integration boundary.
 *
 * No CRM or lead-management endpoint is configured in this repository yet.
 * This module defines the client-side contract the enterprise demo form
 * uses, so a real server-side endpoint (CRM webhook, serverless function,
 * etc.) can be dropped in without changing the form markup.
 *
 * Required environment variable (server-side only, never PUBLIC_):
 *   VYFOO_LEADS_ENDPOINT - authorized URL that accepts a POST of lead data
 *
 * Until that is configured, submission clearly reports that it could not
 * be completed rather than silently discarding the lead or claiming
 * success.
 */

export interface EnterpriseLeadPayload {
  fullName: string;
  workEmail: string;
  company: string;
  role?: string;
  country?: string;
  outletCount?: string;
  operatingModel?: string;
  currentSystem?: string;
  primaryChallenge?: string;
  implementationTimeline?: string;
  source?: string;
}

export const LEADS_ENDPOINT_CONFIGURED = false; // flip once VYFOO_LEADS_ENDPOINT is wired server-side
