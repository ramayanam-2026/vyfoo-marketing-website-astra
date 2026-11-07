/**
 * Shared client-side engine for every lead form on the site
 * (Book Enterprise Demo, Talk to Enterprise Sales, general Contact).
 *
 * Posts JSON to the webhook in PUBLIC_VYFOO_LEADS_ENDPOINT. That value is
 * deliberately NOT committed (the repository is public); set it in `.env`
 * locally and in the hosting provider's environment variables.
 *
 * Behaviour guarantees:
 *  - Never claims success unless the endpoint answered 2xx.
 *  - With no endpoint configured, says so plainly and offers a mailto fallback.
 *  - On any failure, keeps the visitor's input and offers the mailto fallback.
 *  - A hidden honeypot field drops bot submissions without contacting the endpoint.
 *  - No form values are ever sent to Google Analytics.
 */
import { track } from "./analytics";

const ENDPOINT: string = (import.meta.env.PUBLIC_VYFOO_LEADS_ENDPOINT as string | undefined)?.trim() ?? "";
const REQUEST_TIMEOUT_MS = 15000;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function initLeadForm(form: HTMLFormElement): void {
  if (form.dataset.ready === "true") return;
  form.dataset.ready = "true";

  const formType = form.dataset.formType ?? "contact"; // contact | demo | enterprise
  const formName = form.dataset.formName ?? formType;
  const eventPrefix = formType === "contact" ? "contact" : "enterprise";
  const fallbackEmail = form.dataset.email ?? "";
  const statusEl = form.querySelector<HTMLElement>("[data-lead-form-status]");
  const submitBtn = form.querySelector<HTMLButtonElement>("[data-lead-form-submit]");
  if (!statusEl || !submitBtn) return;
  const idleLabel = submitBtn.textContent ?? "Submit";

  let started = false;
  form.addEventListener("focusin", () => {
    if (started) return;
    started = true;
    track(`${eventPrefix}_form_started`, { form_type: formType });
  });

  function showStatus(state: "success" | "error", message: string, withMailto = false): void {
    statusEl!.hidden = false;
    statusEl!.dataset.state = state;
    statusEl!.textContent = message + (withMailto ? " " : "");
    if (withMailto && fallbackEmail) {
      const a = document.createElement("a");
      a.href = `mailto:${fallbackEmail}`;
      a.textContent = fallbackEmail;
      statusEl!.append(a, ".");
    }
  }

  function fieldError(input: HTMLInputElement | HTMLTextAreaElement, message: string): void {
    input.setAttribute("aria-invalid", "true");
    const err = form.querySelector<HTMLElement>(`#${input.id}-error`);
    if (err) {
      err.textContent = message;
      err.hidden = false;
    }
  }

  function clearErrors(): void {
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    form.querySelectorAll<HTMLElement>(".lead-form__error").forEach((el) => {
      el.hidden = true;
      el.textContent = "";
    });
    statusEl!.hidden = true;
  }

  function validate(): boolean {
    const invalid: Array<HTMLInputElement | HTMLTextAreaElement> = [];
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]").forEach((input) => {
      const value = input.value.trim();
      if (!value) {
        fieldError(input, input.dataset.error ?? "Please complete this field.");
        invalid.push(input);
      } else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        fieldError(input, "Please enter a valid email address.");
        invalid.push(input);
      }
    });
    invalid[0]?.focus();
    return invalid.length === 0;
  }

  function buildPayload(): Record<string, unknown> {
    const values = Object.fromEntries(new FormData(form)) as Record<string, FormDataEntryValue>;
    delete values.hp_field; // honeypot
    const params = new URLSearchParams(location.search);
    const utm = Object.fromEntries(UTM_KEYS.filter((k) => params.get(k)).map((k) => [k, params.get(k)]));
    return {
      formType,
      formName,
      ...values,
      pageUrl: location.origin + location.pathname,
      referrer: document.referrer || undefined,
      utm: Object.keys(utm).length ? utm : undefined,
      submittedAt: new Date().toISOString(),
      site: "vyfoo.com",
    };
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();
    if (!validate()) return;

    // Honeypot: real people never see or fill this field. Bots get a quiet no-op
    // (this is spam, not a lead, so nothing is sent).
    const trap = form.elements.namedItem("hp_field") as HTMLInputElement | null;
    if (trap && trap.value) {
      showStatus("success", "Thanks — your message was received.");
      form.reset();
      return;
    }

    if (!ENDPOINT) {
      showStatus("error", "This form isn't connected yet, so it can't be submitted automatically. Please email us directly at", true);
      return;
    }

    submitBtn!.disabled = true;
    submitBtn!.textContent = "Sending…";
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
        signal: controller.signal,
        keepalive: true,
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      showStatus("success", "Thanks — your message was received. Our team will follow up using the email you provided.");
      track(`${eventPrefix}_form_submitted`, { form_type: formType });
      track("generate_lead", { form_type: formType });
      form.reset();
    } catch {
      showStatus("error", "Something went wrong sending this form, so please email us directly so we don't lose your request:", true);
    } finally {
      clearTimeout(timer);
      submitBtn!.disabled = false;
      submitBtn!.textContent = idleLabel;
    }
  });
}
