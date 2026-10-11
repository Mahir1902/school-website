# Glossary

Living glossary built during `/grill-with-docs` sessions. Shared vocabulary,
grouped by feature.

# Navigation

## Nav source of truth
The single definition of the navigation link tree (top-level items + dropdown
sections) consumed by every surface: desktop bar, mobile drawer, Hero trigger.
See [[adr/0001-unified-navigation]].

## Top-level item
A first-class nav entry shown in the desktop bar and as a drawer row on mobile:
Home, About Us, Academics, Beyond Academics, Admissions, News & Events, Contact.

## Dropdown section
A labelled group of links inside a top-level item's dropdown (e.g. Academics →
"International Qualifications"). On desktop these render as columns; on mobile they
become accordion content.

## Mobile drawer
The slide-out panel shown below the `md:` breakpoint. Replaces both the dead
ScrollNavbar hamburger and the Hero's separate anchor menu.

## ScrollNavbar visibility
On the homepage the fixed bar is hidden until `window.scrollY > 100`, then it
animates in. On all other pages it is always visible. This is device-agnostic
(pure scroll position) — see the "navbar over hero on mobile" investigation in
the grilling notes.

## Hero header
The always-present row at the top of the hero (white logo + "Menu" button). It is
NOT the ScrollNavbar. Likely what the user perceived as "the navbar showing in the
hero on mobile."

## Unbuilt top-level routes
The nav links to five sections, but only two have pages built:
`/academics` (full tree) and `/news-events` (full tree) exist; **`/about`,
`/beyond-academics`, and `/admissions` 404** (no `page.tsx`). This is pre-existing
and affects desktop and mobile identically — the unified nav simply surfaces the
same dead links on both. Building those page trees is separate from the nav rework.

## #contact anchor  {#contact-anchor}
`#contact` / `/#contact` was linked from the Hero menu and CTA buttons. An
`id="contact"` now exists on the Footer info block (`sections/Footer.tsx`), so the
anchor scrolls to contact *info*. Per [[adr/0003-contact-form-ghl-lead-capture]]
the nav "Contact" item moves to the real `/contact` page (form), not this anchor.

# Contact form & CRM

Vocabulary for the contact form → GoHighLevel lead capture.
See [[adr/0003-contact-form-ghl-lead-capture]].

## Contact form
The form on the `/contact` page. Primary job is **admissions lead capture**;
secondary job is general enquiries. Every submission becomes a GHL contact.

## Reason selector
The "what's this about?" field with two values: `Admissions enquiry` (primary,
shows the lean admissions fields) and `General enquiry` (catch-all; "Other" folds
in here). Careers is explicitly out. Maps to a GHL tag.

## Lean field set
The ≈6 admissions fields chosen for completion over exhaustiveness: First name,
Last name, Email, Phone, Programme of interest, Message (+ consent). Child age and
intake are gathered by the admissions team on follow-up, not on the form.

## Name split  {#name-split}
Name is captured as **two fields** (First / Last), not one "Full name", so it maps
cleanly to GHL `firstName`/`lastName` and `{{first_name}}` greetings work.

## GHL (GoHighLevel)
The sales/marketing CRM that receives leads. Contacts are created via an inbound
webhook, then nurtured with call/SMS/email automation.

## Inbound webhook
A GHL Workflow trigger that exposes a URL. The site POSTs JSON to it; a
"Create/Update Contact" action inside the workflow maps JSON keys → contact
fields/tags. **Field mapping lives in GHL, not the repo** — so no custom-field IDs
are committed. URL is stored server-side as `GHL_WEBHOOK_URL`.

## Contact API route
`/api/contact` Next.js Route Handler. The trust boundary: validates fields, runs
the honeypot + time-trap, reshapes to GHL keys, and forwards to the inbound
webhook. Browser never sees the webhook URL.

## Honeypot + time-trap
Day-one spam protection: a hidden field bots fill (submission silently dropped) +
rejecting submits faster than ~2s. No dependency, no user friction. CAPTCHA and
rate-limiting are deferred (the latter is unreliable on serverless without an
external store).

## Payload contract  {#payload-contract}
The clean JSON the route sends to GHL: `firstName`, `lastName`, `email`, `phone`,
`reason`, `programme` (admissions only), `message`, `marketingConsent`, `source`.
The honeypot field and timestamp are validated then **stripped** — never
forwarded.

## Marketing consent
Optional opt-in checkbox ("Send me school news & updates"), separate from the
required "contact me about my enquiry" consent. PDPA-clean; sets a GHL marketing
tag so nurture campaigns only reach opt-ins.

## PDPA
Singapore's Personal Data Protection Act. Why consent is split into required
(transactional contact) vs optional (marketing), and why the form links to
`/privacy` (page not yet built).
