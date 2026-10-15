import JourneyLine from "@/components/heritage/JourneyLine";
import Reveal from "@/components/heritage/Reveal";
import SectionHead from "@/components/heritage/SectionHead";

const programs = [
  { title: "Playgroup & Pre-Primary", ageRange: "Ages 2-5", highlights: ["Play-based learning", "Social development", "Creative exploration"] },
  { title: "Primary School", ageRange: "Ages 6-11", highlights: ["Strong foundation", "Core subjects mastery", "Interactive learning"] },
  { title: "Middle School", ageRange: "Ages 11-14", highlights: ["Subject specialization", "Critical thinking", "STEM focus"] },
  { title: "Secondary School", ageRange: "Ages 14-16", highlights: ["IGCSE preparation", "Independent research", "University guidance"] },
  { title: "A-Levels", ageRange: "Ages 16-18", highlights: ["Advanced subjects", "University prep", "Global recognition"] },
];

export default function AcademicPrograms() {
  return (
    <section id="programs" className="scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <SectionHead title="Our Academic Journey" sub="A comprehensive educational pathway from early years to university preparation" />
      <div className="relative mx-auto max-w-5xl">
        <JourneyLine />
        <ol className="relative flex flex-col gap-10 md:gap-0">
          {programs.map((p, i) => {
            const right = i % 2 === 1;
            return (
              <li key={p.title} className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-4 md:min-h-[12rem] md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] md:gap-6">
                <Reveal className={`relative z-0 order-2 min-w-0 rounded-2xl border border-border bg-card p-6 shadow-md md:order-none md:row-start-1 ${right ? "md:col-start-3" : "md:col-start-1 md:text-right"}`} from={right ? "right" : "left"}>
                  <h3 className="font-inglobal text-2xl text-primary">{p.title}</h3>
                  <p className="mt-1 font-poppins text-sm font-semibold text-secondary-ink">{p.ageRange}</p>
                  <ul className={`mt-3 flex flex-wrap gap-2 ${right ? "" : "md:justify-end"}`}>
                    {p.highlights.map((h) => (
                      <li key={h} className="rounded-full bg-primary/10 px-3 py-1 font-proximaNova text-sm font-semibold text-primary">{h}</li>
                    ))}
                  </ul>
                </Reveal>
                <span data-node className="relative z-20 order-1 flex h-14 w-14 items-center justify-center rounded-full bg-primary font-inglobal text-xl text-primary-foreground shadow-lg ring-4 ring-background md:order-none md:col-start-2 md:row-start-1 md:mx-auto md:h-16 md:w-16">
                  {i + 1}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
