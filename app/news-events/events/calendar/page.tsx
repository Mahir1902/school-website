import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { allEventsQuery } from "@/sanity/lib/queries";
import PageHero from "@/components/newsEvents/PageHero";
import { Calendar, MapPin, Clock } from "lucide-react";
import CategoryBadge from "@/components/newsEvents/CategoryBadge";

export const metadata: Metadata = {
  title: "Event Calendar",
  description: "View all school events in calendar format at Singapore International School"
};

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function EventCalendarPage() {
  const events = await client.fetch(allEventsQuery);

  // Group events by month
  const groupedEvents = events.reduce((acc: any, event: any) => {
    const date = new Date(event.startDate);
    const monthYear = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long"
    });

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});

  const sortedMonths = Object.keys(groupedEvents).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  return (
    <div className="space-y-8">
      {/* Page Hero */}
      <PageHero
        title="Event Calendar"
        subtitle="View all school events organized by month"
        height="medium"
      />

      {/* Event Count */}
      <div className="pb-4 border-b border-border">
        <p className="font-proximaNova text-foreground/70">
          {events.length} total {events.length === 1 ? "event" : "events"}
        </p>
      </div>

      {/* Calendar View */}
      {sortedMonths.length > 0 ? (
        <div className="space-y-8">
          {sortedMonths.map((monthYear) => (
            <div key={monthYear}>
              {/* Month Header */}
              <h2 className="text-2xl md:text-3xl font-orpheus font-bold text-primary mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                {monthYear}
              </h2>

              {/* Events for this month */}
              <div className="space-y-4">
                {groupedEvents[monthYear].map((event: any) => {
                  const startDate = new Date(event.startDate);
                  const endDate = event.endDate ? new Date(event.endDate) : null;

                  return (
                    <div
                      key={event._id}
                      className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
                    >
                      {/* Date Badge */}
                      <div className="flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center bg-primary/10 rounded-lg">
                        <span className="text-2xl font-orpheus font-bold text-primary">
                          {startDate.getDate()}
                        </span>
                        <span className="text-xs font-proximaNova text-foreground/60 uppercase">
                          {startDate.toLocaleDateString("en-US", { month: "short" })}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-orpheus font-bold text-lg text-primary">
                            {event.title}
                          </h3>
                          <div className="flex gap-2">
                            {event.status && (
                              <CategoryBadge category={event.status} size="sm" />
                            )}
                            {event.eventType && (
                              <CategoryBadge category={event.eventType} size="sm" />
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                          {/* Time */}
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="font-proximaNova">
                              {startDate.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true
                              })}
                              {endDate &&
                                ` - ${endDate.toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true
                                })}`}
                            </span>
                          </div>

                          {/* Location */}
                          {event.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="font-proximaNova">{event.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Excerpt */}
                        {event.excerpt && (
                          <p className="mt-2 font-proximaNova text-sm text-foreground/60 line-clamp-2">
                            {event.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Calendar className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h3 className="font-orpheus font-bold text-xl text-foreground/70 mb-2">
            No Events Scheduled
          </h3>
          <p className="font-proximaNova text-foreground/60">
            Check back soon for upcoming events
          </p>
        </div>
      )}
    </div>
  );
}
