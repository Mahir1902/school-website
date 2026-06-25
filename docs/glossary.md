# Glossary — Navigation

Living glossary built during the `/grill-with-docs` session. Terms are the shared
vocabulary for the navigation rework.

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
`#contact` / `/#contact` is linked from the Hero menu and many CTA buttons, but
**no element with `id="contact"` exists** anywhere in the codebase. The link is
dead on every page. Tracked as a separate bug from the nav rework.
