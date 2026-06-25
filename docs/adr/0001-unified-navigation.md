# ADR-0001: Single source of truth for navigation

- Status: Accepted
- Date: 2026-06-25
- Context produced by: `/grill-with-docs` session on mobile navigation bugs

## Context

The homepage shipped with **two disconnected navigation systems**:

1. **`sections/Hero.tsx`** — its own `Menu` button + slide-out drawer (`isMenuOpen`),
   using a hardcoded `menuItems` list of homepage **anchor** links
   (`#about`, `#programs`, `#campus`, `#admissions`, `#news`, `#contact`).
2. **`components/ScrollNavbar.tsx`** — the fixed bar that appears after `scrollY > 100`,
   with the **real routed** nav + dropdowns on desktop
   (`/about`, `/academics`, `/beyond-academics`, `/admissions`, `/news-events`),
   but a **dead placeholder** hamburger on mobile (a `<Menu>` icon with no `onClick`,
   no state, and no drawer).

Consequences reported by the user (all traced to this split):

- Mobile hamburger in ScrollNavbar opens nothing (it is a placeholder).
- The only working mobile drawer (Hero's) shows stale anchor links that do not
  match the desktop routed pages, so most real pages are unreachable on mobile.
- The Hero's anchor links point at sections that do not all exist (e.g. no
  `#contact` element exists anywhere — see [[glossary#contact-anchor]]).

## Decision

There will be **one navigation source of truth**. The link tree (top-level items +
their dropdown sections) is defined once and consumed by:

- the **desktop bar** (ScrollNavbar, `md:` and up),
- a **shared mobile drawer** (accordion) used below `md:`,
- opened by **both** the Hero `Menu` button **and** the ScrollNavbar hamburger.

The Hero's separate anchor `menuItems` list is **retired**. Routed pages
(`/about`, `/academics`, ...) replace homepage anchors.

## Consequences

- Mobile and desktop can never drift apart again — same data feeds both.
- Hero and ScrollNavbar both trigger the same drawer component/state.
- Anchor-jump behavior on the homepage (smooth scroll to a section) is dropped in
  favor of real navigation; the homepage one-pager scroll links are gone unless a
  link explicitly opts into an anchor.

## Open decisions (resolved in later ADRs / grilling)

- Mobile drawer interaction model (accordion vs flat). → ADR-0002
- Whether ScrollNavbar stays hidden over the hero on mobile. → ADR-0002
