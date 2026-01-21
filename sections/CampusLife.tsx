"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";

const campusActivities = [
  {
    image: hero1,
    title: "Academic Excellence",
    category: "Learning",
  },
  {
    image: hero2,
    title: "Sports & Athletics",
    category: "Physical Education",
  },
  {
    image: hero4,
    title: "Arts & Creativity",
    category: "Cultural",
  },
  {
    image: hero5,
    title: "Science & Innovation",
    category: "STEM",
  },
  {
    image: hero6,
    title: "Student Life",
    category: "Community",
  },
  {
    image: hero1,
    title: "Events & Celebrations",
    category: "Activities",
  },
];

export default function CampusLife() {
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
      className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 md:py-24 px-6 md:px-12 lg:px-24"
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
            Experience Campus Life
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-foreground/70 text-lg md:text-xl font-proximaNova max-w-3xl mx-auto">
            A vibrant community where learning extends beyond the classroom
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Large featured item - spans 2 columns on desktop */}
          <div
            className={`lg:col-span-2 lg:row-span-2 relative h-[300px] md:h-[400px] lg:h-full rounded-lg overflow-hidden group cursor-pointer transition-all duration-1000 ${
              isVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <Image
              src={campusActivities[0].image}
              alt={campusActivities[0].title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
              <p className="text-sm font-poppins text-secondary font-semibold mb-1">
                {campusActivities[0].category}
              </p>
              <h3 className="text-2xl md:text-3xl font-orpheus">
                {campusActivities[0].title}
              </h3>
            </div>
          </div>

          {/* Smaller grid items */}
          {campusActivities.slice(1).map((activity, index) => (
            <div
              key={index}
              className={`relative h-[250px] md:h-[300px] lg:h-[195px] rounded-lg overflow-hidden group cursor-pointer transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms",
              }}
            >
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-transform duration-300 group-hover:translate-y-0 translate-y-1">
                <p className="text-xs font-poppins text-secondary font-semibold mb-1">
                  {activity.category}
                </p>
                <h3 className="text-lg md:text-xl font-orpheus">
                  {activity.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

