import { NavigationItem, NavigationSection } from "@/types/navigation";

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
