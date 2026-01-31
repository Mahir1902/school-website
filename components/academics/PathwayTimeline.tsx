"use client";

import React, { useState, useEffect, useRef } from "react";
import { TimelineStep } from "@/types/academics";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface PathwayTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

// Icon resolver function
const getIcon = (icon: LucideIcon | string): LucideIcon => {
  if (typeof icon === "string") {
    return (Icons as any)[icon] || Icons.Circle;
  }
  return icon;
};

export default function PathwayTimeline({ steps, className }: PathwayTimelineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        <div className="text-foreground/60">Loading timeline...</div>
      </div>
    );
  }

  return (
    <div ref={timelineRef} className={cn("w-full", className)}>
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:flex items-start justify-between relative">
        {/* Connecting Line */}
        <div className="absolute top-7 left-0 right-0 h-0.5 bg-secondary/30" style={{ zIndex: 0 }} />

        {steps.map((step, index) => {
          const Icon = getIcon(step.icon);
          if (!Icon) return null;
          return (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center flex-1 transition-all duration-700 relative",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 150}ms`, zIndex: 1 }}
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 border-4 border-white shadow-md">
                <Icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <div className="text-center max-w-[180px]">
                <div className="text-xs font-poppins text-secondary font-semibold mb-1">
                  {step.age}
                </div>
                <h3 className="text-base font-orpheus text-primary mb-2">
                  {step.stage}
                </h3>
                <p className="text-sm font-proximaNova text-foreground/70">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile/Tablet: Vertical Timeline */}
      <div className="lg:hidden flex flex-col gap-6">
        {steps.map((step, index) => {
          const Icon = getIcon(step.icon);
          if (!Icon) return null;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={index}
              className={cn(
                "flex gap-4 relative transition-all duration-700",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon Column with Connecting Line */}
              <div className="flex flex-col items-center">
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white shadow-md flex-shrink-0">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Connecting Line */}
                {!isLast && (
                  <div className="w-0.5 flex-1 bg-secondary/30 min-h-[60px] mt-2" />
                )}
              </div>

              {/* Content Column */}
              <div className="flex-1 pb-6">
                <div className="text-xs font-poppins text-secondary font-semibold mb-1">
                  {step.age}
                </div>
                <h3 className="text-lg font-orpheus text-primary mb-2">
                  {step.stage}
                </h3>
                <p className="text-sm font-proximaNova text-foreground/70">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
