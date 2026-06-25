"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
import logo from "@/assets/sis-logo-white.png";
import { MenuIcon } from "lucide-react";
import MobileNavDrawer from "@/components/MobileNavDrawer";

export default function Hero() {
  const images = [hero1, hero2, hero4, hero5, hero6];

  const [currentImage, setCurrentImage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="h-screen relative overflow-hidden">
      {/* Background Images */}
      <div className="w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              index === currentImage ? "opacity-100" : "opacity-0"
            } absolute inset-0 transition-opacity duration-2000 ease-in-out`}
          >
            <div className="absolute inset-0">
              <Image
                src={image}
                alt="hero"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute z-10 inset-0 bg-black/50" />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center flex-col">
        {/* Header with Logo and Menu */}
        <div className="mt-6 md:mt-10 flex w-full justify-between items-center px-4 md:px-8 lg:px-12">
          <div className="flex-1" />
          <Image
            src={logo}
            alt="Singapore International School"
            width={100}
            height={100}
            className="w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44"
          />
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 text-white font-bold hover:text-secondary transition-colors duration-300 cursor-pointer"
              aria-label="Open menu"
            >
              <span className="hidden md:inline font-proximaNova">Menu</span>
              <MenuIcon className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>

        {/* Hero Text */}
        <div className="text-white flex flex-col items-center mt-8 md:mt-12 gap-4 px-4">
          <div className="h-8 md:h-12 w-[1px] bg-white" />
          <h1 className="text-center font-bold flex flex-col">
            <span className="font-inglobal text-sm md:text-base lg:text-[1.2rem] font-light mb-2">
              Welcome To
            </span>
            <span className="font-inglobal text-3xl md:text-5xl lg:text-6xl font-light">
              SINGAPORE
            </span>
            <span className="font-inglobal text-3xl md:text-5xl lg:text-6xl font-light">
              INTERNATIONAL SCHOOL
            </span>
          </h1>
          <div className="h-8 md:h-12 w-[1px] bg-white" />
        </div>
      </div>

      {/* Shared mobile drawer */}
      <MobileNavDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </section>
  );
}
