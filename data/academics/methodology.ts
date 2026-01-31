import { TeachingMethodology } from "@/types/academics";
import { Users, UserCheck, Volume2, FlaskConical, Trophy, ClipboardCheck, Globe } from "lucide-react";

// 7 Teaching Methodologies
export const teachingMethodologies: TeachingMethodology[] = [
  {
    name: "Small Class Sizes",
    description: "Maximum 20 students per class ensures individual attention and personalized learning support for every student.",
    icon: Users,
    benefits: [
      "Personalized attention for each student",
      "Better teacher-student relationships",
      "More opportunities for participation",
      "Tailored instruction to individual needs",
    ],
  },
  {
    name: "Dual Teacher System",
    description: "Class teacher supported by co-teacher in pre-school, with student attendants available on each floor for immediate assistance.",
    icon: UserCheck,
    benefits: [
      "Enhanced supervision and safety",
      "Individualized learning support",
      "Better classroom management",
      "Immediate response to student needs",
    ],
  },
  {
    name: "Audio-Visual Learning",
    description: "Listening comprehension, phonics programs, and educational multimedia enhance engagement and understanding.",
    icon: Volume2,
    benefits: [
      "Multi-sensory learning experiences",
      "Enhanced engagement and retention",
      "Accommodation of different learning styles",
      "Modern educational technology integration",
    ],
  },
  {
    name: "Practical Application",
    description: "Science labs, computer labs from Class 1, art projects, and educational study tours provide hands-on learning experiences.",
    icon: FlaskConical,
    benefits: [
      "Theory applied to real-world contexts",
      "Development of practical skills",
      "Enhanced understanding through experience",
      "Preparation for higher education and careers",
    ],
  },
  {
    name: "Co-Curricular Integration",
    description: "Debate competitions, STEM Expo, Robotics Club, and extensive reading programs complement academic learning.",
    icon: Trophy,
    benefits: [
      "Holistic skill development",
      "Leadership and teamwork skills",
      "Creative and critical thinking",
      "Competitive and collaborative experiences",
    ],
  },
  {
    name: "Continuous Assessment",
    description: "Class Performance Assessments (CPA) and Continual Assessments (CA) every 4-5 weeks with oral and practical components.",
    icon: ClipboardCheck,
    benefits: [
      "Regular progress monitoring",
      "Early identification of learning gaps",
      "Reduced exam pressure through continuous evaluation",
      "Comprehensive assessment of all skills",
    ],
  },
  {
    name: "English Immersion",
    description: "English medium instruction with conversational English encouraged throughout campus for language proficiency.",
    icon: Globe,
    benefits: [
      "Strong English language foundation",
      "Preparation for international exams",
      "Enhanced communication skills",
      "Global opportunities and university readiness",
    ],
  },
];

// Teaching philosophy
export const teachingPhilosophy = {
  quote: "Our students pursue excellence through a hands-on, inquiry-based, learning through discovery philosophy.",
  description: `Students accept the challenges of open-ended problem-solving activities, effective communication, leadership, understanding and responsibility.

We believe in nurturing curiosity, critical thinking, and a lifelong love of learning through methods that engage students actively in their education. Our approach combines rigorous academic standards with practical application and creative exploration.`,
};
