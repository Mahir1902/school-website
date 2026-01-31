import { Stat, TimelineStep, ProgrammeCard } from "@/types/academics";
import { GraduationCap, Users, Calendar, Award } from "lucide-react";

// Stats for overview page
export const academicStats: Stat[] = [
  {
    value: 4,
    label: "Levels of Education",
    icon: GraduationCap,
  },
  {
    value: "Edexcel",
    label: "Approved Centre",
    icon: Award,
  },
  {
    value: 20,
    suffix: " max",
    label: "Students Per Class",
    icon: Users,
  },
  {
    value: 30,
    suffix: "+",
    label: "Years Established",
    icon: Calendar,
  },
];

// Academic pathway timeline
export const academicPathway: TimelineStep[] = [
  {
    age: "2-6",
    stage: "Pre-School",
    description: "Play Group, Nursery & Kindergarten",
    icon: "Baby",
  },
  {
    age: "6-12",
    stage: "Primary",
    description: "Standards 1-6 with iPrimary",
    icon: "BookOpen",
  },
  {
    age: "12-16",
    stage: "Secondary",
    description: "Standards 7-10 with IGCSE",
    icon: "Users",
  },
  {
    age: "16-19",
    stage: "A-Levels",
    description: "AS & A2 Level Programs",
    icon: "GraduationCap",
  },
];

// Programme cards for overview
export const programmeCards: ProgrammeCard[] = [
  {
    id: "pre-school",
    title: "Pre-School Program",
    subtitle: "Ages 2-6",
    description: "Our pre-school program provides a nurturing environment where young learners develop foundational skills through play-based learning and creative exploration.",
    highlights: [
      "Maximum 20 students per class",
      "2 qualified teachers per class",
      "Free textbooks and materials",
      "Air-conditioned classrooms",
      "Dedicated nannies for younger children",
    ],
    href: "/academics/pre-school",
  },
  {
    id: "primary",
    title: "Primary School",
    subtitle: "Ages 6-12",
    description: "Building knowledge, character, and confidence through a comprehensive curriculum that develops critical thinking and academic excellence.",
    highlights: [
      "Individual subject teachers",
      "Full-time co-teacher assistance",
      "International Primary curriculum",
      "iPrimary examinations at Standard 5",
      "Computer education from Standard 1",
    ],
    href: "/academics/primary",
  },
  {
    id: "secondary",
    title: "Secondary School",
    subtitle: "Ages 12-16",
    description: "Preparing students for global success with internationally recognized IGCSE qualifications and university pathway preparation.",
    highlights: [
      "Specialist subject teachers",
      "IGCSE preparation from Standard 9",
      "Choice of 37 subjects",
      "Science labs and computer facilities",
      "University counseling support",
    ],
    href: "/academics/secondary",
  },
];

// Overview content
export const overviewContent = {
  title: "Excellence Through Holistic Education",
  subtitle: "A comprehensive academic journey from early childhood to university preparation",
  description: `At Singapore International School, we provide a structured academic pathway from Early Childhood Education through to internationally recognised O-Level and A-Level qualifications.

As an approved Pearson Edexcel centre, our curriculum combines rigorous academic standards with hands-on, inquiry-based learning. We focus on the individual learner at every grade level, nurturing curiosity, critical thinking, and a lifelong love of learning.

Our goal is to provide students with all essential elements in the learning process through a hands-on, inquiry-based, learning through discovery philosophy. Students accept the challenges of open-ended problem-solving activities, effective communication, leadership, understanding and responsibility.`,
};
