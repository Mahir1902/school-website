"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../assets/sis-logo.jpg";
import Link from "next/link";
import { Button } from "./ui/button";
import { Cross, Hamburger, HamburgerIcon, Menu, X } from "lucide-react";

const links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/",
  },
  {
    title: "Academics",
    link: "/",
  },
  {
    title: "Admission",
    link: "/",
  },
  {
    title: "Extracurricular",
    link: "/",
  },
  {
    title: "Life at School",
    link: "/",
  },
  {
    title: "Branches",
    link: "/",
  },
];

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  return (
    <div className="shadow-sm sticky top-0 z-50 bg-white">
      <nav className="w-full">
        <div className="w-11/12 mx-auto p-2 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="h-16 w-16 lg:h-24 lg:w-24"
            />

            <h1 className="hidden  text-primary content-center font-poppins w-64 uppercase xl:flex flex-col justify-start">
              {" "}
              <span className="text-3xl  ">
                Singapore
              </span>{" "}
              <span className="text-primary text-lg text-nowrap">
                {" "}
                International School
              </span>
            </h1>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-6">
            <div className="lg:hidden transition-all ">
              {isMenuOpen ? <><X onClick={toggleMenu} className="text-primary h-6 w-6" /></> : <Menu onClick={toggleMenu} className="text-primary h-6 w-6" />}
              
            </div>
            <div className="gap-6 hidden lg:flex items-center justify-end">
              {links.map((link) => (
                <Link
                  href={link.link}
                  key={link.title}
                  className="hover:text-secondary text-primary font-proximaNova font-bold"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <Button className="hidden lg:flex bg-primary text-white rounded-sm border-2  font-proximaNova font-bold hover:text-white leading-relaxed border-secondary  uppercase">
              <p className="">Apply Now</p>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
