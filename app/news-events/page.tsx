import { Metadata } from "next";
import Link from "next/link";
import { getAllNews, getUpcomingEvents, getActiveNotices } from "@/lib/content";
import PageHero from "@/components/newsEvents/PageHero";
import NewsCard from "@/components/newsEvents/NewsCard";
import EventCard from "@/components/newsEvents/EventCard";
import NoticeCard from "@/components/newsEvents/NoticeCard";
import type { News, Event, Notice } from "@/types/newsEvents";
import { ArrowRight, CalendarDays, Images, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Stay connected with the latest news, events, and announcements from Singapore International School"
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default function NewsEventsOverview() {
  const latestNews = getAllNews().slice(0, 3);
  const featuredEvents = getUpcomingEvents().slice(0, 3);
  const featuredNotices = getActiveNotices().slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Page Hero */}
      <PageHero
        title="News & Events"
        subtitle="Stay Connected with Singapore International School"
        height="large"
      />

      {/* Latest News Section */}
      {latestNews.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-inglobal font-medium text-primary mb-2">
                Latest News
              </h2>
              <p className="font-proximaNova text-foreground/70">
                Recent updates and stories from our school community
              </p>
            </div>
            <Link
              href="/news-events/news"
              className="hidden md:flex items-center gap-2 text-primary font-proximaNova font-semibold decoration-secondary decoration-2 underline-offset-4 hover:underline group"
            >
              <span>View All News</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((news: News) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>

          <Link
            href="/news-events/news"
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-primary font-proximaNova font-semibold decoration-secondary decoration-2 underline-offset-4 hover:underline"
          >
            <span>View All News</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      )}

      {/* Upcoming Events Section */}
      {featuredEvents.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-inglobal font-bold text-primary mb-2">
                Upcoming Events
              </h2>
              <p className="font-proximaNova text-foreground/70">
                Mark your calendar for these exciting events
              </p>
            </div>
            <Link
              href="/news-events/events/upcoming"
              className="hidden md:flex items-center gap-2 text-primary font-proximaNova font-semibold decoration-secondary decoration-2 underline-offset-4 hover:underline group"
            >
              <span>View All Events</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event: Event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <Link
            href="/news-events/events/upcoming"
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-primary font-proximaNova font-semibold decoration-secondary decoration-2 underline-offset-4 hover:underline"
          >
            <span>View All Events</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      )}

      {/* Important Notices Section */}
      {featuredNotices.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-inglobal font-bold text-primary mb-2">
                Important Notices
              </h2>
              <p className="font-proximaNova text-foreground/70">
                Stay informed with the latest announcements
              </p>
            </div>
            <Link
              href="/news-events/notices"
              className="hidden md:flex items-center gap-2 text-primary font-proximaNova font-semibold decoration-secondary decoration-2 underline-offset-4 hover:underline group"
            >
              <span>View All Notices</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredNotices.map((notice: Notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>

          <Link
            href="/news-events/notices"
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-primary font-proximaNova font-semibold decoration-secondary decoration-2 underline-offset-4 hover:underline"
          >
            <span>View All Notices</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      )}

      {/* Quick Links Grid */}
      <section className="border-t border-border pt-16">
        <h2 className="text-3xl md:text-4xl font-inglobal font-bold text-primary text-center mb-12">
          Explore More
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Photo Gallery",
              description: "Browse our collection of school life moments",
              href: "/news-events/gallery",
              icon: Images
            },
            {
              title: "Video Gallery",
              description: "Watch highlights and virtual tours",
              href: "/news-events/gallery/videos",
              icon: Video
            },
            {
              title: "Event Calendar",
              description: "View all events in calendar format",
              href: "/news-events/events/calendar",
              icon: CalendarDays
            }
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <link.icon aria-hidden="true" className="w-6 h-6" />
              </div>
              <h3 className="font-inglobal font-bold text-xl text-primary mb-2 decoration-secondary decoration-2 underline-offset-4 group-hover:underline">
                {link.title}
              </h3>
              <p className="font-proximaNova text-sm text-foreground/70">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
