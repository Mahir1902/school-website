import { NavigationSection } from "@/types/navigation";
import { academicsDropdownSections } from "@/data/academics";
import { newsEventsDropdownSections } from "@/data/newsEvents/navigation";
import { beyondAcademicsDropdownSections } from "@/data/beyondAcademics/navigation";
import { admissionsDropdownSections } from "@/data/admissions/navigation";
import { aboutDropdownSections } from "@/data/about/navigation";

// Single source of truth for site navigation — consumed by both the desktop bar
// (ScrollNavbar) and the shared mobile drawer (MobileNavDrawer). See docs/adr/0001.
export interface NavItem {
  title: string;
  href: string;
  sections?: NavigationSection[];
  dropdownAlign?: "left" | "right";
}

export const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about", sections: aboutDropdownSections },
  { title: "Academics", href: "/academics", sections: academicsDropdownSections },
  {
    title: "Beyond Academics",
    href: "/beyond-academics",
    sections: beyondAcademicsDropdownSections,
  },
  {
    title: "Admissions",
    href: "/admissions",
    sections: admissionsDropdownSections,
    dropdownAlign: "right",
  },
  {
    title: "News & Events",
    href: "/news-events",
    sections: newsEventsDropdownSections,
    dropdownAlign: "right",
  },
  { title: "Contact", href: "/#contact" },
];
