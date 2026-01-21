"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Puzzle, Microscope, Globe2, GraduationCap } from "lucide-react";

const programs = [
  {
    icon: Puzzle,
    title: "Playgroup & Pre-Primary",
    ageRange: "Ages 2-5",
    highlights: [
      "Play-based learning",
      "Social development",
      "Creative exploration",
    ],
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: BookOpen,
    title: "Primary School",
    ageRange: "Ages 6-11",
    highlights: [
      "Strong foundation",
      "Core subjects mastery",
      "Interactive learning",
    ],
    color: "from-green-500/20 to-green-600/20",
  },
  {
    icon: Microscope,
    title: "Middle School",
    ageRange: "Ages 11-14",
    highlights: [
      "Subject specialization",
      "Critical thinking",
      "STEM focus",
    ],
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    icon: Globe2,
    title: "Secondary School",
    ageRange: "Ages 14-16",
    highlights: [
      "IGCSE preparation",
      "Independent research",
      "University guidance",
    ],
    color: "from-orange-500/20 to-orange-600/20",
  },
  {
    icon: GraduationCap,
    title: "A-Levels",
    ageRange: "Ages 16-18",
    highlights: [
      "Advanced subjects",
      "University prep",
      "Global recognition",
    ],
    color: "from-red-500/20 to-red-600/20",
  },
];

export default function AcademicPrograms() {
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
      className="bg-background py-16 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
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
            Our Academic Journey
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-foreground/70 text-lg md:text-xl font-proximaNova max-w-3xl mx-auto">
            A comprehensive educational pathway from early years to university
            preparation
          </p>
        </div>

        {/* Scrollable Cards Container */}
        <div className="relative overflow-hidden py-4">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          <div className="scroll-container">
            <div className="flex gap-6 animate-scroll">
              {/* First set of programs */}
              {programs.map((program, index) => (
                <div
                  key={`original-${program.title}-${index}`}
                  className={`flex-shrink-0 w-[300px] md:w-[320px] transition-opacity duration-1000 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="bg-card border border-border rounded-lg p-6 h-full hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300">
                        <program.icon className="w-7 h-7 text-primary" />
                      </div>

                      <h3 className="text-xl font-orpheus text-primary mb-2">
                        {program.title}
                      </h3>

                      <p className="text-secondary font-poppins font-semibold text-sm mb-4">
                        {program.ageRange}
                      </p>

                      <ul className="space-y-2">
                        {program.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-foreground/70 font-proximaNova text-sm flex items-start"
                          >
                            <span className="text-primary mr-2">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless infinite scroll */}
              {programs.map((program, index) => (
                <div
                  key={`duplicate-${program.title}-${index}`}
                  className={`flex-shrink-0 w-[300px] md:w-[320px] transition-opacity duration-1000 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="bg-card border border-border rounded-lg p-6 h-full hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300">
                        <program.icon className="w-7 h-7 text-primary" />
                      </div>

                      <h3 className="text-xl font-orpheus text-primary mb-2">
                        {program.title}
                      </h3>

                      <p className="text-secondary font-poppins font-semibold text-sm mb-4">
                        {program.ageRange}
                      </p>

                      <ul className="space-y-2">
                        {program.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-foreground/70 font-proximaNova text-sm flex items-start"
                          >
                            <span className="text-primary mr-2">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * (320px + 1.5rem) * 5));
          }
        }

        @media (max-width: 768px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-1 * (300px + 1.5rem) * 5));
            }
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .scroll-container:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

