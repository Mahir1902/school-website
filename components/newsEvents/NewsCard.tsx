import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { News } from "@/types/newsEvents";
import crest from "@/assets/sis-logo-removebg-preview.png";

interface NewsCardProps {
  news: Pick<News, "title" | "slug" | "publishedDate" | "excerpt" | "featuredImage" | "featuredImageAlt" | "category">;
}

export default function NewsCard({ news }: NewsCardProps) {
  // Content dates are plain YYYY-MM-DD (parsed as UTC); format in UTC so the day never shifts.
  const formattedDate = new Date(news.publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <Link
      href={`/news-events/${news.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-[box-shadow,border-color,translate] duration-300 ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-primary/5">
        {news.featuredImage ? (
          <Image
            src={news.featuredImage}
            alt={news.featuredImageAlt || ""}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Image src={crest} alt="" className="h-24 w-auto opacity-40" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-inglobal font-bold text-xl leading-snug text-primary text-balance line-clamp-2 decoration-secondary decoration-2 underline-offset-4 group-hover:underline">
          {news.title}
        </h3>

        {news.excerpt && (
          <p className="mt-3 font-proximaNova text-[0.95rem] leading-relaxed text-foreground/75 line-clamp-3">
            {news.excerpt}
          </p>
        )}

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-4 border-t border-border pt-4 font-proximaNova text-sm">
            <p className="flex min-w-0 items-center gap-2 text-foreground/70">
              <time dateTime={news.publishedDate}>{formattedDate}</time>
              {news.category && (
                <>
                  <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-secondary" />
                  <span className="truncate font-semibold capitalize text-primary">{news.category}</span>
                </>
              )}
            </p>
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
