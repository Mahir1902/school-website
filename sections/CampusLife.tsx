import Image from "next/image";
import type { CSSProperties } from "react";
import awards from "@/assets/BC_Awards.jpg";
import sports from "@/assets/sports.jpg";
import arts from "@/assets/arts_and_creativity.jpg";
import science from "@/assets/science_and_innovation.jpg";
import extracurricular from "@/assets/extracurricular.jpg";
import events from "@/assets/events_and_celebrations.jpg";
import Reveal from "@/components/heritage/Reveal";
import SectionHead from "@/components/heritage/SectionHead";

const activities = [
  { image: awards, title: "Academic Excellence", category: "Learning", tilt: "-3deg" },
  { image: sports, title: "Sports & Athletics", category: "Physical Education", tilt: "2deg" },
  { image: arts, title: "Arts & Creativity", category: "Cultural", tilt: "-1.5deg" },
  { image: science, title: "Science & Innovation", category: "STEM", tilt: "2.5deg" },
  { image: extracurricular, title: "Clubs & Societies", category: "Extracurricular", tilt: "-2deg" },
  { image: events, title: "Events & Celebrations", category: "Activities", tilt: "1.5deg" },
];

export default function CampusLife() {
  return (
    <section id="campus" className="scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <SectionHead title="Experience Campus Life" sub="A vibrant community where learning extends beyond the classroom. From Victory Day to sports day, the year is full of celebrations." />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {activities.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 120} className={i % 3 === 1 ? "lg:translate-y-10" : ""}>
            <figure className="h-polaroid bg-card p-3 pb-5 shadow-lg ring-1 ring-border" style={{ "--h-rot": c.tilt } as CSSProperties}>
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image src={c.image} alt={c.title} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 420px" className="object-cover" />
              </div>
              <figcaption className="mt-4 px-1 text-center">
                <span className="block font-inglobal text-xl text-primary">{c.title}</span>
                <span className="mt-1 block font-proximaNova text-sm font-semibold text-secondary-ink">{c.category}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
