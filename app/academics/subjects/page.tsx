import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import SubjectAccordion from "@/components/academics/SubjectAccordion";
import { SubjectCategoryData } from "@/components/academics/SubjectGrid";
import { subjectsByCategory, englishLanguagePolicy } from "@/data/academics/subjects";
import hero4 from "@/assets/hero-4.jpg";
import scienceImage from "@/assets/science_and_innovation.jpg";
import artsImage from "@/assets/arts_and_creativity.jpg";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Subjects Offered",
  description:
    "Explore our comprehensive curriculum spanning languages, sciences, humanities, technology, arts, and religious studies.",
};

export default function SubjectsPage() {
  // Transform subjects by category into SubjectGrid format
  const subjectCategories: SubjectCategoryData[] = Object.entries(subjectsByCategory).map(
    ([category, subjects]) => ({
      category,
      subjects: subjects.map((subject) => ({
        name: subject.name,
        description: subject.description,
      })),
    })
  );

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title="A Well-Rounded Curriculum"
        subtitle="Comprehensive Education from Pre-School to A-Levels"
        backgroundImage={hero4}
        height="medium"
      />

      {/* Overview Description */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed">
            Our curriculum offers a broad range of subjects designed to develop
            well-rounded individuals with strong academic foundations, critical
            thinking skills, and creative expression. From early childhood to
            A-Levels, students engage with subjects that prepare them for global
            opportunities.
          </p>
        </div>
      </section>

      {/* English Language Policy Callout */}
      <section>
        <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-orpheus text-primary">
              English Medium Instruction
            </h2>
          </div>
          <p className="text-foreground/70 font-proximaNova text-lg leading-relaxed whitespace-pre-line">
            {englishLanguagePolicy}
          </p>
        </div>
      </section>

      {/* Visual Subject Showcase */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sciences */}
        <div className="relative overflow-hidden rounded-lg h-80 group">
          <Image
            src={scienceImage}
            alt="Science Education"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent flex items-end p-8">
            <div>
              <h3 className="text-white font-orpheus text-3xl mb-3">Sciences</h3>
              <p className="text-white/95 font-proximaNova leading-relaxed">
                From Biology and Chemistry to Physics and Computer Science, our
                science programs foster curiosity and innovation through
                hands-on experiments and cutting-edge learning.
              </p>
            </div>
          </div>
        </div>

        {/* Creative Arts */}
        <div className="relative overflow-hidden rounded-lg h-80 group">
          <Image
            src={artsImage}
            alt="Arts Education"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/50 to-transparent flex items-end p-8">
            <div>
              <h3 className="text-white font-orpheus text-3xl mb-3">Creative Arts</h3>
              <p className="text-white/95 font-proximaNova leading-relaxed">
                Explore music, visual arts, drama, and design. Our arts curriculum
                nurtures creative expression and develops aesthetic appreciation
                alongside technical skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects by Category */}
      <section>
        <SectionHeading>Subjects Offered Across All Levels</SectionHeading>

        <div className="bg-primary/5 rounded-lg p-6 mb-6">
          <p className="text-foreground/70 font-proximaNova">
            Explore our comprehensive curriculum by clicking on each category below
            to view the subjects we offer across all educational levels.
          </p>
        </div>

        <SubjectAccordion categories={subjectCategories} defaultOpenIndex={0} />
      </section>

      {/* Subject Availability Note */}
      <section className="bg-card border border-border rounded-lg p-8">
        <h3 className="text-xl font-orpheus text-primary mb-4 text-center">
          Subject Availability
        </h3>
        <div className="max-w-3xl mx-auto">
          <p className="text-foreground/70 font-proximaNova mb-4">
            Subject availability varies by programme level:
          </p>
          <ul className="space-y-2 text-foreground/70 font-proximaNova">
            <li className="flex items-start gap-3">
              <span className="text-secondary mt-1 flex-shrink-0">•</span>
              <span>
                <strong>Pre-School:</strong> Foundation subjects including English,
                Bengali, Arabic, Mathematics, General Science, Islamic Studies,
                Music, and Art & Crafts
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary mt-1 flex-shrink-0">•</span>
              <span>
                <strong>Primary:</strong> Expanded curriculum with Computer
                Education (from Standard 1), History, Geography, and specialized
                instruction
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary mt-1 flex-shrink-0">•</span>
              <span>
                <strong>Secondary:</strong> Specialist teachers for sciences
                (Physics, Chemistry, Biology), advanced humanities, technology, and
                arts
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary mt-1 flex-shrink-0">•</span>
              <span>
                <strong>IGCSE & A-Levels:</strong> Choice of 37 IGCSE subjects and
                21 A-Level subjects for university preparation
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Links to Programme Pages */}
      <section className="bg-primary/5 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-orpheus text-primary mb-4">
          Explore Our Academic Programmes
        </h3>
        <p className="text-foreground/70 font-proximaNova mb-6 max-w-2xl mx-auto">
          Learn more about how these subjects are integrated into our different
          programme levels.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/academics/pre-school"
            className="px-6 py-2 bg-white border border-border rounded-lg hover:shadow-md transition-shadow font-proximaNova font-semibold text-primary"
          >
            Pre-School
          </a>
          <a
            href="/academics/primary"
            className="px-6 py-2 bg-white border border-border rounded-lg hover:shadow-md transition-shadow font-proximaNova font-semibold text-primary"
          >
            Primary
          </a>
          <a
            href="/academics/secondary"
            className="px-6 py-2 bg-white border border-border rounded-lg hover:shadow-md transition-shadow font-proximaNova font-semibold text-primary"
          >
            Secondary
          </a>
          <a
            href="/academics/igcse"
            className="px-6 py-2 bg-white border border-border rounded-lg hover:shadow-md transition-shadow font-proximaNova font-semibold text-primary"
          >
            IGCSE
          </a>
          <a
            href="/academics/a-levels"
            className="px-6 py-2 bg-white border border-border rounded-lg hover:shadow-md transition-shadow font-proximaNova font-semibold text-primary"
          >
            A-Levels
          </a>
        </div>
      </section>
    </div>
  );
}
