import fs from "node:fs";
import path from "node:path";
import type { News, Event, Notice, GalleryImage, VideoGallery } from "@/types/newsEvents";
import type { CalendarEvent } from "@/types/academics";

// Content is edited in Pages CMS (see .pages.yml) and committed as JSON under /content.
// Server-only: read at build time (and on ISR re-render; content/** is traced in next.config.ts).
const root = path.join(process.cwd(), "content");

function readCollection<T>(dir: string): T[] {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ id: f.slice(0, -5), ...JSON.parse(fs.readFileSync(path.join(full, f), "utf8")) }));
}

function readList<T>(file: string): T[] {
  return JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
}

const time = (d?: string) => (d ? new Date(d).getTime() : 0);
const isPast = (e: Event) => time(e.startDate) < Date.now();

export const getAllNews = () =>
  readCollection<News>("news").sort((a, b) => time(b.publishedDate) - time(a.publishedDate));

export const getAllEvents = () =>
  readCollection<Event>("events").sort((a, b) => time(a.startDate) - time(b.startDate));

export const getUpcomingEvents = () => getAllEvents().filter((e) => !isPast(e));

export const getPastEvents = () => getAllEvents().filter(isPast).reverse();

export const getNewsBySlug = (slug: string) => getAllNews().find((n) => n.slug === slug);

export const getEventBySlug = (slug: string) => getAllEvents().find((e) => e.slug === slug);

export const getActiveNotices = () =>
  readCollection<Notice>("notices")
    .filter((n) => !n.expiryDate || time(n.expiryDate) > Date.now())
    .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || time(b.publishedDate) - time(a.publishedDate));

export const getGalleryImages = () =>
  readCollection<GalleryImage>("gallery").sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0) || time(b.dateTaken) - time(a.dateTaken)
  );

export const getVideos = () =>
  readCollection<VideoGallery>("videos").sort((a, b) => time(b.uploadDate) - time(a.uploadDate));

export const getCalendarEvents = () =>
  readCollection<CalendarEvent>("calendar").sort((a, b) => time(a.startDate) - time(b.startDate));

export const getStats = () => readList<{ value: number; suffix: string; label: string }>("stats.json");

export const getTestimonials = () =>
  readList<{ name: string; role: string; quote: string; initials: string; active?: boolean }>(
    "testimonials.json"
  ).filter((t) => t.active !== false);
