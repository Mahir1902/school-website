import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import InfoCard from "@/components/academics/InfoCard";
import CTAButton from "@/components/academics/CTAButton";
import { academicStats, overviewContent, programmeCards } from "@/data/academics";
import hero1 from "@/assets/hero-1.jpg";
import scienceImage from "@/assets/science_and_innovation.jpg";
import artsImage from "@/assets/arts_and_creativity.jpg";
import sportsImage from "@/assets/sports.jpg";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Academic Programs Overview",
  description: overviewContent.description,
};

export default function AcademicsOverviewPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title={overviewContent.title}
        subtitle={overviewContent.subtitle}
        backgroundImage={hero1}
        height="large"
      />

      {/* Overview Description */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed whitespace-pre-line">
            {overviewContent.description}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <SectionHeading>Our Academic Excellence</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {academicStats.map((stat, index) => (
            <InfoCard
              key={index}
              icon={stat.icon!}
              title={`${stat.value}${stat.suffix || ""}`}
              description={stat.label}
              variant="primary"
            />
          ))}
        </div>
      </section>

      {/* Visual Section: Academic Excellence in Action */}
      <section className="relative overflow-hidden rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Science */}
          <div className="relative h-64 md:h-80 overflow-hidden group">
            <Image
              src={scienceImage}
              alt="Science and Innovation"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-white font-orpheus text-2xl mb-1">Science & Innovation</h3>
                <p className="text-white/90 font-proximaNova text-sm">Hands-on learning in modern laboratories</p>
              </div>
            </div>
          </div>

          {/* Arts */}
          <div className="relative h-64 md:h-80 overflow-hidden group">
            <Image
              src={artsImage}
              alt="Arts and Creativity"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-white font-orpheus text-2xl mb-1">Arts & Creativity</h3>
                <p className="text-white/90 font-proximaNova text-sm">Nurturing creative expression and talent</p>
              </div>
            </div>
          </div>

          {/* Sports */}
          <div className="relative h-64 md:h-80 overflow-hidden group">
            <Image
              src={sportsImage}
              alt="Sports and Physical Education"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-white font-orpheus text-2xl mb-1">Sports & Wellness</h3>
                <p className="text-white/90 font-proximaNova text-sm">Building healthy minds and bodies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Cards */}
      <section>
        <SectionHeading>Our Academic Programmes</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {programmeCards.map((programme) => (
            <div
              key={programme.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-orpheus text-primary mb-1">
                  {programme.title}
                </h3>
                <p className="text-sm text-secondary font-poppins font-semibold">
                  {programme.subtitle}
                </p>
              </div>

              <p className="text-foreground/70 font-proximaNova text-sm mb-4 flex-grow">
                {programme.description}
              </p>

              <ul className="space-y-2 mb-6">
                {programme.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-foreground/70 font-proximaNova flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <CTAButton
                href={programme.href}
                variant="outline"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full"
              >
                Learn More
              </CTAButton>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action with Background Image */}
      <section className="relative overflow-hidden rounded-lg">
        <div className="relative h-[400px]">
          <Image
            src={hero1}
            alt="Join our academic community"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/95" />

          <div className="relative h-full flex items-center justify-center text-center px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-orpheus text-white mb-4">
                Ready to Begin Your Child's Academic Journey?
              </h2>
              <p className="text-white font-proximaNova text-lg mb-8">
                Discover how our comprehensive academic programs can prepare your child
                for success in a global environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton
                  href="/#admissions"
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-black border-0"
                >
                  Apply Now
                </CTAButton>
                <CTAButton
                  href="/#contact"
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white"
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
