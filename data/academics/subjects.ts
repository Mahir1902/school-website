import { Subject } from "@/types/academics";

// All subjects offered across programs
export const allSubjects: Subject[] = [
  // Languages
  {
    name: "English Language & Literature",
    description: "Comprehensive English language and literature studies",
    category: "Languages",
    availableAt: ["preschool", "primary", "secondary", "igcse", "a-levels"],
  },
  {
    name: "Bengali Language & Literature",
    description: "Native language proficiency and literature",
    category: "Languages",
    availableAt: ["preschool", "primary", "secondary", "igcse"],
  },
  {
    name: "Arabic",
    description: "Arabic language and script",
    category: "Languages",
    availableAt: ["preschool", "primary", "secondary"],
  },
  {
    name: "Urdu (Optional)",
    description: "Optional Urdu language instruction",
    category: "Languages",
    availableAt: ["primary", "secondary"],
  },
  {
    name: "Hindi (Optional)",
    description: "Optional Hindi language instruction",
    category: "Languages",
    availableAt: ["primary", "secondary"],
  },

  // Mathematics & Sciences
  {
    name: "Mathematics",
    description: "Core mathematical concepts and problem-solving",
    category: "Mathematics",
    availableAt: ["preschool", "primary", "secondary", "igcse", "a-levels"],
  },
  {
    name: "General Science",
    description: "Introduction to scientific concepts",
    category: "Sciences",
    availableAt: ["preschool", "primary"],
  },
  {
    name: "Physics",
    description: "Physical science and mechanics",
    category: "Sciences",
    availableAt: ["secondary", "igcse", "a-levels"],
  },
  {
    name: "Chemistry",
    description: "Chemical science and laboratory work",
    category: "Sciences",
    availableAt: ["secondary", "igcse", "a-levels"],
  },
  {
    name: "Biology",
    description: "Life sciences and biological systems",
    category: "Sciences",
    availableAt: ["secondary", "igcse", "a-levels"],
  },

  // Humanities
  {
    name: "History",
    description: "World and regional history",
    category: "Humanities",
    availableAt: ["primary", "secondary", "igcse", "a-levels"],
  },
  {
    name: "Geography",
    description: "Physical and human geography",
    category: "Humanities",
    availableAt: ["primary", "secondary", "igcse", "a-levels"],
  },
  {
    name: "Social Studies",
    description: "Society, culture, and citizenship",
    category: "Humanities",
    availableAt: ["primary", "secondary"],
  },
  {
    name: "Civics & Moral Education",
    description: "Ethics, values, and responsible citizenship",
    category: "Humanities",
    availableAt: ["secondary"],
  },

  // Religious Studies
  {
    name: "Islamic Studies",
    description: "Islamic education and values",
    category: "Religious Studies",
    availableAt: ["preschool", "primary", "secondary"],
  },
  {
    name: "Quranic Studies",
    description: "Quranic recitation and understanding",
    category: "Religious Studies",
    availableAt: ["preschool", "primary", "secondary"],
  },

  // Technology
  {
    name: "Computer Education",
    description: "Computing skills from Standard 1",
    category: "Technology",
    availableAt: ["primary", "secondary", "igcse"],
  },
  {
    name: "Design & Technology",
    description: "Design thinking and technical skills",
    category: "Technology",
    availableAt: ["secondary", "igcse"],
  },

  // Creative Arts
  {
    name: "Art & Crafts",
    description: "Visual arts and creative expression",
    category: "Arts",
    availableAt: ["preschool", "primary"],
  },
  {
    name: "Visual Arts",
    description: "Advanced visual arts and design",
    category: "Arts",
    availableAt: ["secondary", "igcse", "a-levels"],
  },
  {
    name: "Music",
    description: "Music theory and performance",
    category: "Arts",
    availableAt: ["preschool", "primary", "secondary"],
  },
  {
    name: "Drama",
    description: "Dramatic arts and performance",
    category: "Arts",
    availableAt: ["secondary"],
  },

  // Health & PE
  {
    name: "Health Education",
    description: "Health, wellness, and nutrition",
    category: "Health & PE",
    availableAt: ["primary"],
  },
  {
    name: "Physical Education",
    description: "Sports, fitness, and physical development",
    category: "Health & PE",
    availableAt: ["primary", "secondary"],
  },
  {
    name: "Accounting",
    description: "Financial accounting and business studies",
    category: "Mathematics",
    availableAt: ["secondary", "igcse", "a-levels"],
  },
];

// English language policy
export const englishLanguagePolicy = `We are an English medium school committed to providing every opportunity to instruct and interact using the English language. All classes are conducted in English except for other language classes such as Bengali, Arabic, Urdu, and Hindi.

This immersive English environment ensures our students develop strong language proficiency that prepares them for international examinations and global opportunities.`;

// Group subjects by category
export const subjectsByCategory = {
  "Languages": allSubjects.filter(s => s.category === "Languages"),
  "Mathematics & Sciences": allSubjects.filter(s => s.category === "Mathematics" || s.category === "Sciences"),
  "Humanities": allSubjects.filter(s => s.category === "Humanities"),
  "Religious Studies": allSubjects.filter(s => s.category === "Religious Studies"),
  "Technology": allSubjects.filter(s => s.category === "Technology"),
  "Creative Arts": allSubjects.filter(s => s.category === "Arts"),
  "Health & PE": allSubjects.filter(s => s.category === "Health & PE"),
};
