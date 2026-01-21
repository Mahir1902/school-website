import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import logo from "@/assets/sis-logo.jpg";

const quickLinks = [
  { title: "About Us", href: "#" },
  { title: "Academic Programs", href: "#" },
  { title: "Admissions", href: "#" },
  { title: "Campus Life", href: "#" },
  { title: "News & Events", href: "#" },
  { title: "Contact", href: "#" },
];

const resources = [
  { title: "Student Portal", href: "#" },
  { title: "Parent Portal", href: "#" },
  { title: "Staff Portal", href: "#" },
  { title: "Virtual Tour", href: "#" },
  { title: "Careers", href: "#" },
  { title: "Alumni", href: "#" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="Singapore International School"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-orpheus text-xl text-white">SIS</h3>
                <p className="text-white/70 text-xs font-proximaNova">
                  Excellence in Education
                </p>
              </div>
            </div>
            <p className="text-white/80 font-proximaNova leading-relaxed text-sm">
              Empowering students to become global citizens through world-class
              education, innovation, and character development since 2000.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orpheus text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-secondary font-proximaNova text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-orpheus text-lg mb-6 text-white">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-secondary font-proximaNova text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-orpheus text-lg mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/80 font-proximaNova text-sm leading-relaxed">
                    123 Education Avenue
                    <br />
                    Singapore 123456
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href="tel:+6512345678"
                  className="text-white/80 hover:text-secondary font-proximaNova text-sm transition-colors duration-300"
                >
                  +65 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href="mailto:info@sis.edu"
                  className="text-white/80 hover:text-secondary font-proximaNova text-sm transition-colors duration-300"
                >
                  info@sis.edu
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-white/70 font-proximaNova text-center md:text-left">
              © {new Date().getFullYear()} Singapore International School. All
              rights reserved.
            </p>
            <div className="flex gap-6 text-white/70 font-proximaNova">
              <a
                href="#"
                className="hover:text-secondary transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors duration-300"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}




