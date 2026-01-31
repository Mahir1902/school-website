"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import principalImage from "@/assets/principals_message.jpg";

export default function PrincipalsWelcome() {
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
      className="relative py-20 bg-white overflow-hidden border border-red-500"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={` order-2 lg:order-1 pace-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Orange accent line */}
            <div className="w-16 h-1 bg-orange-500" />

            {/* Heading */}
            <h2 className="text-5xl md:text-6xl font-orpheus font-bold text-primary leading-tight">
              PRINCIPAL&apos;S
              <br />
              WELCOME
            </h2>


            {/* Body Text */}
            <p className="text-lg font-proximaNova font-bold text-gray-600 leading-relaxed flex flex-col gap-2">
            <span>
              Hello and welcome!
              On behalf of our entire team, I&apos;m delighted you&apos;ve found your way to Singapore International School Dhaka.
            </span>
<span>At SIS, we&apos;re passionate about creating a place where students feel excited to learn, confident to ask questions, and supported to be themselves. We combine strong academics with a genuine focus on character because we believe education is about preparing young people for life, not just exams.</span>
<span>Our community is warm, our classrooms are engaging, and our doors are always open. Whether you&apos;re exploring schools for your child or already part of the SISD family, we&apos;re so glad you&apos;re here.</span>
<span>I look forward to meeting you.</span>
            </p>
          </div>

          {/* Right Image */}
          <div
            className={` order-1 lg:order-2 relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative aspect-[5/3] lg:aspect-[3/4] overflow-hidden lg:rounded-lg ">
              {/* green accent bar - behind the image */}
              <div className="w-40 bg-primary h-[40%] absolute   right-0 top-1/2 -translate-y-1/2 bottom-0 z-0 rounded-r-lg" />

              {/* Principal Image - in front */}
              <Image
                src={principalImage}
                alt="Principal at Singapore International School"
                
                className="object-cover absolute lg:right-3 lg:top-46 lg:bottom-0 z-10 rounded-lg"
                
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
