"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/newsEvents/EventCard";
import Pagination from "@/components/newsEvents/Pagination";
import type { Event } from "@/types/newsEvents";
import { Calendar } from "lucide-react";

const ITEMS_PER_PAGE = 12;

function PastEventsContent({ allEvents }: { allEvents: Event[] }) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.max(1, Math.ceil(allEvents.length / ITEMS_PER_PAGE));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const events = allEvents.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      {/* Event Count */}
      <div className="pb-4 border-b border-border">
        <p className="font-proximaNova text-foreground/70">
          {allEvents.length} past events
        </p>
      </div>

      {/* Events Grid */}
      {events.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/news-events/events/past"
          />
        </>
      )}

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Calendar className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h3 className="font-inglobal font-bold text-xl text-foreground/70 mb-2">
            No Past Events
          </h3>
          <p className="font-proximaNova text-foreground/60">
            Past events will appear here once they conclude
          </p>
        </div>
      )}
    </div>
  );
}

export default function PastEventsList({ allEvents }: { allEvents: Event[] }) {
  return (
    <Suspense
      fallback={
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 font-proximaNova text-foreground/60">Loading...</p>
        </div>
      }
    >
      <PastEventsContent allEvents={allEvents} />
    </Suspense>
  );
}
