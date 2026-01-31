"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: StaticImageData;
  height?: "small" | "medium" | "large";
  overlay?: boolean;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  height = "medium",
  overlay = true,
}: PageHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const heightClasses = {
    small: "h-[200px] md:h-[250px]",
    medium: "h-[300px] md:h-[350px] lg:h-[400px]",
    large: "h-[400px] md:h-[450px] lg:h-[500px]",
  };

  return (
    <div
      ref={heroRef}
      className={cn(
        "relative w-full overflow-hidden rounded-lg",
        heightClasses[height]
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Fallback gradient if no image */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70" />
      )}

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      {/* Content */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center",
          "px-6 md:px-12 text-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <h1 className="text-white font-orpheus text-3xl md:text-4xl lg:text-5xl mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/90 font-proximaNova text-lg md:text-xl lg:text-2xl max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
