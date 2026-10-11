import { getPastEvents } from "@/lib/content";
import PageHero from "@/components/newsEvents/PageHero";
import PastEventsList from "./PastEventsList";

// Re-render periodically so events move here once they start
export const revalidate = 60;

export default function PastEventsPage() {
  return (
    <div className="space-y-8">
      {/* Page Hero */}
      <PageHero
        title="Past Events"
        subtitle="Explore highlights and memories from our previous events"
        height="medium"
      />

      <PastEventsList allEvents={getPastEvents()} />
    </div>
  );
}
