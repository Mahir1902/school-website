import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllNews, getAllEvents, getNewsBySlug, getEventBySlug, getUpcomingEvents } from "@/lib/content";
import NewsDetailTemplate from "@/components/newsEvents/templates/NewsDetailTemplate";
import EventDetailTemplate from "@/components/newsEvents/templates/EventDetailTemplate";

// Re-render periodically so past-event detection stays current between deploys
export const revalidate = 60;

export function generateStaticParams() {
  return [...getAllNews(), ...getAllEvents()].map(({ slug }) => ({ slug }));
}

/**
 * Generate dynamic metadata for SEO and social sharing
 * Works for both news articles and events
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  const event = article ? undefined : getEventBySlug(slug);

  const imageUrl = (article ?? event)?.featuredImage;

  if (article) {
    return {
      title: `${article.title} | News | Singapore International School`,
      description: article.excerpt || article.title,
      openGraph: {
        title: article.title,
        description: article.excerpt || "",
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: "article",
        publishedTime: article.publishedDate,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt || "",
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } else if (event) {
    return {
      title: `${event.title} | Events | Singapore International School`,
      description: event.excerpt || `Join us for ${event.title}`,
      openGraph: {
        title: event.title,
        description: event.excerpt || "",
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: "article",
        publishedTime: event.startDate,
      },
      twitter: {
        card: "summary_large_image",
        title: event.title,
        description: event.excerpt || "",
        images: imageUrl ? [imageUrl] : [],
      },
    };
  }

  return { title: "Content Not Found" };
}

/**
 * Unified Detail Page
 * Displays full content for both news articles and events based on content type
 */
export default async function UnifiedDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  // Route to appropriate template based on content type
  if (article) {
    const relatedArticles = getAllNews()
      .filter((n) => n.category === article.category && n.slug !== slug)
      .slice(0, 3);

    return <NewsDetailTemplate article={article} relatedArticles={relatedArticles} />;
  }

  const event = getEventBySlug(slug);
  if (!event) {
    notFound();
  }

  const relatedEvents = getUpcomingEvents()
    .filter((e) => e.eventType === event.eventType && e.slug !== slug)
    .slice(0, 3);

  return <EventDetailTemplate event={event} relatedEvents={relatedEvents} />;
}
