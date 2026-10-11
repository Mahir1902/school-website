/**
 * TypeScript type definitions for News & Events section.
 * Shapes mirror the JSON files under /content (edited via Pages CMS, see .pages.yml).
 * `id` is the file name without extension; image/file fields are public URL paths (e.g. /media/x.jpg).
 */

export interface Event {
  id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate?: string;
  location?: string;
  excerpt?: string;
  featuredImage?: string;
  body?: string; // Markdown
  eventType: string;
  status?: string;
  capacity?: number;
  registrationLink?: string;
  featured?: boolean;
  tags?: string[];
}

export interface News {
  id: string;
  title: string;
  slug: string;
  publishedDate: string;
  excerpt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  body?: string; // Markdown
  category: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
}

export interface NoticeAttachment {
  file: string;
  description?: string;
}

export interface Notice {
  id: string;
  title: string;
  publishedDate: string;
  expiryDate?: string;
  content: string;
  priority: string;
  category: string;
  attachments?: NoticeAttachment[];
  targetAudience?: string[];
  pinned?: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
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
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail?: string;
  duration?: string;
  uploadDate: string;
  category?: string;
  featured?: boolean;
  tags?: string[];
}
