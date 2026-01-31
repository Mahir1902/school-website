import { AssessmentPolicy } from "@/types/academics";

// Class Performance Assessments (CPA)
export const cpaSystem: AssessmentPolicy = {
  type: "CPA",
  description: "Class Performance Assessments evaluate daily classroom performance and understanding through continuous observation and evaluation.",
  frequency: "Continuous throughout the term",
  components: [
    { name: "Classwork", weight: 20 },
    { name: "Homework", weight: 20 },
    { name: "Surprise Tests", weight: 20 },
    { name: "Oral Assessments", weight: 20 },
    { name: "Practical Assessments", weight: 20 },
  ],
};

// Continual Assessments (CA)
export const caSystem: AssessmentPolicy = {
  type: "CA",
  description: "Continual Assessments are formal evaluations conducted every 4-5 weeks to measure knowledge acquisition and skill development.",
  frequency: "3 CAs per subject per semester (every 4-5 weeks)",
  components: [
    { name: "Class Tests" },
    { name: "Oral Examinations" },
    { name: "Debate & Presentations" },
    { name: "Listening Comprehension" },
    { name: "Case Studies & Projects" },
    { name: "Physical Activities (for PE)" },
  ],
};

// Semester breakdown
export const semesterStructure = [
  {
    semester: "First Semester",
    duration: "January - May",
    assessments: "3 CAs + CPA",
    examinations: "Mid-year examinations",
  },
  {
    semester: "Second Semester",
    duration: "June - December",
    assessments: "3 CAs + CPA",
    examinations: "Final examinations",
  },
];

// Assessment policies
export const assessmentPolicies = [
  {
    title: "Standard Assessment Fee",
    description: "All registered pupils take assessments without additional fee as part of standard tuition.",
  },
  {
    title: "Missed Assessment Policy",
    description: "Students who miss assessments must pay a fee to retake. Valid medical certificates may be considered for exemption.",
  },
  {
    title: "No Retakes for Grade Improvement",
    description: "Retakes are only allowed for missed assessments, not for improving existing grades.",
  },
  {
    title: "CCA/ECA Assessment Weight",
    description: "100% of marks from Co-Curricular Activities (CCA) and Extra-Curricular Activities (ECA) count towards final assessment.",
  },
  {
    title: "Continuous Progress Monitoring",
    description: "Parents receive regular reports on student progress through CA and CPA results throughout the academic year.",
  },
];

// Assessment content
export const assessmentContent = {
  title: "Measuring Progress, Celebrating Growth",
  subtitle: "Comprehensive Assessment System",
  description: `Our assessment system combines Class Performance Assessments (CPA) and Continual Assessments (CA) to provide a comprehensive evaluation of student progress.

This approach reduces exam pressure while ensuring thorough assessment of knowledge, skills, and understanding. Regular feedback helps students identify strengths and areas for improvement, supporting continuous academic growth.`,
};
