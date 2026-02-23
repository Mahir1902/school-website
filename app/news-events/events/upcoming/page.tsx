import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { upcomingEventsQuery } from "@/sanity/lib/queries";
import PageHero from "@/components/newsEvents/PageHero";
import EventCard from "@/components/newsEvents/EventCard";
import Link from "next/link";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description: "View all upcoming events and activities at Singapore International School"
};

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function UpcomingEventsPage() {
  const events = await client.fetch(upcomingEventsQuery);

  return (
    <div className="space-y-8">
      {/* Page Hero */}
      <PageHero
        title="Upcoming Events"
        subtitle="Mark your calendar for these exciting upcoming events"
        height="medium"
      />

      {/* Quick Actions */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
        <p className="font-proximaNova text-foreground/70">
          {events.length} {events.length === 1 ? "event" : "events"} scheduled
        </p>
        <Link
          href="/news-events/events/calendar"
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white font-proximaNova font-semibold text-sm rounded-md transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>View Calendar</span>
        </Link>
      </div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: any) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Calendar className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h3 className="font-orpheus font-bold text-xl text-foreground/70 mb-2">
            No Upcoming Events
          </h3>
          <p className="font-proximaNova text-foreground/60">
            Check back soon for new events and activities
          </p>
        </div>
      )}
    </div>
  );
}
