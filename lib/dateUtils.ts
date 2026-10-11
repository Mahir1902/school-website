/**
 * Date formatting utilities for News & Events section
 * Provides consistent date/time formatting across event and news pages
 */

/**
 * Format a date string to "Month Day, Year" format
 * @example "Jan 15, 2024"
 */
export function formatEventDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

/**
 * Format a date string to time format
 * @example "2:30 PM"
 */
export function formatEventTime(date: string): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

/**
 * Format a date range, handling single-day and multi-day events
 * @example Single day: "Jan 15, 2024"
 * @example Multi-day: "Jan 15, 2024 - Jan 17, 2024"
 */
export function formatDateRange(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  if (!end || start.toDateString() === end.toDateString()) {
    return formatEventDate(startDate);
  }

  return `${formatEventDate(startDate)} - ${formatEventDate(endDate!)}`;
}

/**
 * Parse a CMS date as an epoch timestamp. Pages CMS stores naive local times,
 * so strings without an offset are read as Asia/Dhaka (+06:00).
 */
export function dhakaTime(date?: string): number {
  if (!date) return 0;
  const iso = date.includes("T") ? date : `${date}T00:00`;
  return new Date(/(Z|[+-]\d\d:?\d\d)$/.test(iso) ? iso : `${iso}+06:00`).getTime();
}

/**
 * An event is past once its start time has passed, or when an editor marks it past.
 */
export function isEventPast(event: { startDate: string; status?: string }): boolean {
  return event.status === "past" || dhakaTime(event.startDate) < Date.now();
}

/**
 * Format a date string to full format for news articles
 * @example "January 15, 2024"
 */
export function formatNewsDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}
