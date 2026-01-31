import type { Metadata } from "next";
import PageHero from "@/components/academics/PageHero";
import SectionHeading from "@/components/academics/SectionHeading";
import FullCalendarView from "@/components/academics/FullCalendarView";
import { client } from "@/sanity/lib/client";
import { calendarEventsQuery } from "@/sanity/lib/queries";
import { CalendarEvent } from "@/types/academics";
import hero1 from "@/assets/hero-1.jpg";

export const metadata: Metadata = {
  title: "Academic Calendar",
  description:
    "View important dates, holidays, examinations, and events for the academic year at Singapore International School.",
};

// Revalidate every 60 seconds to fetch new events from Sanity
export const revalidate = 60;

export default async function CalendarPage() {
  // Fetch calendar events from Sanity
  const events: CalendarEvent[] = await client.fetch(calendarEventsQuery);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <PageHero
        title="Academic Calendar"
        subtitle="Important Dates & Events"
        backgroundImage={hero1}
        height="medium"
      />

      {/* Overview */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-foreground/70 font-proximaNova leading-relaxed">
            View all important academic dates, holidays, examinations, and school
            events throughout the year. Click on any event for more details.
          </p>
        </div>
      </section>

      {/* Calendar */}
      <section>
        <SectionHeading>Academic Year Calendar</SectionHeading>

        <div className="mt-8">
          {events.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-lg">
              <p className="text-foreground/60 font-proximaNova">
                No calendar events have been added yet. Events will appear here
                once they are published.
              </p>
            </div>
          ) : (
            <FullCalendarView events={events} />
          )}
        </div>
      </section>

      {/* Legend */}
      <section className="bg-primary/5 rounded-lg p-8">
        <h3 className="text-xl font-orpheus text-primary mb-6 text-center">
          Event Type Legend
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-green-500" />
            <span className="text-sm font-proximaNova text-foreground/80">
              Holiday
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-blue-500" />
            <span className="text-sm font-proximaNova text-foreground/80">
              Results Day
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-orange-500" />
            <span className="text-sm font-proximaNova text-foreground/80">
              Examination
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-purple-500" />
            <span className="text-sm font-proximaNova text-foreground/80">
              School Event
            </span>
          </div>
        </div>
      </section>

      {/* How to Manage Events */}
      <section className="bg-card border border-border rounded-lg p-8">
        <h3 className="text-xl font-orpheus text-primary mb-4 text-center">
          Managing Calendar Events
        </h3>
        <div className="max-w-3xl mx-auto space-y-4 text-foreground/70 font-proximaNova">
          <p>
            <strong>For School Administrators:</strong> Calendar events can be
            easily managed through the Sanity Studio. Simply navigate to{" "}
            <a
              href="/studio"
              className="text-primary hover:underline font-semibold"
            >
              /studio
            </a>{" "}
            and select "Calendar Event" from the sidebar.
          </p>
          <div className="bg-primary/5 rounded-lg p-6">
            <h4 className="font-semibold text-primary mb-3">
              Adding a New Event:
            </h4>
            <ol className="space-y-2 list-decimal list-inside">
              <li>Go to the Sanity Studio at /studio</li>
              <li>Click on "Calendar Event" in the sidebar</li>
              <li>Click the "+" button to create a new event</li>
              <li>Fill in the event details (title, date, type, description)</li>
              <li>Click "Publish" to make it live on the calendar</li>
            </ol>
          </div>
          <p className="text-sm">
            <strong>Note:</strong> Changes may take up to an hour to appear on
            the live site due to caching. Clear your browser cache to see updates
            immediately.
          </p>
        </div>
      </section>
    </div>
  );
}
