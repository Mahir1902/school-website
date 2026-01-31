import { ClassSchedule } from "@/types/academics";

// Lower Primary schedule
export const lowerPrimarySchedule: ClassSchedule[] = [
  {
    class: "Standard 1",
    age: "6-7 years",
    hours: "8:30 AM - 1:20 PM",
  },
  {
    class: "Standard 2",
    age: "7-8 years",
    hours: "8:30 AM - 1:20 PM",
  },
  {
    class: "Standard 3",
    age: "8-9 years",
    hours: "8:30 AM - 2:00 PM",
  },
];

// Upper Primary schedule
export const upperPrimarySchedule: ClassSchedule[] = [
  {
    class: "Standard 4",
    age: "9-10 years",
    hours: "8:30 AM - 2:00 PM",
  },
  {
    class: "Standard 5",
    age: "10-11 years",
    hours: "8:30 AM - 2:00 PM",
  },
  {
    class: "Standard 6",
    age: "11-12 years",
    hours: "8:30 AM - 2:00 PM",
  },
];

// Subjects offered in Primary
export const primarySubjects = [
  "English (Language & Literature)",
  "Bengali",
  "Mathematics",
  "Science",
  "Arabic & Islamic Studies",
  "Computing (from Standard 1)",
  "Geography",
  "History",
  "Art & Crafts",
  "Music",
  "Health Education",
  "Social Studies",
];

// Skills development areas
export const primarySkills = [
  {
    title: "Academic Excellence",
    description: "Strong foundation in core subjects with inquiry-based learning",
  },
  {
    title: "Critical Thinking",
    description: "Problem-solving and analytical skills development",
  },
  {
    title: "Communication",
    description: "Effective written and oral communication in English",
  },
  {
    title: "Digital Literacy",
    description: "Computer education integrated from Standard 1",
  },
  {
    title: "Creative Expression",
    description: "Arts, music, and creative project work",
  },
  {
    title: "Social Skills",
    description: "Teamwork, leadership, and responsible citizenship",
  },
];

// Primary content
export const primaryContent = {
  title: "Building Knowledge, Character & Confidence",
  subtitle: "Ages 6-12: Foundation Years",
  description: `Our Primary School program provides a comprehensive education that builds strong foundations in core academic subjects while developing critical thinking, creativity, and character.

Lower Primary (Standards 1-3) features individual subject teachers with full-time co-teacher assistance, ensuring personalized support for each student. Upper Primary (Standards 4-6) transitions to specialist teachers for each subject, preparing students for secondary education.

Students in Standard 5 take the Pearson Edexcel iPrimary examinations, earning internationally recognized qualifications.`,
  teachingApproach: {
    lowerPrimary: "Individual subject teachers with full-time co-teacher assistance for personalized learning support.",
    upperPrimary: "Single subject handled by specialist teacher for deeper subject expertise and preparation for secondary education.",
  },
};
