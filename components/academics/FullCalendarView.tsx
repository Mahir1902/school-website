"use client";

import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventInput } from "@fullcalendar/core";
import { CalendarEvent } from "@/types/academics";

interface FullCalendarViewProps {
  events: CalendarEvent[];
}

// Event type colors matching our design
const eventTypeColors = {
  holiday: "#22c55e", // green
  results_day: "#3b82f6", // blue
  exam: "#f97316", // orange
  event: "#a855f7", // purple
};

export default function FullCalendarView({ events }: FullCalendarViewProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Transform Sanity events to FullCalendar format
  const calendarEvents: EventInput[] = events.map((event) => ({
    id: event._id,
    title: event.title,
    start: event.startDate,
    end: event.endDate
      ? new Date(new Date(event.endDate).getTime() + 86400000)
          .toISOString()
          .split("T")[0]
      : undefined,
    backgroundColor:
      eventTypeColors[event.eventType as keyof typeof eventTypeColors],
    borderColor:
      eventTypeColors[event.eventType as keyof typeof eventTypeColors],
    extendedProps: {
      description: event.description,
      eventType: event.eventType,
      category: event.category,
    },
  }));

  if (!isClient) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 min-h-[600px] flex items-center justify-center">
        <div className="text-foreground/60 font-proximaNova">
          Loading calendar...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
      <style jsx global>{`
        .fc {
          font-family: "Proxima Nova", sans-serif;
        }

        .fc .fc-button {
          background-color: oklch(0.52 0.15 149.49);
          border-color: oklch(0.52 0.15 149.49);
          color: white;
          text-transform: capitalize;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
        }

        .fc .fc-button:hover {
          background-color: oklch(0.48 0.15 149.49);
          border-color: oklch(0.48 0.15 149.49);
        }

        .fc .fc-button-active {
          background-color: oklch(0.45 0.15 149.49) !important;
          border-color: oklch(0.45 0.15 149.49) !important;
        }

        .fc .fc-button:disabled {
          background-color: oklch(0.52 0.15 149.49 / 0.5);
          border-color: oklch(0.52 0.15 149.49 / 0.5);
        }

        .fc-theme-standard .fc-scrollgrid {
          border-color: oklch(0.9 0 0);
        }

        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: oklch(0.9 0 0);
        }

        .fc .fc-col-header-cell {
          background-color: oklch(0.52 0.15 149.49 / 0.1);
          font-weight: 600;
          padding: 0.75rem;
        }

        .fc .fc-daygrid-day-number {
          color: oklch(0.3 0 0);
          font-weight: 600;
          padding: 0.5rem;
        }

        .fc .fc-daygrid-day.fc-day-today {
          background-color: oklch(0.75 0.17 62.22 / 0.1) !important;
        }

        .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
          background-color: oklch(0.75 0.17 62.22);
          color: white;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .fc-event {
          cursor: pointer;
          border-radius: 0.25rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
          margin-bottom: 2px;
        }

        .fc-event-title {
          font-weight: 600;
        }

        .fc-daygrid-event-dot {
          display: none;
        }

        .fc .fc-toolbar-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: oklch(0.52 0.15 149.49);
          font-family: "Orpheus Pro", serif;
        }

        .fc-header-toolbar {
          margin-bottom: 1.5rem !important;
        }

        @media (max-width: 768px) {
          .fc .fc-toolbar {
            flex-direction: column;
            gap: 1rem;
          }

          .fc .fc-toolbar-chunk {
            display: flex;
            justify-content: center;
          }

          .fc .fc-toolbar-title {
            font-size: 1.25rem;
            margin: 0.5rem 0;
          }
        }
      `}</style>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        events={calendarEvents}
        height="auto"
        eventDisplay="block"
        dayMaxEvents={3}
        moreLinkText={(num) => `+${num} more`}
        eventClick={(info) => {
          const event = info.event;
          const props = event.extendedProps;

          // Show event details in alert (you can customize this to a modal)
          alert(
            `${event.title}\n\n` +
              `Date: ${event.start?.toLocaleDateString()} ${
                event.end ? `- ${new Date(event.end.getTime() - 86400000).toLocaleDateString()}` : ""
              }\n` +
              `Type: ${props.eventType}\n` +
              (props.description ? `\n${props.description}` : "")
          );
        }}
        eventMouseEnter={(info) => {
          info.el.style.opacity = "0.8";
        }}
        eventMouseLeave={(info) => {
          info.el.style.opacity = "1";
        }}
      />
    </div>
  );
}
