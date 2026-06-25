/**
 * TypeScript type definitions for News & Events section
 * Used across detail pages, cards, and query responses
 */

import type { SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';

export interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  startDate: string;
  endDate?: string;
  location?: string;
  excerpt?: string;
  featuredImage?: SanityImageSource;
  content?: PortableTextBlock[];
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
  featuredImage?: SanityImageSource;
  content?: PortableTextBlock[];
  category: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
}

/** A file attachment on a notice, as returned by the GROQ query (asset dereferenced). */
export interface NoticeAttachment {
  asset: {
    url: string;
    originalFilename?: string;
  };
  description?: string;
}

export interface Notice {
  _id: string;
  title: string;
  publishedDate: string;
  expiryDate?: string;
  content: string; // schema field is a plain `text`, not Portable Text
  priority: string;
  category: string;
  attachments?: NoticeAttachment[];
  targetAudience?: string[];
  pinned?: boolean;
}

export interface GalleryImage {
  _id: string;
  title: string;
  image: SanityImageSource;
  alt?: string;
  caption?: string;
  photographer?: string;
  dateTaken?: string;
  category?: string;
  aspectRatio?: string;
  featured?: boolean;
  order?: number;
}

export interface VideoGallery {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
  videoUrl: string;
  thumbnail?: SanityImageSource;
  duration?: string;
  uploadDate: string;
  category?: string;
  featured?: boolean;
  tags?: string[];
}

/**
 * Union type for content that can be either News or Event
 * Used in unified dynamic routes
 */
export type ContentItem = (News | Event) & {
  _type: 'news' | 'event';
};
