import { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import {
  featuredItemsQuery,
  latestNewsQuery,
  upcomingEventsQuery,
  activeNoticesQuery
} from "@/sanity/lib/queries";
import PageHero from "@/components/newsEvents/PageHero";
import NewsCard from "@/components/newsEvents/NewsCard";
import EventCard from "@/components/newsEvents/EventCard";
import NoticeCard from "@/components/newsEvents/NoticeCard";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Stay connected with the latest news, events, and announcements from Singapore International School"
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function NewsEventsOverview() {
  // Fetch all data in parallel
  const [latestNews, upcomingEvents, activeNotices] = await Promise.all([
    client.fetch(latestNewsQuery, { start: 0, end: 3 }),
    client.fetch(upcomingEventsQuery),
    client.fetch(activeNoticesQuery)
  ]);

  // Limit upcoming events and notices for overview
  const featuredEvents = upcomingEvents.slice(0, 3);
  const featuredNotices = activeNotices.slice(0, 3);

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
              <h2 className="text-3xl md:text-4xl font-orpheus font-bold text-primary mb-2">
                Latest News
              </h2>
              <p className="font-proximaNova text-foreground/70">
                Recent updates and stories from our school community
              </p>
            </div>
            <Link
              href="/news-events/news"
              className="hidden md:flex items-center gap-2 text-primary hover:text-secondary font-proximaNova font-semibold transition-colors group"
            >
              <span>View All News</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((news: any) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>

          <Link
            href="/news-events/news"
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-primary hover:text-secondary font-proximaNova font-semibold transition-colors"
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
              <h2 className="text-3xl md:text-4xl font-orpheus font-bold text-primary mb-2">
                Upcoming Events
              </h2>
              <p className="font-proximaNova text-foreground/70">
                Mark your calendar for these exciting events
              </p>
            </div>
            <Link
              href="/news-events/events/upcoming"
              className="hidden md:flex items-center gap-2 text-primary hover:text-secondary font-proximaNova font-semibold transition-colors group"
            >
              <span>View All Events</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event: any) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

          <Link
            href="/news-events/events/upcoming"
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-primary hover:text-secondary font-proximaNova font-semibold transition-colors"
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
              <h2 className="text-3xl md:text-4xl font-orpheus font-bold text-primary mb-2">
                Important Notices
              </h2>
              <p className="font-proximaNova text-foreground/70">
                Stay informed with the latest announcements
              </p>
            </div>
            <Link
              href="/news-events/notices"
              className="hidden md:flex items-center gap-2 text-primary hover:text-secondary font-proximaNova font-semibold transition-colors group"
            >
              <span>View All Notices</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredNotices.map((notice: any) => (
              <NoticeCard key={notice._id} notice={notice} />
            ))}
          </div>

          <Link
            href="/news-events/notices"
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-primary hover:text-secondary font-proximaNova font-semibold transition-colors"
          >
            <span>View All Notices</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      )}

      {/* Quick Links Grid */}
      <section className="border-t border-border pt-16">
        <h2 className="text-3xl md:text-4xl font-orpheus font-bold text-primary text-center mb-12">
          Explore More
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Photo Gallery",
              description: "Browse our collection of school life moments",
              href: "/news-events/gallery",
              icon: "📸"
            },
            {
              title: "Video Gallery",
              description: "Watch highlights and virtual tours",
              href: "/news-events/gallery/videos",
              icon: "🎥"
            },
            {
              title: "Event Calendar",
              description: "View all events in calendar format",
              href: "/news-events/events/calendar",
              icon: "📅"
            }
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group p-6 bg-card border border-border rounded-lg hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{link.icon}</div>
              <h3 className="font-orpheus font-bold text-xl text-primary mb-2 group-hover:text-secondary transition-colors">
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
