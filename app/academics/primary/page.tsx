import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import InfoCard from "@/components/academics/InfoCard";
import DataTable from "@/components/academics/DataTable";
import CTAButton from "@/components/academics/CTAButton";
import {
  primaryContent,
  lowerPrimarySchedule,
  upperPrimarySchedule,
  primarySubjects,
  primarySkills,
} from "@/data/academics/primary";
import hero1 from "@/assets/hero-1.jpg";
import scienceImage from "@/assets/science_and_innovation.jpg";
import { BookOpen, Users, GraduationCap, Lightbulb, Palette, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Primary School (Ages 6-12)",
  description: primaryContent.description,
};

// Icons for skills (mapping to InfoCard)
const skillIcons = [
  BookOpen,
  Lightbulb,
  Globe,
  Users,
  Palette,
  GraduationCap,
];

export default function PrimaryPage() {
  // Table columns for schedule
  const scheduleColumns = [
    { key: "class", header: "Standard" },
    { key: "age", header: "Age Range" },
    { key: "hours", header: "School Hours" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title={primaryContent.title}
        subtitle={primaryContent.subtitle}
        backgroundImage={hero1}
        height="medium"
      />

      {/* Overview Description */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed whitespace-pre-line">
            {primaryContent.description}
          </p>
        </div>
      </section>

      {/* Lower Primary */}
      <section>
        <SectionHeading>Lower Primary (Standards 1-3)</SectionHeading>

        <div className="bg-primary/5 rounded-lg p-6 mb-6">
          <p className="text-foreground/70 font-proximaNova">
            {primaryContent.teachingApproach.lowerPrimary}
          </p>
        </div>

        <DataTable
          columns={scheduleColumns}
          data={lowerPrimarySchedule}
          caption="Lower Primary Class Schedule"
        />
      </section>

      {/* Upper Primary */}
      <section>
        <SectionHeading>Upper Primary (Standards 4-6)</SectionHeading>

        <div className="bg-primary/5 rounded-lg p-6 mb-6">
          <p className="text-foreground/70 font-proximaNova">
            {primaryContent.teachingApproach.upperPrimary}
          </p>
        </div>

        <DataTable
          columns={scheduleColumns}
          data={upperPrimarySchedule}
          caption="Upper Primary Class Schedule"
        />
      </section>

      {/* Subjects Offered */}
      <section>
        <SectionHeading>Subjects Offered</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {primarySubjects.map((subject, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                <span className="font-proximaNova text-foreground font-semibold">
                  {subject}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Development */}
      <section>
        <SectionHeading>Skills Development</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {primarySkills.map((skill, index) => (
            <InfoCard
              key={index}
              icon={skillIcons[index]}
              title={skill.title}
              description={skill.description}
            />
          ))}
        </div>
      </section>

      {/* iPrimary Examination Callout */}
      <section>
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Content Side */}
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-orpheus text-primary">
                    International Examinations
                  </h2>
                </div>
                <p className="text-foreground/70 font-proximaNova text-lg mb-6 leading-relaxed">
                  Students in <strong>Standard 5</strong> take the{" "}
                  <strong>Pearson Edexcel iPrimary</strong> examinations, earning
                  internationally recognized qualifications that validate their
                  academic achievements.
                </p>
                <p className="text-foreground/70 font-proximaNova mb-6">
                  These externally assessed examinations in English, Mathematics, and Science
                  prepare students for the next phase of their academic journey while providing
                  international recognition of their capabilities.
                </p>
                <CTAButton href="/academics/iprimary-ils" size="lg">
                  Learn More About iPrimary
                </CTAButton>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <Image
                src={scienceImage}
                alt="iPrimary International Examinations"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-card border border-border rounded-lg p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-orpheus text-primary mb-4">
          Enroll in Our Primary Program
        </h2>
        <p className="text-foreground/70 font-proximaNova mb-6 max-w-2xl mx-auto">
          Give your child a strong foundation for academic success and personal
          growth. Join our nurturing learning community today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="/#admissions" size="lg">
            Apply Now
          </CTAButton>
          <CTAButton href="/#contact" variant="outline" size="lg">
            Contact Us
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
