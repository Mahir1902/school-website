"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/sis-logo-removebg-preview.png";
import { Menu, ChevronDown } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { navItems } from "@/data/navigation";
import MobileNavDrawer from "@/components/MobileNavDrawer";

export default function ScrollNavbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isVisible, setIsVisible] = useState(!isHomePage); // Always visible on non-home pages
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Home page: slide the navbar in/out. It starts hidden via classes so the
  // server render matches; elsewhere it is always shown with no animation.
  useGSAP(() => {
    if (!isHomePage) {
      gsap.set(navRef.current, { clearProps: "transform,opacity,visibility" });
      return;
    }
    gsap.to(navRef.current, {
      y: isVisible ? 0 : -100,
      autoAlpha: isVisible ? 1 : 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  }, { dependencies: [isVisible, isHomePage] });

  // Dropdowns stay mounted (hidden) so they can fade out as well as in.
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-dropdown]").forEach((el) => {
      const open = el.dataset.dropdown === openDropdown;
      gsap.to(el, { autoAlpha: open ? 1 : 0, y: open ? 0 : 10, duration: 0.2 });
    });
  }, { dependencies: [openDropdown], scope: navRef });

  useEffect(() => {
    // On non-home pages, always show navbar
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    // On home page, show navbar only after scrolling past the full-screen hero.
    // -80 so it slides in right as the next section reaches the top.
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight - 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <>
        <nav
          ref={navRef}
          className={`fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-[0_4px_6px_-1px_rgb(156,163,175,0.5)] ${
            isHomePage ? "invisible opacity-0" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 lg:py-2">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <a
                href="#"
                onClick={(e) => handleNavClick(e, "#")}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Image
                  src={logo}
                  alt="Singapore International School"
                  width={100}
                  height={100}
                  className="w-10 h-10 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-105"
                />
                {/* <div className="hidden lg:flex flex-col">
                  <span className="text-primary font-poppins font-semibold text-lg leading-tight">
                    SINGAPORE
                  </span>
                  <span className="text-primary font-poppins text-xs leading-tight">
                    International School
                  </span>
                </div> */}
              </a>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {navItems.map((link) => {
                  const dropdownSections = link.sections ?? [];
                  const hasDropdown = dropdownSections.length > 0;

                  return (
                    <div
                      key={link.title}
                      className="relative"
                      onMouseEnter={() => hasDropdown && setOpenDropdown(link.title)}
                      onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
                    >
                      {hasDropdown ? (
                        <>
                          <Link
                            href={link.href}
                            className="text-sm lg:text-base font-inglobal font-medium text-primary hover:text-secondary transition-colors duration-300 cursor-pointer relative group flex items-center gap-1"
                          >
                            {link.title}
                            <ChevronDown className="w-4 h-4" />
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                          </Link>

                          {/* Dropdown Menu */}
                          <div
                            data-dropdown={link.title}
                            className={`invisible opacity-0 absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-border p-6 w-[600px] z-50 ${
                              link.dropdownAlign === "right" ? "right-0" : "left-0"
                            }`}
                          >
                            <div className="grid grid-cols-3 gap-6">
                              {dropdownSections.map((section) => (
                                <div key={section.title}>
                                  <h3 className="text-xs font-inglobal font-semibold text-primary uppercase mb-3">
                                    {section.title}
                                  </h3>
                                  <ul className="space-y-2">
                                    {section.items.map((item) => (
                                      <li key={item.href}>
                                        <Link
                                          href={item.href}
                                          className="block text-sm font-proximaNova text-foreground/70 hover:text-primary transition-colors"
                                        >
                                          <div className="font-semibold">{item.title}</div>
                                          <div className="text-xs text-foreground/50">
                                            {item.description}
                                          </div>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : link.href.startsWith("/") ? (
                        <Link
                          href={link.href}
                          className="text-sm lg:text-base font-inglobal font-medium text-primary hover:text-secondary transition-colors duration-300 cursor-pointer relative group"
                        >
                          {link.title}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="text-sm lg:text-base font-inglobal font-medium text-primary hover:text-secondary transition-colors duration-300 cursor-pointer relative group"
                        >
                          {link.title}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-primary hover:text-secondary transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>

    {/* Shared mobile drawer — rendered outside the nav so its fixed
        positioning resolves against the viewport, not the transformed nav. */}
    <MobileNavDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
