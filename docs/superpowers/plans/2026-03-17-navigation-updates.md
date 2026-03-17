# Navigation Updates Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the ScrollNavbar with renamed/new dropdown menus (Beyond Academics, Admissions, About Us), fix the broken Home link, rename "Overview" → "Curriculum" in Academics, and add a Scholarships item.

**Architecture:** All nav data lives in `/data/<section>/navigation.ts` files and is imported into `ScrollNavbar.tsx`. New dropdowns follow the same `NavigationSection[]` pattern already established for Academics and News & Events. The Home fix changes non-dropdown links to use `<Link>` for page routes vs `<a>` + smooth-scroll handler for anchor links.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion, lucide-react

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `data/beyondAcademics/navigation.ts` | Dropdown sections for Beyond Academics |
| Create | `data/admissions/navigation.ts` | Dropdown sections for Admissions |
| Create | `data/about/navigation.ts` | Dropdown sections for About Us |
| Modify | `data/academics/navigation.ts` | Rename Overview→Curriculum, add Scholarships |
| Modify | `components/ScrollNavbar.tsx` | navLinks array, imports, rendering logic, dropdown routing |

---

### Task 1: Create Beyond Academics navigation data

**Files:**
- Create: `data/beyondAcademics/navigation.ts`

- [ ] **Step 1: Create the file**

```typescript
// data/beyondAcademics/navigation.ts

export interface NavigationItem {
  title: string;
  href: string;
  description: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const beyondAcademicsDropdownSections: NavigationSection[] = [
  {
    title: "Sports & Athletics",
    items: [
      {
        title: "Athletics",
        href: "/beyond-academics/athletics",
        description: "Track, field, and competitive sports",
      },
      {
        title: "Sports",
        href: "/beyond-academics/sports",
        description: "Team sports and recreation",
      },
    ],
  },
  {
    title: "Student Life",
    items: [
      {
        title: "Clubs",
        href: "/beyond-academics/clubs",
        description: "Student clubs and societies",
      },
      {
        title: "Events & Fairs",
        href: "/beyond-academics/events-fairs",
        description: "School events and fairs",
      },
      {
        title: "Publications",
        href: "/beyond-academics/publications",
        description: "Student publications and media",
      },
    ],
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors for this file.

---

### Task 2: Create Admissions navigation data

**Files:**
- Create: `data/admissions/navigation.ts`

- [ ] **Step 1: Create the file**

```typescript
// data/admissions/navigation.ts

export interface NavigationItem {
  title: string;
  href: string;
  description: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const admissionsDropdownSections: NavigationSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Admission Overview",
        href: "/admissions",
        description: "Everything you need to know",
      },
      {
        title: "Why SIS",
        href: "/admissions/why-sis",
        description: "What makes us different",
      },
    ],
  },
  {
    title: "The Process",
    items: [
      {
        title: "Admission Process",
        href: "/admissions/process",
        description: "Step-by-step guide",
      },
      {
        title: "Age Requirements",
        href: "/admissions/age-requirements",
        description: "Entry age criteria",
      },
      {
        title: "Admission Dates & Offers",
        href: "/admissions/dates-offers",
        description: "Key dates and offer details",
      },
    ],
  },
  {
    title: "Details",
    items: [
      {
        title: "Fees",
        href: "/admissions/fees",
        description: "Tuition and other fees",
      },
      {
        title: "FAQs",
        href: "/admissions/faqs",
        description: "Commonly asked questions",
      },
    ],
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

---

### Task 3: Create About Us navigation data

**Files:**
- Create: `data/about/navigation.ts`

- [ ] **Step 1: Create the file**

```typescript
// data/about/navigation.ts

export interface NavigationItem {
  title: string;
  href: string;
  description: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const aboutDropdownSections: NavigationSection[] = [
  {
    title: "Who We Are",
    items: [
      {
        title: "Our School",
        href: "/about",
        description: "Learn about Singapore International School",
      },
      {
        title: "Our History",
        href: "/about/history",
        description: "Our journey and milestones",
      },
      {
        title: "Our Aim",
        href: "/about/aim",
        description: "Mission, vision, and values",
      },
    ],
  },
  {
    title: "Our People & Places",
    items: [
      {
        title: "Our Campuses & Facilities",
        href: "/about/campuses",
        description: "State-of-the-art learning environments",
      },
      {
        title: "Leadership Team",
        href: "/about/leadership",
        description: "Meet our school leadership",
      },
    ],
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

---

### Task 4: Update Academics navigation data

**Files:**
- Modify: `data/academics/navigation.ts`

- [ ] **Step 1: Rename "Overview" → "Curriculum" in `academicsNavItems`**

In `academicsNavItems`, change:
```typescript
// FROM:
{
  title: "Overview",
  href: "/academics",
  description: "Explore our comprehensive academic programs",
  icon: GraduationCap,
},
// TO:
{
  title: "Curriculum",
  href: "/academics",
  description: "Explore our comprehensive academic programs",
  icon: GraduationCap,
},
```

- [ ] **Step 2: Rename "Overview" → "Curriculum" in `academicsDropdownSections`**

In `academicsDropdownSections`, change the first item of "Academic Programmes":
```typescript
// FROM:
{
  title: "Overview",
  href: "/academics",
  description: "Our academic philosophy",
},
// TO:
{
  title: "Curriculum",
  href: "/academics",
  description: "Our academic philosophy",
},
```

- [ ] **Step 3: Add Scholarships to "More Information" section**

In `academicsDropdownSections`, in the "More Information" section items array, add after "Academic Calendar":
```typescript
{
  title: "Scholarships",
  href: "/academics/scholarships",
  description: "Scholarship opportunities",
},
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

---

### Task 5: Update ScrollNavbar

**Files:**
- Modify: `components/ScrollNavbar.tsx`

- [ ] **Step 1: Update imports at the top of the file**

Replace:
```typescript
import { academicsDropdownSections } from "@/data/academics";
import { newsEventsDropdownSections } from "@/data/newsEvents/navigation";
```
With:
```typescript
import { academicsDropdownSections } from "@/data/academics";
import { newsEventsDropdownSections } from "@/data/newsEvents/navigation";
import { beyondAcademicsDropdownSections } from "@/data/beyondAcademics/navigation";
import { admissionsDropdownSections } from "@/data/admissions/navigation";
import { aboutDropdownSections } from "@/data/about/navigation";
```

- [ ] **Step 2: Update `navLinks` array**

Replace the entire `navLinks` constant:
```typescript
const navLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about", hasDropdown: true },
  { title: "Academics", href: "/academics", hasDropdown: true },
  { title: "Beyond Academics", href: "/beyond-academics", hasDropdown: true },
  { title: "Admissions", href: "/admissions", hasDropdown: true },
  { title: "News & Events", href: "/news-events", hasDropdown: true },
  { title: "Contact", href: "#contact" },
];
```

- [ ] **Step 3: Update the `dropdownSections` variable**

Replace:
```typescript
const dropdownSections = link.title === "Academics"
  ? academicsDropdownSections
  : link.title === "News & Events"
  ? newsEventsDropdownSections
  : [];
```
With:
```typescript
const dropdownSections =
  link.title === "Academics"
    ? academicsDropdownSections
    : link.title === "News & Events"
    ? newsEventsDropdownSections
    : link.title === "Beyond Academics"
    ? beyondAcademicsDropdownSections
    : link.title === "Admissions"
    ? admissionsDropdownSections
    : link.title === "About Us"
    ? aboutDropdownSections
    : [];
```

- [ ] **Step 4: Update dropdown positioning**

Replace:
```typescript
className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-border p-6 w-[600px] z-50 ${
  link.title === "News & Events" ? "right-0" : "left-0"
}`}
```
With:
```typescript
className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-border p-6 w-[600px] z-50 ${
  link.title === "News & Events" || link.title === "Admissions"
    ? "right-0"
    : "left-0"
}`}
```

- [ ] **Step 5: Fix the Home link (non-dropdown rendering)**

The current non-dropdown rendering uses `<a onClick={handleNavClick}>` for all non-dropdown links. This breaks Home ("/") because `handleNavClick` calls `e.preventDefault()` then tries `document.querySelector("/")`.

Replace the non-dropdown branch:
```tsx
// FROM:
) : (
  <a
    href={link.href}
    onClick={(e) => handleNavClick(e, link.href)}
    className="text-sm lg:text-base font-inglobal font-medium text-primary hover:text-secondary transition-colors duration-300 cursor-pointer relative group"
  >
    {link.title}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
  </a>
)}

// TO:
) : link.href.startsWith("/") ? (
  <Link
    href={link.href}
    className="text-sm lg:text-base font-inglobal font-medium text-primary hover:text-secondary transition-colors duration-300 cursor-pointer relative group"
  >
    {link.title}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
  </Link>
) : (
  <a
    href={link.href}
    onClick={(e) => handleNavClick(e, link.href)}
    className="text-sm lg:text-base font-inglobal font-medium text-primary hover:text-secondary transition-colors duration-300 cursor-pointer relative group"
  >
    {link.title}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
  </a>
)}
```

- [ ] **Step 6: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add components/ScrollNavbar.tsx data/academics/navigation.ts data/beyondAcademics/navigation.ts data/admissions/navigation.ts data/about/navigation.ts
git commit -m "feat: update navigation - Beyond Academics, Admissions, About Us dropdowns, fix Home link, add Scholarships"
```

---

## Verification Checklist

1. `npm run dev` — dev server starts with no errors
2. On homepage, scroll down → navbar appears → click **Home** text → page navigates to `/` (or stays, no broken behavior)
3. Hover **About Us** → dropdown opens with "Who We Are" and "Our People & Places" sections
4. Hover **Beyond Academics** → dropdown opens with "Sports & Athletics" and "Student Life" sections
5. Hover **Admissions** → dropdown opens with "Getting Started", "The Process", "Details" sections; positioned `right-0` (doesn't overflow viewport)
6. Hover **Academics** → first item reads "Curriculum" (not "Overview"); "Scholarships" appears in "More Information"
7. `npm run build` — no TypeScript or build errors
