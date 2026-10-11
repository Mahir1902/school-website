import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/heritage/Reveal";

const options = [
  { title: "Schedule a Tour", description: "Visit our campus and experience SIS firsthand", link: "/" },
  { title: "Apply Now", description: "Start your journey with us today", link: "/" },
  { title: "Learn More", description: "Discover our programs and facilities", link: "/academics" },
];

export default function ApplicationProcess() {
  return (
    <section id="admissions" className="relative mt-28 scroll-mt-24 bg-primary text-primary-foreground">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -top-[79px] left-0 h-20 w-full text-primary" aria-hidden="true">
        <path fill="currentColor" d="M0 80 V40 C180 0 360 0 540 30 C720 60 900 70 1080 40 C1260 10 1350 10 1440 30 V80 Z" />
      </svg>
      <div className="mx-auto max-w-5xl px-4 pb-20 pt-12 text-center md:px-8 md:pb-28">
        <Reveal>
          <h2 className="font-inglobal text-3xl md:text-5xl">Ready to Begin Your Journey?</h2>
          <p className="mx-auto mt-5 max-w-3xl font-proximaNova text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
            Singapore International School provides a well-rounded education from Playgroup to A-Levels, inspiring students to excel intellectually, socially, and creatively. Take the first step towards an exceptional education.
          </p>
          <p className="mt-4 font-inglobal text-2xl text-primary-foreground md:text-3xl">Visit us in Dhaka, we&apos;d love to show you around.</p>
        </Reveal>
        <Reveal className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-start" delay={150}>
          {options.map((o, i) => (
            <Link
              key={o.title}
              href={o.link}
              className={`group inline-flex flex-col items-center rounded-full px-8 py-4 font-poppins transition-transform duration-300 hover:-translate-y-1 ${
                i === 0 ? "h-btn-sweep bg-secondary text-secondary-foreground" : "border-2 border-primary-foreground/70 text-primary-foreground hover:border-secondary hover:bg-primary-foreground/10"
              }`}
            >
              <span className="flex items-center gap-2 text-lg font-semibold">
                {o.title} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
              <span className="text-xs font-medium opacity-80">{o.description}</span>
            </Link>
          ))}
        </Reveal>
        <p className="mt-10 font-proximaNova text-primary-foreground/85">
          Questions? Contact our admissions team at{" "}
          <a href="mailto:admissions@sis.edu" className="font-semibold text-primary-foreground underline decoration-secondary decoration-2">admissions@sis.edu</a> or call{" "}
          <a href="tel:+1234567890" className="font-semibold text-primary-foreground underline decoration-secondary decoration-2">+123 456 7890</a>
        </p>
      </div>
    </section>
  );
}
