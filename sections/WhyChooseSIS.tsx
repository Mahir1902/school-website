"use client";

import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Users,
  Building2,
  Sparkles,
  Globe,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "International Curriculum",
    description:
      "Cambridge and IB-aligned programs that prepare students for global success and university excellence.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description:
      "Experienced, internationally qualified teachers dedicated to inspiring and nurturing every student.",
  },
  {
    icon: Building2,
    title: "Modern Facilities",
    description:
      "State-of-the-art classrooms, laboratories, sports facilities, and technology to enhance learning.",
  },
  {
    icon: Sparkles,
    title: "Holistic Development",
    description:
      "A balanced approach to academics, arts, sports, and character building for well-rounded growth.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description:
      "A diverse student body representing multiple nationalities, fostering cultural understanding.",
  },
  {
    icon: Trophy,
    title: "Proven Excellence",
    description:
      "Consistent outstanding results and successful university placements at top institutions worldwide.",
  },
];

export default function WhyChooseSIS() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-muted py-16 md:py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-orpheus mb-4">
            Why Choose SIS?
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-foreground/70 text-lg md:text-xl font-proximaNova max-w-3xl mx-auto">
            Discover what makes Singapore International School the ideal choice
            for your child&apos;s educational journey
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-card p-8 rounded-lg border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/30 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-orpheus text-primary">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 font-proximaNova leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

