"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoImage from "@/assets/sis-logo-removebg-preview.png";
import {
  GraduationCap,
  Users,
  Laptop,
  Trophy,
  BookOpen,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Internationally Recognised Curriculum",
    description:
      "Pearson Edexcel approved centre offering Cambridge & Edexcel O' Levels and A' Levels, plus International PLSC examinations — opening doors to universities worldwide.",
  },
  {
    icon: Users,
    title: "Personalised Attention",
    description:
      "Small class sizes ensure meaningful teacher-student interaction. Pre-school classrooms have two dedicated teachers, plus student attendants on every floor for extra care.",
  },
  {
    icon: Laptop,
    title: "Future-Ready Learning",
    description:
      "Compulsory computer education from Class 1, a dedicated Robotics Club, STEM Expo participation, and audio-visual learning integrated into everyday lessons.",
  },
  {
    icon: Trophy,
    title: "Sports & Activities",
    description:
      "Football turf, basketball court, table tennis, badminton, chess, karate, music, drama, debate, and art — we nurture talents beyond the classroom.",
  },
  {
    icon: BookOpen,
    title: "Value for Families",
    description:
      "Free textbooks for pre-school students and over 50% of books provided at no cost for primary level. School-owned transport available for added convenience.",
  },
  {
    icon: Heart,
    title: "Character & Values",
    description:
      "Arabic and Quranic studies woven into the curriculum, regular cultural celebrations, and a philosophy rooted in \"Everyone Counts\" — building well-rounded individuals.",
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
      className="bg-muted py-16 md:py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* Subtle Logo Background */}
      <div className="absolute inset-0 left-[-100px] top-[-100px] pointer-events-none">
        <div className="relative w-[700px] h-[700px] opacity-[0.08] rotate-[-24deg]">
          <Image
            src={logoImage}
            alt=""
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
              className={`bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/30 ${
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

