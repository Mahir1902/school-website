export interface NavigationItem {
  title: string;
  href: string;
  description: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const newsEventsDropdownSections: NavigationSection[] = [
  {
    title: "News",
    items: [
      {
        title: "Latest News",
        href: "/news-events/news",
        description: "All recent updates and stories"
      },
      {
        title: "Achievements",
        href: "/news-events/news/achievements",
        description: "Student and school achievements"
      }
    ]
  },
  {
    title: "Events",
    items: [
      {
        title: "Upcoming Events",
        href: "/news-events/events/upcoming",
        description: "What's happening soon"
      },
      {
        title: "Past Events",
        href: "/news-events/events/past",
        description: "Event archives and highlights"
      },
      {
        title: "Event Calendar",
        href: "/news-events/events/calendar",
        description: "Full calendar view"
      }
    ]
  },
  {
    title: "More",
    items: [
      {
        title: "Notices",
        href: "/news-events/notices",
        description: "Important notices and alerts"
      },
      {
        title: "Photo Gallery",
        href: "/news-events/gallery",
        description: "School life in pictures"
      },
      {
        title: "Videos",
        href: "/news-events/gallery/videos",
        description: "Video highlights and tours"
      }
    ]
  }
];
