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
 * Determine event status based on start and end dates
 * @returns 'upcoming' | 'ongoing' | 'past'
 */
export function getEventStatus(startDate: string, endDate?: string): 'upcoming' | 'ongoing' | 'past' {
  const now = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;

  if (now < start) return 'upcoming';
  if (now > end) return 'past';
  return 'ongoing';
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
