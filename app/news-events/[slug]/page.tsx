import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { contentBySlugQuery, relatedNewsQuery, relatedEventsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import NewsDetailTemplate from "@/components/newsEvents/templates/NewsDetailTemplate";
import EventDetailTemplate from "@/components/newsEvents/templates/EventDetailTemplate";
import type { News, Event, ContentItem } from "@/types/newsEvents";

export const revalidate = 60;

/**
 * Generate dynamic metadata for SEO and social sharing
 * Works for both news articles and events
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content: ContentItem | null = await client.fetch(contentBySlugQuery, { slug });

  if (!content) {
    return { title: "Content Not Found" };
  }

  const imageUrl = content.featuredImage
    ? urlFor(content.featuredImage).width(1200).height(630).url()
    : undefined;

  if (content._type === "news") {
    const article = content as News;
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
  } else {
    const event = content as Event;
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
}

/**
 * Unified Detail Page
 * Displays full content for both news articles and events based on content type
 */
export default async function UnifiedDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content: ContentItem | null = await client.fetch(contentBySlugQuery, { slug });

  if (!content) {
    notFound();
  }

  // Route to appropriate template based on content type
  if (content._type === "news") {
    const article = content as News;
    const relatedArticles = await client.fetch(relatedNewsQuery, {
      category: article.category,
      slug
    });

    return <NewsDetailTemplate article={article} relatedArticles={relatedArticles} />;
  } else {
    const event = content as Event;
    const relatedEvents = await client.fetch(relatedEventsQuery, {
      eventType: event.eventType,
      slug
    });

    return <EventDetailTemplate event={event} relatedEvents={relatedEvents} />;
  }
}
