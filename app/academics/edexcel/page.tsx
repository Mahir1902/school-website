import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import InfoCard from "@/components/academics/InfoCard";
import PathwayTimeline from "@/components/academics/PathwayTimeline";
import CTAButton from "@/components/academics/CTAButton";
import {
  edexcelContent,
  edexcelBenefits,
  edexcelPathway,
} from "@/data/academics/edexcel";
import hero2 from "@/assets/hero-2.jpg";
import awardsImage from "@/assets/BC_Awards.jpg";
import { CheckCircle, Globe, FileCheck, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Pearson Edexcel Partnership",
  description: edexcelContent.description,
};

// Icons for benefits
const benefitIcons = [Globe, CheckCircle, FileCheck, GraduationCap];

export default function EdexcelPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title={edexcelContent.title}
        subtitle={edexcelContent.subtitle}
        backgroundImage={hero2}
        height="medium"
      />

      {/* Partnership Overview */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed whitespace-pre-line">
            {edexcelContent.description}
          </p>
        </div>
      </section>

      {/* Edexcel Logo/Branding Section */}
      <section className="bg-primary/5 rounded-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <GraduationCap className="w-12 h-12 text-secondary" />
            <h2 className="text-3xl font-orpheus text-primary">
              Pearson Edexcel UK
            </h2>
          </div>
          <p className="text-foreground/70 font-proximaNova">
            As an approved Pearson Edexcel centre, we offer internationally
            recognized qualifications that are respected by universities and
            employers globally.
          </p>
        </div>
      </section>

      {/* Benefits of Edexcel Qualifications */}
      <section>
        <SectionHeading>Benefits of Edexcel Qualifications</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {edexcelBenefits.map((benefit, index) => (
            <InfoCard
              key={index}
              icon={benefitIcons[index]}
              title={benefit.title}
              description={benefit.description}
              variant="primary"
            />
          ))}
        </div>
      </section>

      {/* Qualification Pathway */}
      <section>
        <SectionHeading>Your Edexcel Qualification Pathway</SectionHeading>

        <div className="mt-8">
          <PathwayTimeline steps={edexcelPathway} />
        </div>
      </section>

      {/* Success Stories with Image */}
      <section className="relative overflow-hidden rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Side */}
          <div className="relative h-64 lg:h-auto min-h-[400px]">
            <Image
              src={awardsImage}
              alt="British Council Awards"
              fill
              className="object-cover"
            />
          </div>

          {/* Content Side */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12 flex items-center">
            <div>
              <h3 className="text-3xl font-orpheus text-primary mb-4">
                Celebrating Excellence
              </h3>
              <p className="text-foreground/70 font-proximaNova mb-6 leading-relaxed">
                Our students consistently achieve outstanding results in Pearson Edexcel
                examinations. We celebrate academic excellence and support every student
                in reaching their full potential through rigorous preparation and
                personalized guidance.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <p className="text-foreground/80 font-proximaNova">
                    <strong>High Achievement Rates:</strong> Majority of students achieve A*-B grades
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <p className="text-foreground/80 font-proximaNova">
                    <strong>University Placements:</strong> Graduates accepted to top universities worldwide
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <p className="text-foreground/80 font-proximaNova">
                    <strong>Award Recognition:</strong> Regular recipients of British Council awards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examination Details */}
      <section>
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-orpheus text-primary mb-6 text-center">
            External Examination Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">📝</span>
              </div>
              <h4 className="font-orpheus text-primary mb-2">
                Standardized Exams
              </h4>
              <p className="text-sm text-foreground/70 font-proximaNova">
                Students take internationally standardized examinations set by
                Pearson Edexcel UK
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">✅</span>
              </div>
              <h4 className="font-orpheus text-primary mb-2">External Marking</h4>
              <p className="text-sm text-foreground/70 font-proximaNova">
                All examination papers are sent to UK for marking by qualified
                Pearson Edexcel examiners
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🎓</span>
              </div>
              <h4 className="font-orpheus text-primary mb-2">
                Official Certificates
              </h4>
              <p className="text-sm text-foreground/70 font-proximaNova">
                Students receive official Pearson Edexcel certificates recognized
                globally
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Links */}
      <section>
        <SectionHeading>Explore Our Edexcel Qualifications</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-orpheus text-primary mb-2">
              iPrimary & iLower Secondary
            </h3>
            <p className="text-foreground/70 font-proximaNova mb-4">
              Ages 5-14 • Foundation qualifications in English, Mathematics, and
              Science
            </p>
            <CTAButton href="/academics/iprimary-ils" variant="outline" size="sm">
              Learn More
            </CTAButton>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-orpheus text-primary mb-2">
              IGCSE (International GCSE)
            </h3>
            <p className="text-foreground/70 font-proximaNova mb-4">
              Ages 14-16 • 37 subjects available • University entry
              qualification
            </p>
            <CTAButton href="/academics/igcse" variant="outline" size="sm">
              Learn More
            </CTAButton>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-orpheus text-primary mb-2">
              International A-Level
            </h3>
            <p className="text-foreground/70 font-proximaNova mb-4">
              Ages 16-19 • 21 subjects available • Gold standard for university
              entry
            </p>
            <CTAButton href="/academics/a-levels" variant="outline" size="sm">
              Learn More
            </CTAButton>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-orpheus text-primary mb-2">
              External Candidates
            </h3>
            <p className="text-foreground/70 font-proximaNova mb-4">
              Register for Edexcel examinations as an external candidate at our
              centre
            </p>
            <CTAButton
              href="/academics/external-candidates"
              variant="outline"
              size="sm"
            >
              Learn More
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Call to Action with Background */}
      <section className="relative overflow-hidden rounded-lg">
        <div className="relative">
          <div className="bg-gradient-to-r from-primary via-primary/95 to-secondary/80 p-8 md:p-16 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-orpheus text-white mb-4">
                Join Our Edexcel Programme
              </h2>
              <p className="text-white/95 font-proximaNova text-lg mb-8">
                Give your child access to internationally recognized qualifications
                that open doors to universities worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton
                  href="/#admissions"
                  size="lg"
                  className="bg-white hover:bg-white/90 text-primary border-0"
                >
                  Apply Now
                </CTAButton>
                <CTAButton
                  href="/#contact"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Contact Us
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
