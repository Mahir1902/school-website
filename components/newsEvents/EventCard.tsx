import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";
import CategoryBadge from "./CategoryBadge";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    slug?: { current: string };
    startDate: string;
    endDate?: string;
    location?: string;
    excerpt?: string;
    featuredImage?: any;
    eventType?: string;
    status?: string;
    capacity?: number;
    registrationLink?: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  const isSameDay = endDate && startDate.toDateString() === endDate.toDateString();

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Featured Image */}
      {event.featuredImage && (
        <div className="relative h-48 overflow-hidden bg-muted">
          <Image
            src={urlFor(event.featuredImage).url()}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {event.status && (
            <div className="absolute top-4 left-4">
              <CategoryBadge category={event.status} />
            </div>
          )}
          {event.eventType && (
            <div className="absolute top-4 right-4">
              <CategoryBadge category={event.eventType} size="sm" />
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-orpheus font-bold text-xl text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 mb-4 text-sm text-foreground/70">
          {/* Date & Time */}
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
            <div className="font-proximaNova">
              <div>{formatDate(startDate)}</div>
              {endDate && !isSameDay && (
                <div className="text-xs text-foreground/50">to {formatDate(endDate)}</div>
              )}
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 flex-shrink-0 text-primary" />
            <span className="font-proximaNova">
              {formatTime(startDate)}
              {endDate && isSameDay && ` - ${formatTime(endDate)}`}
            </span>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
              <span className="font-proximaNova">{event.location}</span>
            </div>
          )}

          {/* Capacity */}
          {event.capacity && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 flex-shrink-0 text-primary" />
              <span className="font-proximaNova">Capacity: {event.capacity}</span>
            </div>
          )}
        </div>

        {/* Excerpt */}
        {event.excerpt && (
          <p className="font-proximaNova text-sm text-foreground/70 mb-4 line-clamp-2">
            {event.excerpt}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {event.slug && (
            <Link
              href={`/news-events/events/${event.slug.current}`}
              className="flex-1 text-center px-4 py-2 bg-primary/10 text-primary font-proximaNova font-semibold text-sm rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              View Details
            </Link>
          )}
          {event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-secondary text-primary font-proximaNova font-semibold text-sm rounded-md hover:bg-secondary/80 transition-colors"
            >
              <span>Register</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
