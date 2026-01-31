import { NavItem } from "@/types/academics";
import {
  GraduationCap,
  Baby,
  BookOpen,
  Users,
  BookMarked,
  Lightbulb,
  Award,
  FileCheck,
  ClipboardList,
  Calendar,
  BarChart3,
} from "lucide-react";

// Navigation structure for academics section
export const academicsNavItems: NavItem[] = [
  {
    title: "Overview",
    href: "/academics",
    description: "Explore our comprehensive academic programs",
    icon: GraduationCap,
  },
  {
    title: "Pre-School",
    href: "/academics/pre-school",
    description: "Ages 2-6: Play Group, Nursery & Kindergarten",
    icon: Baby,
  },
  {
    title: "Primary",
    href: "/academics/primary",
    description: "Ages 6-12: Standards 1-6",
    icon: BookOpen,
  },
  {
    title: "Secondary",
    href: "/academics/secondary",
    description: "Ages 12-16: Standards 7-10 & IGCSE",
    icon: Users,
  },
  {
    title: "Subjects",
    href: "/academics/subjects",
    description: "Our comprehensive curriculum",
    icon: BookMarked,
  },
  {
    title: "Methodology",
    href: "/academics/methodology",
    description: "Our teaching approach",
    icon: Lightbulb,
  },
  {
    title: "Edexcel Partnership",
    href: "/academics/edexcel",
    description: "International qualifications",
    icon: Award,
  },
  {
    title: "iPrimary & iLS",
    href: "/academics/iprimary-ils",
    description: "International Primary & Lower Secondary",
    icon: FileCheck,
  },
  {
    title: "IGCSE",
    href: "/academics/igcse",
    description: "International GCSE program",
    icon: Award,
  },
  {
    title: "A-Levels",
    href: "/academics/a-levels",
    description: "Advanced Level program",
    icon: GraduationCap,
  },
  {
    title: "External Candidates",
    href: "/academics/external-candidates",
    description: "Examination registration",
    icon: ClipboardList,
  },
  {
    title: "Assessment",
    href: "/academics/assessment",
    description: "CPA & CA system",
    icon: FileCheck,
  },
  {
    title: "Calendar",
    href: "/academics/calendar",
    description: "Academic year calendar",
    icon: Calendar,
  },
  {
    title: "Results",
    href: "/academics/results",
    description: "View examination results",
    icon: BarChart3,
  },
];

// Dropdown navigation items for ScrollNavbar (desktop only)
export const academicsDropdownSections = [
  {
    title: "Academic Programmes",
    items: [
      {
        title: "Overview",
        href: "/academics",
        description: "Our academic philosophy",
      },
      {
        title: "Pre-School (Ages 2-6)",
        href: "/academics/pre-school",
        description: "Early childhood education",
      },
      {
        title: "Primary (Ages 6-12)",
        href: "/academics/primary",
        description: "Foundation years",
      },
      {
        title: "Secondary (Ages 12-16)",
        href: "/academics/secondary",
        description: "IGCSE preparation",
      },
    ],
  },
  {
    title: "International Qualifications",
    items: [
      {
        title: "Edexcel Partnership",
        href: "/academics/edexcel",
        description: "Globally recognized",
      },
      {
        title: "iPrimary & iLS",
        href: "/academics/iprimary-ils",
        description: "International standards",
      },
      {
        title: "IGCSE",
        href: "/academics/igcse",
        description: "Ages 14-16",
      },
      {
        title: "A-Levels",
        href: "/academics/a-levels",
        description: "University preparation",
      },
    ],
  },
  {
    title: "More Information",
    items: [
      {
        title: "Subjects Offered",
        href: "/academics/subjects",
        description: "Our curriculum",
      },
      {
        title: "Teaching Methodology",
        href: "/academics/methodology",
        description: "How we teach",
      },
      {
        title: "Assessment System",
        href: "/academics/assessment",
        description: "CPA & CA evaluations",
      },
      {
        title: "Academic Calendar",
        href: "/academics/calendar",
        description: "Important dates",
      },
    ],
  },
];
