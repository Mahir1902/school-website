"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    end: 500,
    suffix: "+",
    label: "Students Enrolled",
  },
  {
    end: 20,
    suffix: "+",
    label: "Years of Excellence",
  },
  {
    end: 98,
    suffix: "%",
    label: "University Placement",
  },
  {
    end: 25,
    suffix: "+",
    label: "Nationalities",
  },
];

function Counter({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, setHasStarted };
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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
      className="bg-primary text-white py-16 md:py-24 px-6 md:px-12 lg:px-24"
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
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-orpheus mb-4">
            Our Impact in Numbers
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-white/80 text-lg md:text-xl font-proximaNova max-w-3xl mx-auto">
            Building a legacy of excellence through dedication and achievement
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  index,
  isVisible,
}: {
  stat: { end: number; suffix: string; label: string };
  index: number;
  isVisible: boolean;
}) {
  const { count, setHasStarted } = Counter({
    end: stat.end,
    suffix: stat.suffix,
  });

  useEffect(() => {
    if (isVisible) {
      setHasStarted(true);
    }
  }, [isVisible, setHasStarted]);

  return (
    <div
      className={`text-center transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
      }}
    >
      <div className="mb-4">
        <span className="text-5xl md:text-6xl lg:text-7xl font-bold font-orpheus text-secondary">
          {count}
          {stat.suffix}
        </span>
      </div>
      <p className="text-lg md:text-xl font-proximaNova text-white/90">
        {stat.label}
      </p>
    </div>
  );
}

