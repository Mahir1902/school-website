import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import DataTable from "@/components/academics/DataTable";
import CTAButton from "@/components/academics/CTAButton";
import {
  externalCandidatesServices,
  externalCandidatesFees,
  requiredDocuments,
  registrationHours,
} from "@/data/academics/programs";
import hero1 from "@/assets/hero-1.jpg";
import principalsImage from "@/assets/principals_message.jpg";
import { CheckCircle, Clock, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "External Candidates Registration",
  description:
    "Register for Pearson Edexcel examinations as an external candidate at Singapore International School, Dhaka.",
};

export default function ExternalCandidatesPage() {
  // Fees table columns
  const feesColumns = [
    { key: "type", header: "Fee Type" },
    { key: "amount", header: "Amount" },
    { key: "notes", header: "Notes" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title="Register for Edexcel Exams"
        subtitle="External Candidates Welcome"
        backgroundImage={hero1}
        height="medium"
      />

      {/* Overview */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed">
            Singapore International School, Dhaka is an Approved Pearson Edexcel
            Centre. We welcome external candidates to register and sit for
            Edexcel examinations including iPrimary, iLower Secondary, IGCSE, and
            A-Level qualifications.
          </p>
        </div>
      </section>

      {/* Services Provided */}
      <section>
        <SectionHeading>Services Provided</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {externalCandidatesServices.map((service, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
            >
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <span className="text-foreground/80 font-proximaNova">{service}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section className="bg-primary/5 rounded-lg p-8">
        <h3 className="text-2xl font-orpheus text-primary mb-4">
          Eligibility Requirements
        </h3>
        <ul className="space-y-3 text-foreground/70 font-proximaNova">
          <li className="flex items-start gap-3">
            <span className="text-secondary mt-1 flex-shrink-0">•</span>
            <span>
              <strong>Age:</strong> Must meet minimum age requirements for the
              specific qualification (typically 14+ for IGCSE, 16+ for A-Level)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-secondary mt-1 flex-shrink-0">•</span>
            <span>
              <strong>Documentation:</strong> Valid passport and required
              documentation (see below)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-secondary mt-1 flex-shrink-0">•</span>
            <span>
              <strong>Registration Deadline:</strong> Must register before
              British Council deadlines for each examination session
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-secondary mt-1 flex-shrink-0">•</span>
            <span>
              <strong>Attendance:</strong> Must attend all scheduled examinations
              on campus during examination periods
            </span>
          </li>
        </ul>
      </section>

      {/* Fees Breakdown */}
      <section>
        <SectionHeading>Fees Structure</SectionHeading>

        <DataTable
          columns={feesColumns}
          data={externalCandidatesFees}
          caption="External Candidates Fees (2024-2025)"
          className="mt-8"
        />

        <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6">
          <p className="text-foreground/80 font-proximaNova text-sm">
            <strong>Note:</strong> UK Examination Fees are set by Pearson
            Edexcel and collected through British Council. These fees vary by
            subject and examination level. Students will receive exact fee
            information during registration.
          </p>
        </div>
      </section>

      {/* Required Documents */}
      <section>
        <SectionHeading>Required Documents</SectionHeading>

        <div className="bg-card border border-border rounded-lg p-8 mt-8">
          <p className="text-foreground/70 font-proximaNova mb-6">
            Please prepare the following documents before visiting the school for
            registration:
          </p>

          <div className="space-y-4">
            {requiredDocuments.map((doc, index) => (
              <div
                key={index}
                className="flex items-start gap-4 pb-4 border-b border-border last:border-0"
              >
                <div className="flex-shrink-0 mt-1">
                  {doc.required ? (
                    <CheckCircle className="w-5 h-5 text-secondary" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-foreground/30" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-proximaNova font-semibold text-foreground">
                      {doc.name}
                    </span>
                    {doc.required ? (
                      <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded font-poppins font-semibold">
                        REQUIRED
                      </span>
                    ) : (
                      <span className="text-xs bg-foreground/10 text-foreground/60 px-2 py-0.5 rounded font-poppins">
                        Optional
                      </span>
                    )}
                  </div>
                  {doc.copies && (
                    <p className="text-sm text-foreground/60 font-proximaNova">
                      {doc.copies} {doc.copies === 1 ? "copy" : "copies"} required
                    </p>
                  )}
                  {doc.notes && (
                    <p className="text-sm text-foreground/60 font-proximaNova italic">
                      {doc.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Hours */}
      <section>
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Content Side */}
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-orpheus text-primary">
                    Registration Hours
                  </h3>
                </div>
                <p className="text-foreground/70 font-proximaNova text-lg mb-4 leading-relaxed">
                  {registrationHours}
                </p>
                <p className="text-foreground/70 font-proximaNova mb-6">
                  Please visit the school office during these hours with all required
                  documents and payment. Our admissions team will guide you through
                  the registration process and answer any questions you may have.
                </p>
                <div className="bg-primary/5 rounded-lg p-4">
                  <p className="text-sm text-foreground/70 font-proximaNova">
                    <strong>Note:</strong> It's recommended to call ahead and schedule
                    an appointment to ensure prompt service.
                  </p>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <Image
                src={principalsImage}
                alt="School Registration Office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section>
        <SectionHeading>Registration Process</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-poppins font-bold text-2xl">1</span>
            </div>
            <h4 className="font-orpheus text-primary mb-2">Prepare Documents</h4>
            <p className="text-sm text-foreground/70 font-proximaNova">
              Gather all required documents and photocopies
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-poppins font-bold text-2xl">2</span>
            </div>
            <h4 className="font-orpheus text-primary mb-2">Visit School Office</h4>
            <p className="text-sm text-foreground/70 font-proximaNova">
              Come during registration hours to submit forms and payment
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-poppins font-bold text-2xl">3</span>
            </div>
            <h4 className="font-orpheus text-primary mb-2">
              Receive Confirmation
            </h4>
            <p className="text-sm text-foreground/70 font-proximaNova">
              Get your examination timetable and candidate details
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-card border border-border rounded-lg p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-orpheus text-primary mb-4">
          Ready to Register?
        </h2>
        <p className="text-foreground/70 font-proximaNova mb-6 max-w-2xl mx-auto">
          Download the registration form or contact us for more information about
          external candidate registration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="#" size="lg" icon={Download} iconPosition="left">
            Download Registration Form
          </CTAButton>
          <CTAButton href="/#contact" variant="outline" size="lg">
            Contact Us
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
