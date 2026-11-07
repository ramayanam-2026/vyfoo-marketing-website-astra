#!/usr/bin/env node
/**
 * Build-time heads-up (never fails the build) for configuration that is
 * deliberately NOT committed to the public repository.
 */
import { existsSync, readFileSync } from "node:fs";

const fromFiles = {};
for (const file of [".env", ".env.production"]) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) fromFiles[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const get = (k) => (process.env[k] ?? fromFiles[k] ?? "").trim();

const notes = [];
if (!get("PUBLIC_VYFOO_LEADS_ENDPOINT")) {
  notes.push(
    "PUBLIC_VYFOO_LEADS_ENDPOINT is not set: the Book Demo, Enterprise Sales and Contact forms will tell visitors they are not connected and offer a mailto fallback instead of submitting.",
  );
}
if (!get("PUBLIC_VYFOO_SIGNUP_URL")) {
  notes.push("PUBLIC_VYFOO_SIGNUP_URL is not set: every 'Start Free Trial' button falls back to /pricing#start-trial.");
}
if (notes.length) {
  console.warn("\n⚠  Configuration notice");
  for (const n of notes) console.warn("   - " + n);
  console.warn("   Set them in .env locally and in your hosting provider's environment variables. See README.\n");
} else {
  console.log("check:env ok: lead endpoint and signup URL are configured.");
}
