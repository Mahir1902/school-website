import { TimelineStep } from "@/types/academics";

// Edexcel partnership benefits
export const edexcelBenefits = [
  {
    title: "Internationally Recognised",
    description: "Qualifications accepted by universities and employers worldwide",
  },
  {
    title: "Externally Marked",
    description: "Fair and standardized assessment by Pearson Edexcel examiners",
  },
  {
    title: "Certified Results",
    description: "Official certificates recognized globally for further education",
  },
  {
    title: "University Pathway",
    description: "Direct progression to universities in UK, USA, Canada, Australia, and beyond",
  },
];

// Edexcel qualification pathway
export const edexcelPathway: TimelineStep[] = [
  {
    age: "5-11",
    stage: "iPrimary",
    description: "English, Mathematics, Science",
    icon: "Baby",
  },
  {
    age: "11-14",
    stage: "iLower Secondary",
    description: "English, Mathematics, Science",
    icon: "BookOpen",
  },
  {
    age: "14-16",
    stage: "IGCSE",
    description: "37 subjects available",
    icon: "Award",
  },
  {
    age: "16-19",
    stage: "International A-Level",
    description: "21 subjects available",
    icon: "GraduationCap",
  },
];

// Edexcel content
export const edexcelContent = {
  title: "Internationally Recognised Qualifications",
  subtitle: "Approved Pearson Edexcel Centre",
  description: `Singapore International School, Dhaka is an Approved Centre of Pearson Edexcel, UK. This authorizes the school to conduct external examinations including the International Primary and Lower Secondary Curricula and the International General Certificate of Secondary Education (IGCSE).

Our Edexcel partnership ensures our students receive internationally recognized qualifications that open doors to universities and career opportunities worldwide. All examinations are externally marked by Pearson Edexcel, ensuring fair and standardized assessment.`,
};
