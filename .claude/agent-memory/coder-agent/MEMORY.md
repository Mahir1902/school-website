# Coder Agent Memory

## Unified Dynamic Routes Pattern

### Context
When building content management systems with multiple similar content types (news, events, blog posts), creating separate routes for each can lead to code duplication and maintenance overhead.

### Solution: Unified Dynamic Route
Created a single dynamic route at `/app/news-events/[slug]/page.tsx` that handles both news articles and events:

**Key Implementation Points:**
1. **Single Query**: Use a GROQ query that fetches from multiple document types:
   ```groq
   *[_type in ["news", "event"] && slug.current == $slug][0]
   ```

2. **Type Discrimination**: Add `_type` field to response and use TypeScript union types:
   ```typescript
   type ContentItem = (News | Event) & { _type: 'news' | 'event' };
   ```

3. **Template Components**: Extract view logic into separate template components:
   - `NewsDetailTemplate.tsx` - Renders news articles
   - `EventDetailTemplate.tsx` - Renders events

4. **Conditional Rendering**: Route to appropriate template based on `_type`:
   ```typescript
   if (content._type === "news") {
     return <NewsDetailTemplate article={article} relatedArticles={relatedArticles} />;
   } else {
     return <EventDetailTemplate event={event} relatedEvents={relatedEvents} />;
   }
   ```

### Benefits
- **DRY Principle**: Single route instead of duplicate implementations
- **SEO Friendly**: Clean URLs like `/news-events/my-article` and `/news-events/my-event`
- **Maintainable**: Template changes only need to be made in one place
- **Extensible**: Easy to add more content types (just add to union type and create template)

### Related Files
- Route: `/app/news-events/[slug]/page.tsx`
- Templates: `/components/newsEvents/templates/`
- Queries: `/sanity/lib/queries.ts` - `contentBySlugQuery`
- Types: `/types/newsEvents.ts` - `ContentItem`

## Next.js Build Patterns

### ISR Configuration
When using ISR (Incremental Static Regeneration), use `export const revalidate = 60` at the page level for 60-second revalidation.

### Metadata Generation
For dynamic routes with conditional rendering, generate metadata based on content type:
```typescript
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = await client.fetch(contentBySlugQuery, { slug });

  if (content._type === "news") {
    // Return news-specific metadata
  } else {
    // Return event-specific metadata
  }
}
```

## Sanity CMS Best Practices

### Image Field Migration
When migrating from `image` to `featuredImage` field:
1. Update schema first
2. Update queries to use new field name
3. Update all components that reference the field
4. Update types/interfaces
5. Search codebase for old field name to catch edge cases

### GROQ Query Optimization
Use `coalesce()` for fields that might exist on one type but not another:
```groq
"publishedDate": coalesce(publishedDate, startDate)
```

## Project-Specific Patterns

### Navigation Structure
When removing navigation items from dropdowns:
- Update `/data/newsEvents/navigation.ts`
- Verify referenced routes still exist or are handled appropriately
- Consider adding redirects for removed routes if they were previously public

### Component Linking Pattern
All content cards should link to the unified route:
```typescript
href={`/news-events/${item.slug.current}`}
```
Not type-specific routes like `/news-events/news/${slug}` or `/news-events/events/${slug}`.
