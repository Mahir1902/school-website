# ADR-0003: Contact form as GHL lead-capture

- Status: Accepted
- Date: 2026-06-26
- Context produced by: `/grill-with-docs` session on the contact form

## Context

The site nav has a **Contact** item pointing at `/#contact`, which only scrolls to
the Footer's contact-**info** block (`sections/Footer.tsx`, `id="contact"`). There
is **no form** anywhere, no `app/api/` routes, and no form/validation libraries
installed. The brief: let people contact the school, and feed every submission to
**GoHighLevel (GHL)** so a CRM contact is created.

GHL is a sales/marketing CRM — its value is nurturing leads (call/SMS/email
automation), not storing "someone emailed once". That framing drove every decision
below: the form is primarily an **admissions lead-capture** tool, secondarily a
general enquiry catch-all.

## Decision

A single **Contact form** lives on a new dedicated **`/contact`** route (two-column:
form + address/phone/email/map). Nav changes from `/#contact` → `/contact`; the
Footer info block stays as-is.

**Reason selector** splits two paths (no Careers): `Admissions enquiry` (primary)
and `General enquiry` (catch-all; "Other" folds into General).

**Lean admissions field set** (≈6 fields, optimized for completion — the team
gathers child age/intake on the follow-up call):

- First name * / Last name *  (two fields → clean GHL `firstName`/`lastName` for
  `{{first_name}}` personalization — see [[glossary#name-split]])
- Email *
- Phone *  (required, international format, not locked to +65)
- Programme of interest *  (Pre-school / Primary / Secondary / IGCSE / A-Levels)
- Message
- Consent (see below)

General path shows only name / email / phone / message + consent.

**Submission flow** — browser → **`/api/contact` Route Handler** → GHL **inbound
webhook**. The server route is the trust boundary: it validates, runs spam checks,
reshapes to GHL's expected keys, and forwards to the webhook URL held in a server
env var. Field → GHL mapping (custom fields / tags) is wired **inside the GHL
workflow**, so no GHL custom-field IDs live in the repo. See
[[glossary#payload-contract]].

**Spam protection** — **honeypot + time-trap** only (hidden field + reject
submits faster than ~2s). Zero dependencies, zero friction. No CAPTCHA and no
rate-limiter on day one (in-memory limits are theater on serverless; real limiting
needs Vercel KV/Upstash — defer until spam actually leaks).

**Consent (PDPA)** — split: one **required** "I agree to be contacted about my
enquiry" + one **optional** "Send me school news & updates" → GHL marketing tag.
Links to `/privacy`.

**Form tech** — React 19 client component, plain `fetch('/api/contact')` + local
state for pending/success/error. No react-hook-form, no zod, no new dependency
(~6 fields hand-validated client + server). Inline success message on the page;
on failure, show an error and keep the entered values.

## Consequences

- One form, one route, one server file — no library added.
- Every submission is callable/textable in GHL immediately (phone required).
- Marketing outreach is PDPA-defensible (separate opt-in, tagged in GHL).
- Field mapping is owned in GHL, so adding/renaming a field rarely touches code.
- Spam that defeats the honeypot lands in the CRM until a CAPTCHA is added.

## Open decisions / blocking dependencies

- **`/privacy` page does not exist** — the required consent links to it. Create a
  privacy page (or stub) or the link is dead. Out of scope of the form itself.
- **GHL webhook URL** must be provisioned (GHL Workflow → Inbound Webhook trigger →
  Create/Update Contact) and added to env as `GHL_WEBHOOK_URL`. Mapping of JSON
  keys → contact fields/tags is configured in that workflow.
- **Footer contact info is placeholder** (`123 Education Avenue`, `+65 1234 5678`,
  `info@sis.edu`). `/contact` should reuse the same values; real data needed.
- CAPTCHA / rate-limiting deferred — revisit if honeypot + time-trap leaks.
