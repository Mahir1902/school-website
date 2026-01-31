import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import InfoCard from "@/components/academics/InfoCard";
import {
  teachingMethodologies,
  teachingPhilosophy,
} from "@/data/academics/methodology";
import hero5 from "@/assets/hero-5.jpg";
import principalsImage from "@/assets/principals_message.jpg";

export const metadata: Metadata = {
  title: "Teaching Methodology",
  description: teachingPhilosophy.description,
};

export default function MethodologyPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title="Learning Through Discovery"
        subtitle="Our Approach to Education"
        backgroundImage={hero5}
        height="medium"
      />

      {/* Philosophy Quote */}
      <section className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute top-0 left-0 text-8xl text-secondary/20 font-le_beaune leading-none">
            "
          </div>
          <blockquote className="pt-12 pb-4 px-8 text-center">
            <p className="text-2xl md:text-3xl font-orpheus text-primary italic mb-6">
              {teachingPhilosophy.quote}
            </p>
          </blockquote>
          <div className="absolute bottom-0 right-0 text-8xl text-secondary/20 font-le_beaune leading-none transform rotate-180">
            "
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed whitespace-pre-line">
            {teachingPhilosophy.description}
          </p>
        </div>
      </section>

      {/* Teaching Methodologies */}
      <section>
        <SectionHeading>Our Teaching Methods</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {teachingMethodologies.map((method, index) => (
            <InfoCard
              key={index}
              icon={method.icon}
              title={method.name}
              description={method.description}
            />
          ))}
        </div>
      </section>

      {/* Visual Break: Educational Philosophy */}
      <section className="relative overflow-hidden rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* Content Side */}
          <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary/90 p-8 md:p-12 flex items-center">
            <div className="text-white">
              <h3 className="text-3xl font-orpheus mb-4">
                Student-Centered Learning
              </h3>
              <p className="font-proximaNova leading-relaxed mb-4">
                Our methodology places students at the heart of the learning process.
                We believe that education should be engaging, interactive, and tailored
                to individual learning styles.
              </p>
              <p className="font-proximaNova leading-relaxed">
                Through small class sizes and dedicated teachers, we ensure every
                student receives personalized attention and support to reach their
                full potential.
              </p>
            </div>
          </div>

          {/* Image Side */}
          <div className="lg:col-span-3 relative h-64 lg:h-auto min-h-[400px]">
            <Image
              src={principalsImage}
              alt="Student-centered learning"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Detailed Benefits */}
      <section>
        <SectionHeading>How Our Methods Benefit Students</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {teachingMethodologies.map((method, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <method.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-orpheus text-primary mb-2">
                    {method.name}
                  </h3>
                  <p className="text-sm text-foreground/70 font-proximaNova">
                    {method.description}
                  </p>
                </div>
              </div>

              <div className="pl-16">
                <h4 className="text-sm font-poppins font-semibold text-primary mb-2 uppercase">
                  Benefits
                </h4>
                <ul className="space-y-2">
                  {method.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-start gap-2 text-sm text-foreground/70 font-proximaNova"
                    >
                      <span className="text-secondary mt-1 flex-shrink-0">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Assessment Highlight */}
      <section className="bg-primary/5 rounded-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-orpheus text-primary mb-4">
            Comprehensive Assessment System
          </h2>
          <p className="text-foreground/70 font-proximaNova mb-6">
            Our continuous assessment approach ensures regular feedback and
            progress monitoring through Class Performance Assessments (CPA) and
            Continual Assessments (CA), complemented by oral and practical
            components that evaluate the full range of student abilities.
          </p>
          <a
            href="/academics/assessment"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-proximaNova font-semibold"
          >
            Learn About Our Assessment System
          </a>
        </div>
      </section>

      {/* Facilities Section */}
      <section>
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-orpheus text-primary mb-6 text-center">
            Learning Facilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔬</span>
              </div>
              <h4 className="font-orpheus text-primary mb-2">Science Labs</h4>
              <p className="text-sm text-foreground/70 font-proximaNova">
                Fully equipped laboratories for hands-on experiments and
                scientific exploration
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💻</span>
              </div>
              <h4 className="font-orpheus text-primary mb-2">Computer Labs</h4>
              <p className="text-sm text-foreground/70 font-proximaNova">
                Modern computing facilities from Standard 1 for digital literacy
                and technology education
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-orpheus text-primary mb-2">Creative Spaces</h4>
              <p className="text-sm text-foreground/70 font-proximaNova">
                Art studios, music rooms, and project areas for creative
                expression and collaborative learning
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
