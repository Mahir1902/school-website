import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { formatDateRange, formatEventTime, getEventStatus } from "@/lib/dateUtils";
import PortableTextContent from "@/components/newsEvents/PortableTextContent";
import EventCard from "@/components/newsEvents/EventCard";
import CategoryBadge from "@/components/newsEvents/CategoryBadge";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import type { Event } from "@/types/newsEvents";

interface EventDetailTemplateProps {
  event: Event;
  relatedEvents: Event[];
}

/**
 * Event Detail Template
 * Reusable template for rendering event detail pages
 */
export default function EventDetailTemplate({ event, relatedEvents }: EventDetailTemplateProps) {
  const status = getEventStatus(event.startDate, event.endDate);
  const isPastEvent = status === 'past';

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] -mx-6 md:-mx-8 lg:-mx-10">
        {event.featuredImage ? (
          <>
            <Image
              src={urlFor(event.featuredImage).url()}
              alt={event.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-3 mb-4">
            {event.status && <CategoryBadge category={event.status} />}
            {event.eventType && <CategoryBadge category={event.eventType} />}
          </div>
          <h1 className="font-inglobal font-bold text-3xl md:text-5xl text-white mb-4 max-w-4xl">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-proximaNova">{formatDateRange(event.startDate, event.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-proximaNova">{formatEventTime(event.startDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Content */}
        <div className="lg:col-span-2 space-y-6">
          {event.excerpt && (
            <p className="text-lg text-foreground/80 font-proximaNova leading-relaxed">
              {event.excerpt}
            </p>
          )}

          {event.content && event.content.length > 0 && (
            <PortableTextContent content={event.content} />
          )}

          {event.tags && event.tags.length > 0 && (
            <div className="pt-6 border-t border-border">
              <h3 className="font-inglobal font-bold text-lg text-foreground mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-foreground/70 text-sm rounded-full font-proximaNova"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Event Info Sidebar */}
        <div className="lg:sticky lg:top-24 h-fit space-y-4">
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-inglobal font-bold text-xl text-primary">Event Details</h3>

            {/* Date */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="font-proximaNova">
                <div className="text-sm text-foreground/60 mb-1">Date</div>
                <div className="text-foreground">{formatDateRange(event.startDate, event.endDate)}</div>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="font-proximaNova">
                <div className="text-sm text-foreground/60 mb-1">Time</div>
                <div className="text-foreground">{formatEventTime(event.startDate)}</div>
              </div>
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="font-proximaNova">
                  <div className="text-sm text-foreground/60 mb-1">Location</div>
                  <div className="text-foreground">{event.location}</div>
                </div>
              </div>
            )}

            {/* Capacity */}
            {event.capacity && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="font-proximaNova">
                  <div className="text-sm text-foreground/60 mb-1">Capacity</div>
                  <div className="text-foreground">{event.capacity} participants</div>
                </div>
              </div>
            )}

            {/* Registration Button */}
            {event.registrationLink && !isPastEvent && (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mt-6 px-6 py-3 bg-secondary text-primary font-proximaNova font-bold rounded-md hover:bg-secondary/80 transition-colors"
              >
                <span>Register Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {isPastEvent && (
              <div className="mt-6 px-4 py-3 bg-muted rounded-md text-center">
                <p className="font-proximaNova text-sm text-foreground/60">
                  This event has concluded
                </p>
              </div>
            )}
          </div>

          {/* Back to Events Link */}
          <Link
            href="/news-events/events/upcoming"
            className="block text-center px-4 py-2 border border-border rounded-md font-proximaNova text-sm hover:bg-muted transition-colors"
          >
            ← Back to Events
          </Link>
        </div>
      </div>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <div className="pt-12 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-inglobal font-bold text-3xl text-primary">
              More {event.eventType} Events
            </h2>
            <Link
              href="/news-events/events/upcoming"
              className="font-proximaNova text-sm text-primary hover:text-secondary transition-colors"
            >
              View All Events →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEvents.map((relatedEvent: Event) => (
              <EventCard key={relatedEvent._id} event={relatedEvent} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
