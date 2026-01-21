"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import hero1 from "@/assets/hero-1.jpg";

export default function Welcome() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
      className="bg-background py-16 md:py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-orpheus leading-tight">
                Nurturing Excellence Since 2005
              </h2>
              <div className="w-20 h-1 bg-secondary"></div>
            </div>
            <div className="space-y-4 text-foreground/80">
              <p className="text-lg md:text-xl font-proximaNova leading-relaxed">
                At Singapore International School, we believe in empowering
                students to become global citizens equipped with the knowledge,
                skills, and values to thrive in an ever-changing world.
              </p>
              <p className="text-lg font-proximaNova leading-relaxed">
                Our internationally recognized curriculum, combined with
                world-class facilities and a diverse community, creates an
                environment where every student can discover their potential and
                pursue their passions.
              </p>
              <p className="text-lg font-proximaNova leading-relaxed">
                We are committed to academic excellence, character development,
                and fostering creativity—preparing our students not just for
                university, but for life.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={hero1}
              alt="Singapore International School Campus"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

