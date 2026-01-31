import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import DataTable from "@/components/academics/DataTable";
import SubjectGrid, { SubjectCategoryData } from "@/components/academics/SubjectGrid";
import InfoCard from "@/components/academics/InfoCard";
import CTAButton from "@/components/academics/CTAButton";
import { igcseProgram, igcseAwards } from "@/data/academics/programs";
import hero6 from "@/assets/hero-6.jpg";
import awardsImage from "@/assets/BC_Awards.jpg";
import { Award, FileCheck, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "IGCSE Programme (Ages 14-16)",
  description: igcseProgram.description,
};

// IGCSE subjects organized by category
const igcseSubjects: SubjectCategoryData[] = [
  {
    category: "Languages",
    subjects: [
      { name: "English Language", description: "Core communication skills" },
      { name: "English Literature", description: "Literary analysis" },
      { name: "Bengali First Language" },
      { name: "Arabic First Language" },
      { name: "Urdu First Language" },
      { name: "Hindi First Language" },
    ],
  },
  {
    category: "Mathematics & Computer Science",
    subjects: [
      { name: "Mathematics A", description: "Standard mathematics" },
      { name: "Mathematics B", description: "Advanced mathematics" },
      { name: "Further Pure Mathematics" },
      { name: "Computer Science" },
      { name: "Information & Communication Technology" },
    ],
  },
  {
    category: "Sciences",
    subjects: [
      { name: "Biology", description: "Life sciences" },
      { name: "Chemistry", description: "Chemical sciences" },
      { name: "Physics", description: "Physical sciences" },
      { name: "Human Biology" },
      { name: "Science (Double Award)" },
    ],
  },
  {
    category: "Humanities & Social Sciences",
    subjects: [
      { name: "History", description: "World history" },
      { name: "Geography", description: "Physical & human geography" },
      { name: "Economics", description: "Economic principles" },
      { name: "Business Studies" },
      { name: "Sociology" },
      { name: "Global Citizenship" },
    ],
  },
  {
    category: "Business & Accounting",
    subjects: [
      { name: "Accounting", description: "Financial accounting" },
      { name: "Business", description: "Business management" },
      { name: "Commerce" },
    ],
  },
  {
    category: "Creative Arts & Design",
    subjects: [
      { name: "Art & Design", description: "Visual arts" },
      { name: "Drama" },
      { name: "Music" },
      { name: "Design & Technology" },
    ],
  },
  {
    category: "Additional Subjects",
    subjects: [
      { name: "Physical Education" },
      { name: "Islamiyat" },
      { name: "Environmental Management" },
      { name: "Travel & Tourism" },
    ],
  },
];

export default function IGCSEPage() {
  // IGCSE program details table
  const igcseDetails = [
    { label: "Age Range", value: igcseProgram.ageRange },
    { label: "Standards", value: igcseProgram.standards },
    { label: "Available Subjects", value: `${igcseProgram.availableSubjects} subjects` },
    { label: "Examination Board", value: igcseProgram.examinationBoard },
    { label: "Exam Sessions", value: igcseProgram.sessions },
    { label: "Registration", value: igcseProgram.registration },
  ];

  const detailsColumns = [
    { key: "label", header: "Detail" },
    { key: "value", header: "Information" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title="Your Passport to Global Universities"
        subtitle="International General Certificate of Secondary Education"
        backgroundImage={hero6}
        height="medium"
      />

      {/* Overview */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed">
            {igcseProgram.description}
          </p>
        </div>
      </section>

      {/* Programme Details */}
      <section>
        <SectionHeading>IGCSE Programme Details</SectionHeading>

        <DataTable
          columns={detailsColumns}
          data={igcseDetails}
          caption="Key Information"
          className="mt-8"
        />
      </section>

      {/* Available Subjects */}
      <section>
        <SectionHeading>37 Available Subjects</SectionHeading>

        <div className="bg-primary/5 rounded-lg p-6 mb-6">
          <p className="text-foreground/70 font-proximaNova">
            Students typically select 5-10 subjects based on their interests and
            university goals. Our academic counselors provide guidance on optimal
            subject combinations for different career paths.
          </p>
        </div>

        <SubjectGrid categories={igcseSubjects} />
      </section>

      {/* IGCSE Preparation at SIS */}
      <section>
        <SectionHeading>IGCSE Preparation at SIS</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-orpheus text-primary mb-3">
              Standard 9
            </h3>
            <ul className="space-y-2 text-foreground/70 font-proximaNova">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Introduction to IGCSE syllabus and expectations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Subject selection guidance and counseling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Foundation building in chosen subjects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Study skills and time management training</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-orpheus text-primary mb-3">
              Standard 10
            </h3>
            <ul className="space-y-2 text-foreground/70 font-proximaNova">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Complete syllabus coverage and revision</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Practice with past papers and mock examinations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Exam technique workshops and preparation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Individual support and progress monitoring</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Success & Achievement with Image */}
      <section className="relative overflow-hidden rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Content Side */}
          <div className="bg-gradient-to-br from-secondary/20 via-secondary/10 to-primary/5 p-8 md:p-12 flex items-center order-2 lg:order-1">
            <div>
              <h3 className="text-3xl font-orpheus text-primary mb-4">
                IGCSE Achievement Awards
              </h3>
              <p className="text-foreground/70 font-proximaNova mb-6">
                <strong>Requirement:</strong> {igcseAwards.requirement}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/60 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-orpheus text-primary mb-1">Award Crest</h4>
                    <p className="text-sm text-foreground/70 font-proximaNova">
                      Recognition of academic excellence
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/60 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-orpheus text-primary mb-1">Certificate</h4>
                    <p className="text-sm text-foreground/70 font-proximaNova">
                      Certificate of Achievement
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/60 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-orpheus text-primary mb-1">A-Level Voucher</h4>
                    <p className="text-sm text-foreground/70 font-proximaNova">
                      BDT 5,000 towards A-Level registration
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative h-64 lg:h-auto min-h-[500px] order-1 lg:order-2">
            <Image
              src={awardsImage}
              alt="British Council Awards & Achievement"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* University Pathways */}
      <section>
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-orpheus text-primary mb-6 text-center">
            After IGCSE: Your University Pathway
          </h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-foreground/70 font-proximaNova mb-6">
              IGCSE qualifications are recognized by universities and educational
              institutions worldwide. After completing IGCSE, students can:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-foreground/70 font-proximaNova">
                <span className="text-secondary mt-1 flex-shrink-0">✓</span>
                <span>
                  <strong>Progress to A-Levels</strong> at our school for advanced
                  university preparation
                </span>
              </li>
              <li className="flex items-start gap-3 text-foreground/70 font-proximaNova">
                <span className="text-secondary mt-1 flex-shrink-0">✓</span>
                <span>
                  <strong>Apply to international schools</strong> offering IB
                  Diploma or other pre-university programs
                </span>
              </li>
              <li className="flex items-start gap-3 text-foreground/70 font-proximaNova">
                <span className="text-secondary mt-1 flex-shrink-0">✓</span>
                <span>
                  <strong>Enter foundation programs</strong> at universities in UK,
                  USA, Canada, and Australia
                </span>
              </li>
            </ul>
            <div className="text-center">
              <CTAButton href="/academics/a-levels" size="lg">
                Explore Our A-Level Programme
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-primary/5 rounded-lg p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-orpheus text-primary mb-4">
          Ready to Begin Your IGCSE Journey?
        </h2>
        <p className="text-foreground/70 font-proximaNova mb-6 max-w-2xl mx-auto">
          Join our IGCSE programme and earn qualifications recognized by
          universities worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="/#admissions" size="lg">
            Apply Now
          </CTAButton>
          <CTAButton href="/academics/calendar" variant="outline" size="lg">
            View Exam Schedule
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
