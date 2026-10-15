import { getStats } from "@/lib/content";
import SectionHead from "@/components/heritage/SectionHead";
import StatsClient from "./StatsClient";

export default function Stats() {
  return (
    <section className="bg-muted px-4 py-16 md:px-8 md:py-24">
      <SectionHead title="Our Impact in Numbers" sub="Building a legacy of excellence through dedication and achievement" />
      <div className="mx-auto max-w-6xl">
        <StatsClient stats={getStats()} />
      </div>
    </section>
  );
}
