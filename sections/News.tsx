"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import hero2 from "@/assets/hero-2.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const newsItems = [
  {
    image: hero2,
    date: "December 5, 2024",
    title: "Annual Sports Day 2024",
    excerpt:
      "Students showcased exceptional talent and sportsmanship at our annual sports day, featuring athletics, team sports, and cultural performances.",
    link: "#",
  },
  {
    image: hero4,
    date: "November 28, 2024",
    title: "Science Fair Excellence",
    excerpt:
      "Our students won multiple awards at the National Science Fair, demonstrating innovation in STEM projects and research.",
    link: "#",
  },
  {
    image: hero5,
    date: "November 20, 2024",
    title: "University Fair Success",
    excerpt:
      "Over 40 prestigious universities visited SIS to meet with our A-Level students, offering guidance on admissions and scholarships.",
    link: "#",
  },
];

export default function News() {
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
      className="bg-muted/30 py-16 md:py-24 px-6 md:px-12 lg:px-24"
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
            Latest News & Events
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-foreground/70 text-lg md:text-xl font-proximaNova max-w-3xl mx-auto">
            Stay updated with the latest happenings at SIS
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className={`bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-secondary text-sm font-poppins mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-orpheus text-primary mb-3 group-hover:text-primary/80 transition-colors">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-foreground/70 font-proximaNova text-sm leading-relaxed mb-4">
                  {item.excerpt}
                </p>

                {/* Read More Link */}
                <a
                  href={item.link}
                  className="inline-flex items-center gap-2 text-primary font-poppins text-sm font-semibold hover:gap-3 transition-all duration-300"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-md font-poppins font-medium hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            View All News
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

