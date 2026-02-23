/**
 * TypeScript type definitions for News & Events section
 * Used across detail pages, cards, and query responses
 */

export interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  startDate: string;
  endDate?: string;
  location?: string;
  excerpt?: string;
  featuredImage?: any;
  content?: any[];
  eventType: string;
  status?: string;
  capacity?: number;
  registrationLink?: string;
  featured?: boolean;
  tags?: string[];
}

export interface News {
  _id: string;
  title: string;
  slug: { current: string };
  publishedDate: string;
  excerpt?: string;
  featuredImage?: any;
  content?: any[];
  category: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
}

export interface Notice {
  _id: string;
  title: string;
  publishedDate: string;
  expiryDate?: string;
  content: any[];
  priority: string;
  category: string;
  attachments?: any[];
  targetAudience?: string[];
  pinned?: boolean;
}

export interface GalleryImage {
  _id: string;
  title: string;
  image: any;
  alt?: string;
  caption?: string;
  photographer?: string;
  dateTaken?: string;
  category?: string;
  aspectRatio?: string;
  featured?: boolean;
  order?: number;
}

/**
 * Union type for content that can be either News or Event
 * Used in unified dynamic routes
 */
export type ContentItem = (News | Event) & {
  _type: 'news' | 'event';
};
