"use client";

import { Button } from "@/components/ui/button";
import { Calendar, FileText, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const options = [
  {
    title: "Schedule a Tour",
    description: "Visit our campus and experience SIS firsthand",
    icon: Calendar,
    link: "/",
  },
  {
    title: "Apply Now",
    description: "Start your journey with us today",
    icon: FileText,
    link: "/",
  },
  {
    title: "Learn More",
    description: "Discover our programs and facilities",
    icon: Info,
    link: "/",
  },
];

export default function ApplicationProcess() {
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
      id="admissions"
      ref={sectionRef}
      className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 md:py-28 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-10">
          {/* Header */}
          <div
            className={`flex flex-col gap-4 items-center max-w-4xl transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl leading-tight font-orpheus text-center">
              Ready to Begin Your Journey?
            </h2>
            <div className="w-20 h-1 bg-secondary"></div>
            <p className="text-foreground/70 text-lg md:text-xl px-4 font-proximaNova text-center leading-relaxed">
              Singapore International School provides a well-rounded education
              from Playgroup to A-Levels, inspiring students to excel
              intellectually, socially, and creatively. Take the first step
              towards an exceptional education.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
            {options.map((option, index) => (
              <div
                key={option.title}
                className={`bg-card border-2 border-border hover:border-primary rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <option.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-orpheus text-primary">
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/60 font-proximaNova text-md font-medium">
                    {option.description}
                  </p>

                  {/* Button */}
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-white font-poppins font-medium shadow-sm hover:shadow-md transition-all duration-300 mt-2"
                  >
                    <a href={option.link}>{option.title}</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div
            className={`text-center mt-6 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-foreground/60 font-proximaNova text-md font-medium">
              Questions? Contact our admissions team at{" "}
              <a
                href="mailto:admissions@sis.edu"
                className="text-primary hover:underline font-semibold"
              >
                admissions@sis.edu
              </a>{" "}
              or call{" "}
              <a
                href="tel:+1234567890"
                className="text-primary hover:underline font-semibold"
              >
                +123 456 7890
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
