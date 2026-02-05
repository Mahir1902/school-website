import { groq } from 'next-sanity'

// Fetch latest 3 news articles
export const newsQuery = groq`
  *[_type == "newsArticle"] | order(publishedDate desc)[0...3] {
    _id,
    title,
    slug,
    publishedDate,
    excerpt,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    category
  }
`

// Fetch active testimonials in order
export const testimonialsQuery = groq`
  *[_type == "testimonial" && active == true] | order(order asc) {
    _id,
    name,
    role,
    quote,
    initials
  }
`

// Fetch statistics in order
export const statsQuery = groq`
  *[_type == "statistic"] | order(order asc) {
    _id,
    value,
    suffix,
    label
  }
`

// Fetch calendar events ordered by start date
export const calendarEventsQuery = groq`
  *[_type == "calendarEvent"] | order(startDate asc) {
    _id,
    title,
    eventType,
    startDate,
    endDate,
    description,
    category
  }
`

// ============= News & Events Section Queries =============

// Fetch featured items (news + events) for carousel
export const featuredItemsQuery = groq`
  *[_type in ["news", "event"] && featured == true] | order(publishedDate desc, startDate desc)[0...5] {
    _id,
    _type,
    title,
    slug,
    "publishedDate": coalesce(publishedDate, startDate),
    excerpt,
    featuredImage,
    category,
    status
  }
`

// Fetch latest news with pagination
export const latestNewsQuery = groq`
  *[_type == "news"] | order(publishedDate desc)[$start...$end] {
    _id,
    title,
    slug,
    publishedDate,
    excerpt,
    featuredImage,
    category,
    author,
    featured,
    tags
  }
`

// Fetch news by category
export const newsByCategoryQuery = groq`
  *[_type == "news" && category == $category] | order(publishedDate desc)[$start...$end] {
    _id,
    title,
    slug,
    publishedDate,
    excerpt,
    featuredImage,
    category,
    author,
    featured,
    tags
  }
`

// Fetch upcoming events
export const upcomingEventsQuery = groq`
  *[_type == "event" && startDate > now()] | order(startDate asc) {
    _id,
    title,
    slug,
    startDate,
    endDate,
    location,
    excerpt,
    featuredImage,
    eventType,
    status,
    capacity,
    registrationLink,
    featured
  }
`

// Fetch past events
export const pastEventsQuery = groq`
  *[_type == "event" && startDate < now()] | order(startDate desc)[$start...$end] {
    _id,
    title,
    slug,
    startDate,
    endDate,
    location,
    excerpt,
    featuredImage,
    eventType,
    status,
    capacity,
    registrationLink
  }
`

// Fetch all events for calendar view
export const allEventsQuery = groq`
  *[_type == "event"] | order(startDate asc) {
    _id,
    title,
    slug,
    startDate,
    endDate,
    location,
    eventType,
    status,
    excerpt
  }
`

// Fetch active notices
export const activeNoticesQuery = groq`
  *[_type == "notice" && (expiryDate == null || expiryDate > now())] | order(pinned desc, publishedDate desc) {
    _id,
    title,
    publishedDate,
    expiryDate,
    content,
    priority,
    category,
    attachments,
    targetAudience,
    pinned
  }
`

// Fetch archived notices
export const archivedNoticesQuery = groq`
  *[_type == "notice" && expiryDate < now()] | order(publishedDate desc) {
    _id,
    title,
    publishedDate,
    expiryDate,
    content,
    priority,
    category,
    attachments,
    targetAudience
  }
`

// Fetch gallery images (all)
export const allGalleryImagesQuery = groq`
  *[_type == "galleryImage"] | order(order asc, dateTaken desc) {
    _id,
    title,
    image,
    "alt": image.alt,
    caption,
    photographer,
    dateTaken,
    category,
    aspectRatio,
    featured,
    order
  }
`

// Fetch gallery images by category
export const galleryImagesByCategoryQuery = groq`
  *[_type == "galleryImage" && category == $category] | order(order asc, dateTaken desc) {
    _id,
    title,
    image,
    "alt": image.alt,
    caption,
    photographer,
    dateTaken,
    category,
    aspectRatio,
    featured,
    order
  }
`

// Fetch video gallery
export const videoGalleryQuery = groq`
  *[_type == "videoGallery"] | order(uploadDate desc) {
    _id,
    title,
    slug,
    description,
    videoUrl,
    thumbnail,
    duration,
    uploadDate,
    category,
    featured,
    tags
  }
`

// Fetch single news article by slug
export const newsArticleBySlugQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedDate,
    excerpt,
    featuredImage,
    content,
    category,
    author,
    featured,
    tags
  }
`

// Fetch single event by slug
export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    startDate,
    endDate,
    location,
    excerpt,
    featuredImage,
    content,
    eventType,
    status,
    capacity,
    registrationLink,
    featured
  }
`
