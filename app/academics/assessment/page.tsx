import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import DataTable from "@/components/academics/DataTable";
import {
  assessmentContent,
  cpaSystem,
  caSystem,
  semesterStructure,
  assessmentPolicies,
} from "@/data/academics/assessment";
import hero1 from "@/assets/hero-1.jpg";
import principalsImage from "@/assets/principals_message.jpg";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Assessment System",
  description: assessmentContent.description,
};

export default function AssessmentPage() {
  // Semester structure table columns
  const semesterColumns = [
    { key: "semester", header: "Semester" },
    { key: "duration", header: "Duration" },
    { key: "assessments", header: "Assessments" },
    { key: "examinations", header: "Examinations" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title={assessmentContent.title}
        subtitle={assessmentContent.subtitle}
        backgroundImage={hero1}
        height="medium"
      />

      {/* Overview */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed whitespace-pre-line">
            {assessmentContent.description}
          </p>
        </div>
      </section>

      {/* CPA System */}
      <section>
        <SectionHeading>Class Performance Assessments (CPA)</SectionHeading>

        <div className="bg-primary/5 rounded-lg p-6 mb-6">
          <p className="text-foreground/70 font-proximaNova mb-2">
            <strong>Purpose:</strong> {cpaSystem.description}
          </p>
          <p className="text-foreground/70 font-proximaNova">
            <strong>Frequency:</strong> {cpaSystem.frequency}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-orpheus text-primary mb-4">
            CPA Components (20% each)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {cpaSystem.components.map((component, index) => (
              <div
                key={index}
                className="bg-primary/5 rounded-lg p-4 text-center hover:bg-primary/10 transition-colors duration-300"
              >
                <div className="text-2xl font-orpheus text-primary mb-1">
                  {component.weight}%
                </div>
                <div className="text-sm font-proximaNova text-foreground/70">
                  {component.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CA System */}
      <section>
        <SectionHeading>Continual Assessments (CA)</SectionHeading>

        <div className="bg-primary/5 rounded-lg p-6 mb-6">
          <p className="text-foreground/70 font-proximaNova mb-2">
            <strong>Purpose:</strong> {caSystem.description}
          </p>
          <p className="text-foreground/70 font-proximaNova">
            <strong>Frequency:</strong> {caSystem.frequency}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-orpheus text-primary mb-4">
            CA Components
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {caSystem.components.map((component, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-primary/5 rounded-lg p-4 hover:bg-primary/10 transition-colors duration-300"
              >
                <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                <span className="text-sm font-proximaNova text-foreground/80">
                  {component.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Semester Structure */}
      <section>
        <SectionHeading>Semester Structure</SectionHeading>

        <DataTable
          columns={semesterColumns}
          data={semesterStructure}
          caption="Academic Year Assessment Schedule"
          className="mt-8"
        />
      </section>

      {/* Assessment Policies */}
      <section>
        <SectionHeading>Important Assessment Policies</SectionHeading>

        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-64 lg:h-auto min-h-[450px]">
              <Image
                src={principalsImage}
                alt="Assessment Policies and Guidelines"
                fill
                className="object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-orpheus text-primary mb-2">
                      Please Note
                    </h3>
                    <p className="text-foreground/70 font-proximaNova">
                      All students and parents should be aware of the following
                      assessment policies and procedures.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {assessmentPolicies.map((policy, index) => (
                    <div key={index} className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-orpheus text-primary mb-2">
                        {policy.title}
                      </h4>
                      <p className="text-foreground/70 font-proximaNova text-sm">
                        {policy.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Benefits */}
      <section>
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-orpheus text-primary mb-6 text-center">
            Benefits of Our Assessment System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-poppins font-bold">1</span>
              </div>
              <div>
                <h4 className="font-orpheus text-primary mb-1">
                  Reduced Exam Pressure
                </h4>
                <p className="text-sm text-foreground/70 font-proximaNova">
                  Continuous evaluation throughout the year reduces the stress of
                  high-stakes final examinations
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-poppins font-bold">2</span>
              </div>
              <div>
                <h4 className="font-orpheus text-primary mb-1">
                  Regular Feedback
                </h4>
                <p className="text-sm text-foreground/70 font-proximaNova">
                  Frequent assessments provide timely feedback for students and
                  parents to track progress
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-poppins font-bold">3</span>
              </div>
              <div>
                <h4 className="font-orpheus text-primary mb-1">
                  Comprehensive Evaluation
                </h4>
                <p className="text-sm text-foreground/70 font-proximaNova">
                  Multiple assessment methods evaluate diverse skills including
                  written, oral, and practical abilities
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-poppins font-bold">4</span>
              </div>
              <div>
                <h4 className="font-orpheus text-primary mb-1">
                  Early Intervention
                </h4>
                <p className="text-sm text-foreground/70 font-proximaNova">
                  Identifies learning gaps early, allowing teachers to provide
                  targeted support before year-end examinations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Reporting */}
      <section className="bg-primary/5 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-orpheus text-primary mb-4">
          Regular Progress Reports
        </h3>
        <p className="text-foreground/70 font-proximaNova max-w-3xl mx-auto">
          Parents receive detailed reports throughout the academic year showing CA
          and CPA results, along with teacher comments and recommendations. This
          ensures families stay informed about their child's progress and can
          provide appropriate support at home.
        </p>
      </section>
    </div>
  );
}
