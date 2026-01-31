import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import DataTable from "@/components/academics/DataTable";
import InfoCard from "@/components/academics/InfoCard";
import CTAButton from "@/components/academics/CTAButton";
import {
  iPrimaryProgram,
  iLowerSecondaryProgram,
  iPrimaryRewards,
  iLowerSecondaryRewards,
} from "@/data/academics/programs";
import hero1 from "@/assets/hero-1.jpg";
import scienceImage from "@/assets/science_and_innovation.jpg";
import sportsImage from "@/assets/sports_day.jpg";
import { Award, FileCheck, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "iPrimary & iLower Secondary",
  description:
    "International Primary and Lower Secondary qualifications from Pearson Edexcel, building strong foundations for IGCSE success.",
};

export default function IPrimaryILSPage() {
  // iPrimary details table data
  const iPrimaryDetails = [
    { label: "Age Range", value: iPrimaryProgram.ageRange },
    { label: "Standards", value: iPrimaryProgram.standards },
    { label: "Subjects", value: iPrimaryProgram.subjects.join(", ") },
    { label: "Examination", value: iPrimaryProgram.examination },
    { label: "Marking", value: iPrimaryProgram.marking },
  ];

  // iLower Secondary details table data
  const iLSDetails = [
    { label: "Age Range", value: iLowerSecondaryProgram.ageRange },
    { label: "Standards", value: iLowerSecondaryProgram.standards },
    { label: "Subjects", value: iLowerSecondaryProgram.subjects.join(", ") },
    { label: "Examination", value: iLowerSecondaryProgram.examination },
    { label: "Marking", value: iLowerSecondaryProgram.marking },
  ];

  const detailsColumns = [
    { key: "label", header: "Detail" },
    { key: "value", header: "Information" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title="Building Strong Foundations"
        subtitle="iPrimary & iLower Secondary Qualifications"
        backgroundImage={hero1}
        height="medium"
      />

      {/* Overview */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed">
            Our iPrimary and iLower Secondary programs follow the Pearson Edexcel
            International curriculum, providing students with globally recognized
            qualifications that build strong foundations for IGCSE success.
          </p>
        </div>
      </section>

      {/* iPrimary Section */}
      <section>
        <SectionHeading>{iPrimaryProgram.name}</SectionHeading>

        <div className="bg-primary/5 rounded-lg p-6 mb-6">
          <p className="text-foreground/70 font-proximaNova">
            {iPrimaryProgram.description}
          </p>
        </div>

        <DataTable
          columns={detailsColumns}
          data={iPrimaryDetails}
          caption="iPrimary Programme Details"
        />
      </section>

      {/* iPrimary Achievement Rewards */}
      <section>
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <Image
                src={scienceImage}
                alt="iPrimary Achievement Excellence"
                fill
                className="object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <h3 className="text-3xl font-orpheus text-primary mb-4">
                  iPrimary Achievement Awards
                </h3>
                <p className="text-foreground/70 font-proximaNova mb-6">
                  <strong>Requirement:</strong> {iPrimaryRewards.requirement}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-orpheus text-primary mb-1">Award Crest</h4>
                      <p className="text-sm text-foreground/70 font-proximaNova">
                        Recognition of academic excellence
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-orpheus text-primary mb-1">Certificate</h4>
                      <p className="text-sm text-foreground/70 font-proximaNova">
                        Certificate of Achievement
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-primary" />
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

      {/* iLower Secondary Section */}
      <section>
        <SectionHeading>{iLowerSecondaryProgram.name}</SectionHeading>

        <div className="bg-primary/5 rounded-lg p-6 mb-6">
          <p className="text-foreground/70 font-proximaNova">
            {iLowerSecondaryProgram.description}
          </p>
        </div>

        <DataTable
          columns={detailsColumns}
          data={iLSDetails}
          caption="iLower Secondary Programme Details"
        />
      </section>

      {/* iLower Secondary Achievement Rewards */}
      <section>
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Content Side */}
            <div className="p-8 md:p-12 flex items-center order-2 lg:order-1">
              <div>
                <h3 className="text-3xl font-orpheus text-primary mb-4">
                  iLower Secondary Achievement Awards
                </h3>
                <p className="text-foreground/70 font-proximaNova mb-6">
                  <strong>Requirement:</strong> {iLowerSecondaryRewards.requirement}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-orpheus text-primary mb-1">Award Crest</h4>
                      <p className="text-sm text-foreground/70 font-proximaNova">
                        Recognition of academic excellence
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-orpheus text-primary mb-1">Certificate</h4>
                      <p className="text-sm text-foreground/70 font-proximaNova">
                        Certificate of Achievement
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-orpheus text-primary mb-1">Cash Voucher</h4>
                      <p className="text-sm text-foreground/70 font-proximaNova">
                        BDT 5,000 for Year 1-8 students
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative h-64 lg:h-auto min-h-[400px] order-1 lg:order-2">
              <Image
                src={sportsImage}
                alt="iLower Secondary Achievement Excellence"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Progression to IGCSE */}
      <section className="bg-card border border-border rounded-lg p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-orpheus text-primary mb-4">
            Your Pathway to IGCSE
          </h3>
          <p className="text-foreground/70 font-proximaNova mb-6">
            Completing iPrimary and iLower Secondary qualifications provides the
            strong academic foundation needed for success in IGCSE examinations.
            Students who excel in these programs are well-prepared for the rigor
            of IGCSE and A-Level studies.
          </p>
          <CTAButton href="/academics/igcse" size="lg">
            Explore IGCSE Programme
          </CTAButton>
        </div>
      </section>

      {/* External Examination Process */}
      <section>
        <div className="bg-primary/5 rounded-lg p-8">
          <h3 className="text-2xl font-orpheus text-primary mb-6 text-center">
            External Examination Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">📚</span>
              </div>
              <h4 className="font-orpheus text-primary mb-2">
                Curriculum Delivery
              </h4>
              <p className="text-sm text-foreground/70 font-proximaNova">
                Follow Pearson Edexcel international curriculum throughout the
                academic year
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">✍️</span>
              </div>
              <h4 className="font-orpheus text-primary mb-2">
                Achievement Tests
              </h4>
              <p className="text-sm text-foreground/70 font-proximaNova">
                Take externally set achievement tests at the end of Standard 5
                (iPrimary) or Standard 8 (iLS)
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🏆</span>
              </div>
              <h4 className="font-orpheus text-primary mb-2">
                Results & Recognition
              </h4>
              <p className="text-sm text-foreground/70 font-proximaNova">
                Receive Pearson Edexcel certificates and school awards for
                outstanding performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-card border border-border rounded-lg p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-orpheus text-primary mb-4">
          Join Our International Curriculum
        </h2>
        <p className="text-foreground/70 font-proximaNova mb-6 max-w-2xl mx-auto">
          Give your child the advantage of internationally recognized
          qualifications from Pearson Edexcel UK.
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
