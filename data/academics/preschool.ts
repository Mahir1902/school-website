import { ClassSchedule } from "@/types/academics";
import { Users, GraduationCap, BookOpen, Home, Baby, Heart } from "lucide-react";

// Pre-School key features
export const preschoolFeatures = [
  {
    icon: Users,
    title: "Small Class Size",
    description: "Maximum 20 students per class for individualized attention",
  },
  {
    icon: GraduationCap,
    title: "Qualified Teachers",
    description: "2 trained teachers per class ensuring quality education",
  },
  {
    icon: BookOpen,
    title: "Free Learning Materials",
    description: "All textbooks and educational materials provided at no cost",
  },
  {
    icon: Home,
    title: "Comfortable Environment",
    description: "Air-conditioned classrooms with age-appropriate facilities",
  },
  {
    icon: Baby,
    title: "Dedicated Care",
    description: "Nannies available for younger children's special needs",
  },
  {
    icon: Heart,
    title: "Nurturing Approach",
    description: "Play-based learning with focus on social and emotional development",
  },
];

// Nursery Level schedule
export const nurserySchedule: ClassSchedule[] = [
  {
    class: "Play Group",
    age: "2-3+ years",
    hours: "8:30 AM - 11:00 AM",
    recess: "30 mins",
  },
  {
    class: "Nursery",
    age: "3+-4+ years",
    hours: "8:30 AM - 12:00 PM",
    recess: "30 mins",
  },
];

// Kindergarten Level schedule
export const kindergartenSchedule: ClassSchedule[] = [
  {
    class: "KG-1",
    age: "4+-5+ years",
    hours: "8:30 AM - 1:00 PM",
    recess: "30 mins",
  },
  {
    class: "KG-2",
    age: "5+-6+ years",
    hours: "8:30 AM - 1:00 PM",
    recess: "30 mins",
  },
];

// Learning focus for Nursery
export const nurseryLearningFocus = [
  "English language foundation and vocabulary building",
  "Numeric numbers recognition and basic counting",
  "Nursery rhymes and songs for language development",
  "Phonics introduction for reading readiness",
  "Listening skills and following instructions",
  "Reading comprehension through stories",
  "Art & craft for fine motor skills",
  "Audio-visual activities for engagement",
  "Self-discipline and classroom routines (from Nursery)",
];

// Learning focus for Kindergarten
export const kindergartenLearningFocus = [
  "Reading and spelling 2-4 syllable words",
  "Writing sentences, paragraphs, and simple stories",
  "Book reviews and creative writing",
  "Poetry reading and composition",
  "Bengali language characters (KG-2)",
  "Arabic language introduction",
  "Months and days in Bengali & English",
  "Addition, subtraction, and introduction to multiplication",
  "Time management and daily routines",
  "Advanced coloring and creative expression",
];

// Pre-School content
export const preschoolContent = {
  title: "Where Learning Begins",
  subtitle: "Ages 2-6: A Foundation for Lifelong Learning",
  description: `Our pre-school program provides a warm, nurturing environment where young learners develop essential skills through play-based learning, creative exploration, and social interaction.

With small class sizes, experienced teachers, and age-appropriate facilities, we ensure each child receives the individual attention they need to thrive. Our curriculum focuses on building strong foundations in language, numeracy, and social-emotional development.`,
};
