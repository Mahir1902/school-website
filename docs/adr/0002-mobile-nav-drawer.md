# ADR-0002: Mobile nav drawer (accordion) + hero behavior

- Status: Accepted
- Date: 2026-06-25
- Builds on: [[adr/0001-unified-navigation]]

## Decisions (from grilling)

1. **Drawer model = accordion, full parity.** The mobile drawer mirrors the desktop
   nav exactly. Each top-level row links to its landing page; a chevron toggle
   expands that item's dropdown sections inline. Every desktop link is reachable
   on mobile.

2. **Hero stays clean on mobile.** ScrollNavbar remains hidden over the hero on the
   homepage (no change to the `scrollY > 100` rule). The Hero's own `Menu` button is
   the trigger over the hero; once scrolled past it, ScrollNavbar slides in with a
   now-working hamburger. Both triggers open the **same** drawer.

3. **Issue #1 ("navbar shows over hero on mobile") = not a bug.** User confirmed what
   they see at the top is the Hero header (white logo + "Menu"), which is intended.
   No code change needed for it; the redesign just makes its button useful.

4. **Contact link.** No `/contact` route exists. `Contact` points to `/#contact`
   (matching existing CTA buttons), and `id="contact"` is added to the Footer's
   Contact block so the anchor resolves. See [[glossary#contact-anchor]].

## Implementation shape (minimal)

- **`data/navigation.ts`** — single source of truth. One `navItems` array assembling
  top-level items + their existing per-section dropdown data (reused, not duplicated).
- **`components/MobileNavDrawer.tsx`** — shared `{ isOpen, onClose }` drawer:
  backdrop + slide-in panel + accordion over `navItems`. Owns body-scroll-lock.
- **`components/ScrollNavbar.tsx`** — consume `navItems`; wire the mobile `<Menu>`
  button to open the drawer; render `<MobileNavDrawer>`.
- **`sections/Hero.tsx`** — drop its bespoke `menuItems`/drawer; its `Menu` button now
  opens `<MobileNavDrawer>`.
- **`sections/Footer.tsx`** — add `id="contact"`.

## Notes / incidental fixes

- Hero's old drawer used the **white** logo on a **white** panel (invisible). The
  shared drawer uses the dark/green logo so it's actually visible.
- Two independent `isOpen` booleans (Hero + ScrollNavbar) are fine: they are never
  visible at the same time (Hero only over hero, ScrollNavbar only after scroll), so
  no shared context/provider is needed.
