"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
import logo from "@/assets/sis-logo-white.png";
import { MenuIcon, X } from "lucide-react";

const menuItems = [
  { title: "Home", href: "#" },
  { title: "About Us", href: "#about" },
  { title: "Academic Programs", href: "#programs" },
  { title: "Campus Life", href: "#campus" },
  { title: "Admissions", href: "#admissions" },
  { title: "News & Events", href: "#news" },
  { title: "Contact", href: "#contact" },
];

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

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
            <span className="font-le_beaune text-sm md:text-base lg:text-[1.2rem] font-light mb-2">
              Welcome To
            </span>
            <span className="font-le_beaune text-3xl md:text-5xl lg:text-6xl font-light">
              SINGAPORE
            </span>
            <span className="font-le_beaune text-3xl md:text-5xl lg:text-6xl font-light">
              INTERNATIONAL SCHOOL
            </span>
          </h1>
          <div className="h-8 md:h-12 w-[1px] bg-white" />
        </div>
      </div>

      {/* Sliding Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-8">
                {/* Close Button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-6 right-6 text-primary hover:text-secondary transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Logo in Menu */}
                <div className="mb-12 mt-4">
                  <Image
                    src={logo}
                    alt="SIS Logo"
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                </div>

                {/* Navigation Links */}
                <nav>
                  <ul className="space-y-6">
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={item.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-2xl font-orpheus text-primary hover:text-secondary transition-colors duration-300 py-2"
                        >
                          {item.title}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Additional Info */}
                <div className="mt-12 pt-8 border-t border-border">
                  <p className="text-sm font-proximaNova text-foreground/60 mb-2">
                    Contact Us
                  </p>
                  <p className="text-sm font-proximaNova text-foreground mb-1">
                    +65 1234 5678
                  </p>
                  <p className="text-sm font-proximaNova text-foreground">
                    info@sis.edu
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
