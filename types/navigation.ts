export interface NavigationItem {
  title: string;
  href: string;
  description: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}
