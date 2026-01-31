import type { Metadata } from "next";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import InfoCard from "@/components/academics/InfoCard";
import DataTable from "@/components/academics/DataTable";
import CTAButton from "@/components/academics/CTAButton";
import {
  preschoolContent,
  preschoolFeatures,
  nurserySchedule,
  kindergartenSchedule,
  nurseryLearningFocus,
  kindergartenLearningFocus,
} from "@/data/academics/preschool";
import hero1 from "@/assets/hero-1.jpg";

export const metadata: Metadata = {
  title: "Pre-School Program (Ages 2-6)",
  description: preschoolContent.description,
};

export default function PreSchoolPage() {
  // Table columns for schedule
  const scheduleColumns = [
    { key: "class", header: "Class" },
    { key: "age", header: "Age Range" },
    { key: "hours", header: "School Hours" },
    { key: "recess", header: "Recess" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title={preschoolContent.title}
        subtitle={preschoolContent.subtitle}
        backgroundImage={hero1}
        height="medium"
      />

      {/* Overview Description */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed whitespace-pre-line">
            {preschoolContent.description}
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <SectionHeading>Why Choose Our Pre-School</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {preschoolFeatures.map((feature, index) => (
            <InfoCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      {/* Nursery Level */}
      <section>
        <SectionHeading>Nursery Level (Ages 2-4+)</SectionHeading>

        <DataTable
          columns={scheduleColumns}
          data={nurserySchedule}
          caption="Nursery Class Schedule"
          className="mt-8"
        />

        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-orpheus text-primary mb-4">
            Learning Focus
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {nurseryLearningFocus.map((focus, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-foreground/70 font-proximaNova"
              >
                <span className="text-secondary mt-1 flex-shrink-0">✓</span>
                <span>{focus}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kindergarten Level */}
      <section>
        <SectionHeading>Kindergarten Level (Ages 4+-6+)</SectionHeading>

        <DataTable
          columns={scheduleColumns}
          data={kindergartenSchedule}
          caption="Kindergarten Class Schedule"
          className="mt-8"
        />

        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-orpheus text-primary mb-4">
            Learning Focus
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {kindergartenLearningFocus.map((focus, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-foreground/70 font-proximaNova"
              >
                <span className="text-secondary mt-1 flex-shrink-0">✓</span>
                <span>{focus}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Facilities Highlight */}
      <section className="bg-primary/5 rounded-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-orpheus text-primary mb-4">
            Safe, Nurturing Learning Environment
          </h2>
          <p className="text-foreground/70 font-proximaNova mb-6">
            Our pre-school features age-appropriate facilities including
            air-conditioned classrooms, dedicated play areas, and specialized
            resources for early childhood development. Every aspect of our
            environment is designed to support your child's growth and learning.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-card border border-border rounded-lg p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-orpheus text-primary mb-4">
          Ready to Enroll Your Child?
        </h2>
        <p className="text-foreground/70 font-proximaNova mb-6 max-w-2xl mx-auto">
          Give your child the best start in their educational journey. Contact
          us to schedule a visit or learn more about our pre-school program.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="/#admissions" size="lg">
            Apply Now
          </CTAButton>
          <CTAButton href="/#contact" variant="outline" size="lg">
            Schedule a Visit
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
