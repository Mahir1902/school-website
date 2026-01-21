"use client";

import { useEffect, useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "SIS has provided an exceptional learning environment for my daughter. The teachers are dedicated, and the international curriculum has prepared her wonderfully for her future.",
    name: "Sarah Thompson",
    role: "Parent of Year 10 Student",
    initials: "ST",
  },
  {
    quote:
      "The variety of extracurricular activities and the emphasis on holistic development has helped me discover my passions beyond academics. I feel truly prepared for university.",
    name: "Ahmed Hassan",
    role: "A-Level Student",
    initials: "AH",
  },
  {
    quote:
      "As an expatriate family, we were looking for a school that celebrates diversity. SIS exceeded our expectations with its inclusive community and global perspective.",
    name: "Maria Rodriguez",
    role: "Parent of Primary Student",
    initials: "MR",
  },
  {
    quote:
      "The facilities are world-class, and the teaching methodology encourages critical thinking and creativity. My son has grown tremendously both academically and personally.",
    name: "David Chen",
    role: "Parent of Middle School Student",
    initials: "DC",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-background py-16 md:py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-orpheus mb-4">
            What Our Community Says
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-foreground/70 text-lg md:text-xl font-proximaNova max-w-3xl mx-auto">
            Hear from our students and parents about their SIS experience
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden py-10">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4 md:px-8"
                >
                  <div className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-lg">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Quote className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-center mb-8">
                      <p className="text-lg md:text-xl text-foreground/80 font-proximaNova leading-relaxed italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                        <span className="text-primary font-orpheus font-bold text-lg">
                          {testimonial.initials}
                        </span>
                      </div>
                      <p className="text-primary font-orpheus text-xl font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-foreground/60 font-proximaNova text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white border border-border rounded-full p-2 shadow-lg hover:bg-primary hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white border border-border rounded-full p-2 shadow-lg hover:bg-primary hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

