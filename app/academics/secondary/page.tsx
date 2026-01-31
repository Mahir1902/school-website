import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import DataTable from "@/components/academics/DataTable";
import CTAButton from "@/components/academics/CTAButton";
import {
  secondaryContent,
  secondarySchedule,
  secondarySubjects,
  igcsePreparation,
} from "@/data/academics/secondary";
import hero1 from "@/assets/hero-1.jpg";
import extracurricularImage from "@/assets/extracurricular.jpg";
import { GraduationCap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Secondary School (Ages 12-16)",
  description: secondaryContent.description,
};

export default function SecondaryPage() {
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
        title={secondaryContent.title}
        subtitle={secondaryContent.subtitle}
        backgroundImage={hero1}
        height="medium"
      />

      {/* Overview Description */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed whitespace-pre-line">
            {secondaryContent.description}
          </p>
        </div>
      </section>

      {/* Programme Structure */}
      <section>
        <SectionHeading>Programme Structure</SectionHeading>

        <DataTable
          columns={scheduleColumns}
          data={secondarySchedule}
          caption="Secondary Class Schedule"
          className="mt-8"
        />

        <div className="mt-6 bg-primary/5 rounded-lg p-6">
          <p className="text-foreground/70 font-proximaNova">
            <strong>Teaching Approach:</strong> Specialist subject teachers with
            access to well-equipped science laboratories, computer facilities, and
            comprehensive learning resources. Small class sizes ensure personalized
            attention and support.
          </p>
        </div>
      </section>

      {/* Subjects Offered */}
      <section>
        <SectionHeading>Subjects Offered</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {secondarySubjects.map((subject, index) => (
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

      {/* IGCSE Preparation Pathway */}
      <section>
        <SectionHeading>IGCSE Preparation Pathway</SectionHeading>

        <div className="mt-8 space-y-6">
          {igcsePreparation.map((step, index) => (
            <div
              key={index}
              className="flex gap-4 items-start bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                <span className="text-primary font-poppins font-bold text-lg">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-orpheus text-primary mb-2">
                  {step.stage}
                </h3>
                <p className="text-foreground/70 font-proximaNova">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IGCSE Highlight */}
      <section>
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <Image
                src={extracurricularImage}
                alt="IGCSE International Qualifications"
                fill
                className="object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-orpheus text-primary">
                    Internationally Recognized Qualifications
                  </h2>
                </div>
                <p className="text-foreground/70 font-proximaNova text-lg mb-4 leading-relaxed">
                  Our students take <strong>Pearson Edexcel IGCSE</strong> examinations
                  in Standards 9-10, with a choice of <strong>37 subjects</strong>.
                  IGCSE qualifications are recognized by universities worldwide and
                  provide a strong foundation for A-Level studies.
                </p>
                <p className="text-foreground/70 font-proximaNova mb-6">
                  Students benefit from rigorous preparation, expert teaching, and
                  comprehensive support throughout their IGCSE journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <CTAButton href="/academics/igcse">
                    Learn More About IGCSE
                  </CTAButton>
                  <CTAButton href="/academics/subjects" variant="outline">
                    View All Subjects
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Pathway */}
      <section>
        <div className="bg-primary/5 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-orpheus text-primary mb-4">
            Your Pathway to University
          </h2>
          <p className="text-foreground/70 font-proximaNova mb-6 max-w-3xl mx-auto">
            After completing IGCSE, students can progress to our A-Level program
            or pursue other pathways to higher education. We provide personalized
            university counseling to help students achieve their goals.
          </p>
          <CTAButton href="/academics/a-levels" size="lg" icon={ArrowRight} iconPosition="right">
            Explore A-Levels
          </CTAButton>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-card border border-border rounded-lg p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-orpheus text-primary mb-4">
          Ready to Join Our Secondary School?
        </h2>
        <p className="text-foreground/70 font-proximaNova mb-6 max-w-2xl mx-auto">
          Prepare for global success with internationally recognized
          qualifications and expert guidance toward university admission.
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
