import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import crestWhite from "@/assets/sis-logo-white.png";

const blurb = "Empowering students to become global citizens through world-class education, innovation, and character development since 2000.";
const quickLinks = ["About Us", "Academic Programs", "Admissions", "Campus Life", "News & Events", "Contact"];
const resources = ["Student Portal", "Parent Portal", "Staff Portal", "Virtual Tour", "Careers", "Alumni"];
const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="flex flex-col items-center text-center">
          <Image src={crestWhite} alt="" width={72} height={72} className="h-16 w-16" />
          <p className="mt-4 font-inglobal text-2xl">Singapore International School</p>
          <p className="mt-1 font-proximaNova text-sm font-semibold text-primary-foreground/80">Dhaka, Bangladesh</p>
          <p className="mt-6 max-w-xl font-proximaNova text-sm font-semibold leading-relaxed text-primary-foreground/80">{blurb}</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <a key={label} href="#" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-secondary hover:text-secondary-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-primary-foreground/15 pt-10 text-center sm:grid-cols-3 sm:text-left">
          <div className="min-w-0">
            <h3 className="font-inglobal text-lg text-primary-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((l) => (
                <li key={l}><a href="#" className="font-proximaNova text-sm font-semibold text-primary-foreground/80 underline-offset-4 hover:text-primary-foreground hover:underline">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="font-inglobal text-lg text-primary-foreground">Resources</h3>
            <ul className="mt-4 space-y-2">
              {resources.map((l) => (
                <li key={l}><a href="#" className="font-proximaNova text-sm font-semibold text-primary-foreground/80 underline-offset-4 hover:text-primary-foreground hover:underline">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="font-inglobal text-lg text-primary-foreground">Contact Us</h3>
            <ul className="mt-4 space-y-3 font-proximaNova text-sm font-semibold text-primary-foreground/80">
              <li className="flex items-start justify-center gap-2 sm:justify-start"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" /><span>123 Education Avenue<br />Singapore 123456</span></li>
              <li className="flex items-center justify-center gap-2 sm:justify-start"><Phone className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" /><a href="tel:+6512345678" className="text-primary-foreground underline-offset-4 hover:underline">+65 1234 5678</a></li>
              <li className="flex items-center justify-center gap-2 sm:justify-start"><Mail className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" /><a href="mailto:info@sis.edu" className="text-primary-foreground underline-offset-4 hover:underline">info@sis.edu</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 font-proximaNova text-xs text-primary-foreground/70 md:flex-row">
          <p>© {new Date().getFullYear()} Singapore International School. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="underline-offset-4 hover:text-primary-foreground hover:underline">Privacy Policy</a>
            <a href="#" className="underline-offset-4 hover:text-primary-foreground hover:underline">Terms of Service</a>
            <a href="#" className="underline-offset-4 hover:text-primary-foreground hover:underline">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
