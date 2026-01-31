import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";

// Age range data structure
export interface AgeRange {
  min: number;
  max: number;
  display: string; // e.g., "2-6 years"
}

// Program structure
export interface AcademicProgram {
  id: string;
  name: string;
  ageRange: AgeRange;
  description: string;
  highlights: string[];
  curriculum?: string[];
  facilities?: string[];
}

// Subject categories
export type SubjectCategory =
  | "Sciences"
  | "Humanities"
  | "Languages"
  | "Arts"
  | "Mathematics"
  | "Technology"
  | "Religious Studies"
  | "Health & PE";

// Programme levels
export type ProgrammeLevel =
  | "preschool"
  | "primary"
  | "secondary"
  | "igcse"
  | "a-levels";

// Subject structure
export interface Subject {
  name: string;
  description: string;
  category: SubjectCategory;
  availableAt: ProgrammeLevel[];
}

// Teaching methodology structure
export interface TeachingMethodology {
  name: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
}

// Assessment types
export type AssessmentType = "CPA" | "CA";

// Assessment structure
export interface AssessmentPolicy {
  type: AssessmentType;
  description: string;
  frequency: string;
  components: {
    name: string;
    weight?: number; // percentage
  }[];
}

// Navigation structure
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

// Table column structure
export interface TableColumn {
  header: string;
  accessor: string;
  width?: string;
}

// Timeline step structure
export interface TimelineStep {
  age: string;
  stage: string;
  description: string;
  icon: LucideIcon | string; // Support both for flexibility
}

// Calendar event types
export type CalendarEventType = "holiday" | "results_day" | "exam" | "event";

// Calendar event structure (for Sanity integration)
export interface CalendarEvent {
  _id: string;
  title: string;
  eventType: CalendarEventType;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string, optional for multi-day events
  description?: string;
  category?: string;
}

// Class schedule structure
export interface ClassSchedule {
  class: string;
  age: string;
  hours: string;
  recess?: string;
}

// Stats data structure
export interface Stat {
  value: string | number;
  suffix?: string;
  label: string;
  icon?: LucideIcon;
}

// Programme card structure
export interface ProgrammeCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image?: StaticImageData;
  highlights: string[];
  href: string;
}

// Awards and requirements structure
export interface Award {
  requirement: string;
  rewards: string[];
  amount?: string;
}

// Fee structure
export interface Fee {
  type: string;
  amount: string;
  notes?: string;
}

// Document requirement structure
export interface DocumentRequirement {
  name: string;
  required: boolean;
  copies?: number;
  notes?: string;
}
