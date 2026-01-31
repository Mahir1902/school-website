import { Award, Fee } from "@/types/academics";

// iPrimary program details
export const iPrimaryProgram = {
  name: "Pearson Edexcel iPrimary",
  ageRange: "5-11 years",
  standards: "Standard 2 to Standard 5",
  subjects: ["English", "Mathematics", "Science"],
  examination: "Achievement Test at end of Standard 5",
  marking: "Externally marked by Pearson Edexcel",
  description: "International Primary curriculum building strong foundations in core subjects with globally recognized standards.",
};

// iLower Secondary program details
export const iLowerSecondaryProgram = {
  name: "Pearson Edexcel iLower Secondary",
  ageRange: "11-14 years",
  standards: "Standard 6 to Standard 8",
  subjects: ["English", "Mathematics", "Science"],
  examination: "Achievement Test at end of Standard 8",
  marking: "Externally marked by Pearson Edexcel",
  description: "International Lower Secondary curriculum preparing students for IGCSE with rigorous academic standards.",
};

// iPrimary and iLS rewards
export const iPrimaryRewards: Award = {
  requirement: "Grade P3 in all 3 Primary subjects in one sitting",
  rewards: [
    "Award Crest",
    "Certificate of Achievement",
    "Cash Voucher (Taka 5,000)",
  ],
};

export const iLowerSecondaryRewards: Award = {
  requirement: "Grade S3 or S4 in all 3 Lower Secondary subjects",
  rewards: [
    "Award Crest",
    "Certificate of Achievement",
    "Cash Voucher (Taka 5,000 for Year 1-8)",
  ],
};

// IGCSE program details
export const igcseProgram = {
  name: "International General Certificate of Secondary Education",
  ageRange: "14-16 years",
  standards: "Standard 9-10",
  availableSubjects: 37,
  examinationBoard: "Pearson Edexcel",
  sessions: "January & May/June",
  registration: "Through British Council",
  description: "Internationally recognized qualification preparing students for A-Levels and university entry worldwide.",
};

// IGCSE Awards
export const igcseAwards: Award = {
  requirement: "Grade A (Grade Point 7) or above in 5 consecutive subjects in one sitting",
  rewards: [
    "Award Crest",
    "Certificate of Achievement",
    "Cash Voucher (Taka 5,000 for A-Level registration)",
  ],
};

// A-Level program details
export const aLevelProgram = {
  name: "International Advanced Level",
  ageRange: "16-19 years",
  availableSubjects: 21,
  levels: ["AS Level (Year 1)", "A2 Level (Year 2)"],
  examinationBoard: "Pearson Edexcel & Cambridge",
  description: "The gold standard for university entry, recognized by universities worldwide including UK, USA, Canada, and Australia.",
};

// AS Level Awards
export const asLevelAwards: Award = {
  requirement: "Grade A (Grade Point 6) or above in 3 consecutive subjects in one sitting",
  rewards: [
    "Award Crest",
    "Cash Voucher (Taka 5,000)",
  ],
};

// A2 Level Awards
export const a2LevelAwards: Award = {
  requirement: "Grade A (Grade Point 6) or above in 3 consecutive subjects in one sitting",
  rewards: [
    "Award Crest",
    "Graduation Certificate",
  ],
};

// External candidates services
export const externalCandidatesServices = [
  "Examination registration with Edexcel",
  "Statement of Entry & examination timetable",
  "Pre-release materials distribution",
  "Accessibility arrangements coordination",
  "Results distribution and verification",
  "Certificates, awards, and vouchers for achievers",
];

// External candidates fees
export const externalCandidatesFees: Fee[] = [
  {
    type: "School Registration Fee",
    amount: "BDT 8,000 per session",
    notes: "One-time fee per examination session",
  },
  {
    type: "School Assessment Fee",
    amount: "BDT 2,000 per paper",
    notes: "Charged for each examination paper",
  },
  {
    type: "UK Examination Fee",
    amount: "As per British Council",
    notes: "Variable fee set by Pearson Edexcel",
  },
];

// Required documents for external candidates
export const requiredDocuments = [
  {
    name: "Valid Passport (colour photocopy)",
    required: true,
    copies: 2,
  },
  {
    name: "Email Address",
    required: true,
    notes: "Parent's email if candidate under 18",
  },
  {
    name: "Passport-sized Photographs",
    required: true,
    copies: 4,
  },
  {
    name: "Previous Statement of Entry",
    required: false,
    notes: "If applicable for re-registration",
  },
  {
    name: "Previous Result Sheet/Certificate",
    required: false,
    notes: "If applicable for continuing students",
  },
  {
    name: "Parent's National ID",
    required: true,
    notes: "Required if candidate under 18",
  },
  {
    name: "Completed Registration Form",
    required: true,
    notes: "Available for download",
  },
];

// Registration hours
export const registrationHours = "Weekdays 11:00 AM - 3:00 PM (excluding public holidays)";
