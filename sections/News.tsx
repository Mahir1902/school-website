import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import crest from "@/assets/sis-logo-removebg-preview.png";
import { getAllNews } from "@/lib/content";
import Reveal from "@/components/heritage/Reveal";
import SectionHead from "@/components/heritage/SectionHead";

const tilts = ["-1.5deg", "1deg", "-0.75deg"];
const utc = (d: Date, o: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-GB", { ...o, timeZone: "UTC" });

export default function News() {
  const news = getAllNews().slice(0, 3);
  return (
    <section id="news" className="scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <SectionHead title="Latest News & Events" sub="Stay updated with the latest happenings at SIS" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {news.map((n, i) => {
          const d = new Date(n.publishedDate);
          return (
            <Reveal key={n.id} delay={i * 120}>
              <Link href={`/news-events/${n.slug}`} className="h-postcard group block h-full rounded-xl border border-border bg-card p-3 shadow-lg">
                <div className="h-postcard-photo relative aspect-[4/3] overflow-hidden rounded-lg bg-primary/5 shadow-md" style={{ "--h-rot": tilts[i % 3] } as CSSProperties}>
                  {n.featuredImage ? (
                    <Image src={n.featuredImage} alt={n.featuredImageAlt || ""} fill sizes="(max-width: 768px) 90vw, 400px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Image src={crest} alt="" className="h-24 w-auto opacity-40" />
                    </div>
                  )}
                  <span className="absolute right-3 top-3 flex h-16 w-16 flex-col items-center justify-center rounded-md bg-secondary text-center font-poppins leading-none text-secondary-foreground shadow-md">
                    <span className="text-xl font-bold">{utc(d, { day: "numeric" })}</span>
                    <span className="mt-0.5 text-[0.65rem] font-semibold uppercase">{utc(d, { month: "short", year: "2-digit" })}</span>
                  </span>
                </div>
                <div className="px-3 pb-3 pt-5">
                  <h3 className="font-inglobal text-xl text-primary decoration-secondary decoration-2 underline-offset-4 group-hover:underline">{n.title}</h3>
                  <p className="mt-1 font-proximaNova text-sm font-semibold text-secondary-ink">
                    <time dateTime={n.publishedDate}>{utc(d, { day: "numeric", month: "long", year: "numeric" })}</time> · <span className="capitalize">{n.category}</span>
                  </p>
                  {n.excerpt && <p className="mt-2 line-clamp-3 font-proximaNova leading-relaxed text-foreground/75">{n.excerpt}</p>}
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-14 text-center">
        <Link href="/news-events/news" className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-3 font-poppins font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
          View All News <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
