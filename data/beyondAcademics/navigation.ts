import { NavigationItem, NavigationSection } from "@/types/navigation";

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
