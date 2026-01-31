import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import DataTable from "@/components/academics/DataTable";
import SubjectAccordion from "@/components/academics/SubjectAccordion";
import { SubjectCategoryData } from "@/components/academics/SubjectGrid";
import InfoCard from "@/components/academics/InfoCard";
import CTAButton from "@/components/academics/CTAButton";
import {
  aLevelProgram,
  asLevelAwards,
  a2LevelAwards,
} from "@/data/academics/programs";
import hero1 from "@/assets/hero-1.jpg";
import awardsImage from "@/assets/BC_Awards.jpg";
import graduationImage from "@/assets/events_and_celebrations.jpg";
import { Award, FileCheck, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "A-Level Programme (Ages 16-19)",
  description: aLevelProgram.description,
};

// A-Level subjects organized by category
const aLevelSubjects: SubjectCategoryData[] = [
  {
    category: "Sciences",
    subjects: [
      { name: "Biology", description: "Advanced life sciences" },
      { name: "Chemistry", description: "Advanced chemical sciences" },
      { name: "Physics", description: "Advanced physical sciences" },
    ],
  },
  {
    category: "Mathematics",
    subjects: [
      { name: "Pure Mathematics", description: "Core mathematical concepts" },
      { name: "Further Mathematics", description: "Advanced mathematics" },
    ],
  },
  {
    category: "Humanities & Social Sciences",
    subjects: [
      { name: "History", description: "In-depth historical study" },
      { name: "Geography", description: "Advanced geographical concepts" },
      { name: "Economics", description: "Economic theory & analysis" },
      { name: "Sociology", description: "Social theory & research" },
      { name: "Psychology", description: "Human behavior & cognition" },
    ],
  },
  {
    category: "Languages",
    subjects: [
      { name: "English Language", description: "Advanced communication" },
      { name: "English Literature", description: "Literary criticism" },
      { name: "Bengali" },
    ],
  },
  {
    category: "Business & Accounting",
    subjects: [
      { name: "Accounting", description: "Financial accounting" },
      { name: "Business", description: "Business management" },
    ],
  },
  {
    category: "Computer Science & IT",
    subjects: [
      { name: "Computer Science", description: "Programming & algorithms" },
      { name: "Information Technology" },
    ],
  },
  {
    category: "Creative Arts",
    subjects: [
      { name: "Art & Design", description: "Advanced visual arts" },
      { name: "Music" },
      { name: "Design & Technology" },
    ],
  },
];

export default function ALevelsPage() {
  // A-Level program details table
  const aLevelDetails = [
    { label: "Age Range", value: aLevelProgram.ageRange },
    { label: "Available Subjects", value: `${aLevelProgram.availableSubjects} subjects` },
    { label: "Programme Structure", value: aLevelProgram.levels.join(" + ") },
    { label: "Examination Boards", value: aLevelProgram.examinationBoard },
    { label: "Recognition", value: "UK, USA, Canada, Australia, and worldwide" },
  ];

  const detailsColumns = [
    { key: "label", header: "Detail" },
    { key: "value", header: "Information" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title="The Gold Standard for University Entry"
        subtitle="International Advanced Level"
        backgroundImage={hero1}
        height="medium"
      />

      {/* Overview */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed">
            {aLevelProgram.description}
          </p>
        </div>
      </section>

      {/* Programme Details */}
      <section>
        <SectionHeading>A-Level Programme Details</SectionHeading>

        <DataTable
          columns={detailsColumns}
          data={aLevelDetails}
          caption="Key Information"
          className="mt-8"
        />
      </section>

      {/* Programme Structure */}
      <section>
        <SectionHeading>Two-Year Programme Structure</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-poppins font-bold text-xl">1</span>
              </div>
              <h3 className="text-2xl font-orpheus text-primary">
                AS Level (Year 1)
              </h3>
            </div>
            <ul className="space-y-3 text-foreground/70 font-proximaNova">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Select 3-4 subjects based on university goals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Complete AS Level examinations at end of Year 1</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>AS qualifications stand alone or contribute to full A-Level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Opportunity to refine subject choices for Year 2</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-poppins font-bold text-xl">2</span>
              </div>
              <h3 className="text-2xl font-orpheus text-primary">
                A2 Level (Year 2)
              </h3>
            </div>
            <ul className="space-y-3 text-foreground/70 font-proximaNova">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Continue with 3 subjects for full A-Level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Complete A2 examinations at end of Year 2</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Combined AS + A2 results form complete A-Level grade</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Apply to universities with A-Level predictions and results</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Available Subjects */}
      <section>
        <SectionHeading>21 Available Subjects</SectionHeading>

        <div className="bg-primary/5 rounded-lg p-6 mb-6">
          <p className="text-foreground/70 font-proximaNova">
            Students typically select 3-4 subjects for AS Level and continue with
            3 subjects for full A-Level. Click on each category below to explore
            available subjects and plan your pathway to university success.
          </p>
        </div>

        <SubjectAccordion categories={aLevelSubjects} defaultOpenIndex={0} />
      </section>

      {/* Achievement Awards - AS Level */}
      <section>
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <Image
                src={awardsImage}
                alt="AS Level Achievement Awards"
                fill
                className="object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <h3 className="text-3xl font-orpheus text-primary mb-4">
                  AS Level Achievement Awards
                </h3>
                <p className="text-foreground/70 font-proximaNova mb-6">
                  <strong>Requirement:</strong> {asLevelAwards.requirement}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-orpheus text-primary mb-1">Award Crest</h4>
                      <p className="text-sm text-foreground/70 font-proximaNova">
                        Recognition of AS Level excellence
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-orpheus text-primary mb-1">Cash Voucher</h4>
                      <p className="text-sm text-foreground/70 font-proximaNova">
                        BDT 5,000 reward
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Awards - A2 Level */}
      <section>
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Content Side */}
            <div className="p-8 md:p-12 flex items-center order-2 lg:order-1">
              <div>
                <h3 className="text-3xl font-orpheus text-primary mb-4">
                  A2 Level Achievement Awards
                </h3>
                <p className="text-foreground/70 font-proximaNova mb-6">
                  <strong>Requirement:</strong> {a2LevelAwards.requirement}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-orpheus text-primary mb-1">Award Crest</h4>
                      <p className="text-sm text-foreground/70 font-proximaNova">
                        Recognition of A-Level excellence
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-orpheus text-primary mb-1">Graduation Certificate</h4>
                      <p className="text-sm text-foreground/70 font-proximaNova">
                        School graduation recognition
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative h-64 lg:h-auto min-h-[400px] order-1 lg:order-2">
              <Image
                src={graduationImage}
                alt="A2 Level Achievement & Graduation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* University Pathways */}
      <section>
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-orpheus text-primary mb-6 text-center">
            University Pathways with A-Levels
          </h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-foreground/70 font-proximaNova mb-6">
              A-Level qualifications are the gold standard for university entry
              and are accepted by:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-orpheus text-primary mb-2">United Kingdom</h4>
                <p className="text-sm text-foreground/70 font-proximaNova">
                  Oxford, Cambridge, Imperial College, LSE, and all UK
                  universities
                </p>
              </div>
              <div>
                <h4 className="font-orpheus text-primary mb-2">United States</h4>
                <p className="text-sm text-foreground/70 font-proximaNova">
                  Ivy League and top US universities with advanced standing credit
                </p>
              </div>
              <div>
                <h4 className="font-orpheus text-primary mb-2">Canada</h4>
                <p className="text-sm text-foreground/70 font-proximaNova">
                  University of Toronto, UBC, McGill, and all Canadian
                  universities
                </p>
              </div>
              <div>
                <h4 className="font-orpheus text-primary mb-2">Australia</h4>
                <p className="text-sm text-foreground/70 font-proximaNova">
                  Australian National University, University of Melbourne, and all
                  Australian universities
                </p>
              </div>
            </div>
            <div className="text-center pt-4">
              <p className="text-foreground/70 font-proximaNova mb-4">
                <strong>University Counseling:</strong> We provide personalized
                guidance for university applications, personal statements, and
                scholarship opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-primary/5 rounded-lg p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-orpheus text-primary mb-4">
          Begin Your Journey to Top Universities
        </h2>
        <p className="text-foreground/70 font-proximaNova mb-6 max-w-2xl mx-auto">
          Our A-Level programme opens doors to the world's best universities.
          Start your path to academic and career success today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="/#admissions" size="lg">
            Apply for A-Levels
          </CTAButton>
          <CTAButton href="/#contact" variant="outline" size="lg">
            Schedule Counseling
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
