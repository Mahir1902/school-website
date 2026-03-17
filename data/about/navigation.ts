import { NavigationItem, NavigationSection } from "@/types/navigation";

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
