"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { pastEventsQuery } from "@/sanity/lib/queries";
import PageHero from "@/components/newsEvents/PageHero";
import EventCard from "@/components/newsEvents/EventCard";
import Pagination from "@/components/newsEvents/Pagination";
import { Calendar } from "lucide-react";

const ITEMS_PER_PAGE = 12;

function PastEventsContent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);

      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;

      try {
        const fetchedEvents = await client.fetch(pastEventsQuery, { start, end });
        setEvents(fetchedEvents);

        // Calculate total pages
        setTotalPages(
          Math.ceil(
            fetchedEvents.length >= ITEMS_PER_PAGE ? currentPage + 1 : currentPage
          )
        );
      } catch (error) {
        console.error("Error fetching past events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [currentPage]);

  return (
    <div className="space-y-8">
      {/* Event Count */}
      <div className="pb-4 border-b border-border">
        <p className="font-proximaNova text-foreground/70">
          {loading ? "Loading..." : `${events.length} past events`}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 font-proximaNova text-foreground/60">
            Loading past events...
          </p>
        </div>
      )}

      {/* Events Grid */}
      {!loading && events.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
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
      {!loading && events.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Calendar className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h3 className="font-orpheus font-bold text-xl text-foreground/70 mb-2">
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

export default function PastEventsPage() {
  return (
    <div className="space-y-8">
      {/* Page Hero */}
      <PageHero
        title="Past Events"
        subtitle="Explore highlights and memories from our previous events"
        height="medium"
      />

      <Suspense
        fallback={
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 font-proximaNova text-foreground/60">Loading...</p>
          </div>
        }
      >
        <PastEventsContent />
      </Suspense>
    </div>
  );
}
