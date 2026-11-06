#!/usr/bin/env node
/**
 * Fails if any CSS custom property is used via var(--x) without a fallback
 * but is never defined anywhere in src/. An undefined variable silently
 * invalidates the whole declaration (e.g. padding collapses to 0), which is
 * exactly how undefined --space-5/10/20 once broke spacing site-wide.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(css|astro)$/.test(name)) files.push(p);
  }
})("src");

const defined = new Set();
const used = new Map();
for (const f of files) {
  const text = readFileSync(f, "utf8");
  for (const m of text.matchAll(/(--[\w-]+)\s*:/g)) defined.add(m[1]);
  for (const m of text.matchAll(/var\(\s*(--[\w-]+)\s*(,?)/g)) {
    if (m[2] === ",") continue; // has a fallback, intentionally optional
    if (!used.has(m[1])) used.set(m[1], new Set());
    used.get(m[1]).add(f);
  }
}
const missing = [...used.keys()].filter((k) => !defined.has(k)).sort();
if (missing.length) {
  console.error("\nUndefined CSS variables (used without a fallback):");
  for (const k of missing) console.error(`  ${k}  ->  ${[...used.get(k)].slice(0, 3).join(", ")}`);
  console.error("\nDefine them in src/styles/tokens.css or add a fallback.\n");
  process.exit(1);
}
console.log(`check:css ok — ${used.size} variables referenced, all defined.`);
