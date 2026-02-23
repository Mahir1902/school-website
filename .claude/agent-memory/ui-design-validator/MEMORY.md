# UI Design Validator Memory

## Common Issues & Patterns

### Next.js 15+ Dynamic Routes
**Critical Pattern**: In Next.js 15+, `params` in page components are Promises and must be awaited.

```typescript
// ❌ WRONG (Next.js 14 pattern)
export default async function Page({ params }: { params: { slug: string } }) {
  const data = await fetch(params.slug);
}

// ✅ CORRECT (Next.js 15+ pattern)
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetch(slug);
}
```

**Applies to**: Both page component AND generateMetadata function.

**Found in**: News & Events detail pages (2026-02-05) - caused complete page failure.

---

### Design Token Violations

#### CategoryBadge Component
**Location**: `/components/newsEvents/CategoryBadge.tsx`

**Issue**: Uses hardcoded Tailwind colors instead of design tokens:
- `bg-blue-500/90` - Should use semantic token
- `bg-red-500/90` - Should use `bg-destructive/90`
- `bg-purple-500/90` - Should use design system token

**Pattern**: When creating badge/pill components, always map categories to semantic tokens defined in `app/globals.css`, not arbitrary Tailwind colors.

---

### Hero Section Pattern (Detail Pages)

**Responsive Heights**:
```typescript
className="relative h-[300px] md:h-[400px] lg:h-[500px]"
```
- Mobile: 300px
- Tablet: 400px
- Desktop: 500px

**Full-Width Breakout**:
```typescript
className="-mx-6 md:-mx-8 lg:-mx-10"
```
Negative margins to break out of container padding.

**Image Overlay**: Always use `bg-black/40` for text contrast over images (matches homepage Hero).

**Fallback**: When no featured image, use:
```typescript
className="bg-gradient-to-br from-primary/20 to-secondary/20"
```

---

### Sticky Sidebar Pattern

**Implementation**:
```typescript
className="lg:sticky lg:top-24 h-fit"
```

**Critical**: `top-24` (96px) must match navbar height including padding. Verify ScrollNavbar actual height before using.

**Responsive**: Only sticky on `lg+` breakpoint. Becomes bottom section on mobile/tablet.

---

### Portable Text Styling

**Heading Hierarchy** (from `/components/newsEvents/PortableTextContent.tsx`):
- h2: `font-orpheus font-bold text-3xl text-primary mt-8 mb-4`
- h3: `font-orpheus font-bold text-2xl text-primary mt-6 mb-3`
- h4: `font-orpheus font-bold text-xl text-primary mt-4 mb-2`

**Body**: `font-proximaNova text-foreground/80 mb-4 leading-relaxed`

**Links**: `text-primary hover:text-secondary underline transition-colors`

**Pattern**: Consistent top/bottom margins create hierarchy. Top margins increase with heading level (mt-8 → mt-6 → mt-4).

---

### Missing Breadcrumb Pattern

**Finding**: News/Events detail pages lack breadcrumb navigation, which exists as a component and is used in Academics section.

**Breadcrumb Styling** (from `/components/newsEvents/Breadcrumb.tsx` and `/components/academics/Breadcrumb.tsx`):
```typescript
className="bg-primary/5 border-b border-border"
```
Subtle green-tinted background consistent across site.

**Spacing from Navbar**: Use `pt-24 md:pt-28` in layout to space breadcrumb from fixed navbar.

**Recommendation**: Add breadcrumbs to all detail pages for navigation context.

---

## Responsive Breakpoints (Tailwind CSS 4)

Standard breakpoints used in project:
- **sm**: 640px
- **md**: 768px (tablet start)
- **lg**: 1024px (desktop start)
- **xl**: 1280px
- **2xl**: 1536px

**Common Patterns**:
- Single column until `lg` for content layouts
- Sidebar becomes bottom section on < `lg`
- Grid cols: 1 → 2 (md) → 3 (lg) for cards
- Hero/image heights scale: 300px → 400px (md) → 500px (lg)

---

## Focus State Pattern (Missing)

**Issue Found**: Interactive elements lack explicit focus states.

**Required Pattern**:
```typescript
className="... focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
```

**Apply to**: All buttons, links, and interactive elements for keyboard navigation accessibility.

---

## Image Handling Best Practices

### Next.js Image Component
**Always use** Next.js `<Image>` component, never `<img>` tag.

**Priority flag**: Use on hero/above-fold images:
```typescript
<Image src={url} alt={title} fill priority sizes="100vw" />
```

**Sizes attribute**: Critical for responsive images:
- Full-width: `sizes="100vw"`
- Content images: `sizes="(max-width: 768px) 100vw, 800px"`

### Sanity Image URLs
**Pattern**: Use `urlFor()` helper from `@/sanity/lib/image`:
```typescript
import { urlFor } from "@/sanity/lib/image";

const imageUrl = event.featuredImage
  ? urlFor(event.featuredImage).width(1200).height(630).url()
  : undefined;
```

**Optimization**: Always specify width/height for Sanity images to enable CDN optimization.

---

## Testing Checklist (Playwright)

When validating new pages:

1. **Start dev server correctly**:
   - Kill existing: `pkill -f "next dev"`
   - Clean: `rm -rf .next/dev`
   - Start fresh: `npm run dev`

2. **Query Sanity for real slugs** before testing dynamic routes:
   ```typescript
   mcp__Sanity__query_documents({
     query: '*[_type == "event"][0...3]{slug}'
   })
   ```

3. **Test breakpoints** in order:
   - 375px (mobile small)
   - 414px (mobile large)
   - 768px (tablet)
   - 1024px (desktop)
   - 1440px (desktop large)
   - 1920px (desktop XL)

4. **Edge cases to test**:
   - Missing featured images
   - Very long titles (test wrapping)
   - Missing optional fields
   - Empty content arrays
   - No related content

5. **Check console** for errors - use Playwright console logging to catch runtime issues.

---

## Unified Route Pattern (/news-events/[slug])

**Validated**: 2026-02-05

**Architecture**: Single dynamic route handles both news and events based on `_type` field from Sanity. Type detection happens server-side, then routes to appropriate template component.

**Key Files**:
- `/app/news-events/[slug]/page.tsx` - Main route with type detection
- `/components/newsEvents/templates/NewsDetailTemplate.tsx` - News rendering
- `/components/newsEvents/templates/EventDetailTemplate.tsx` - Event rendering

**Pattern Works Well**:
- Clean URL structure (no /news/ or /events/ prefix needed)
- Unified metadata generation
- ISR revalidation (60 seconds)
- Next.js 15+ async params properly implemented
- Related content fetching based on category/eventType

**Card Component Links**: Both NewsCard and EventCard correctly link to `/news-events/{slug}` unified route. No separate routing needed.

**Responsive Behavior**: Two-column layout (2/3 content + 1/3 sticky sidebar) collapses to single column on mobile. Sidebar appears below content on < lg breakpoint.

**See**: `/unified-route-validation.md` for full validation report.

---

## Color Contrast Requirements (WCAG AA)

**Normal text**: 4.5:1 contrast ratio
**Large text** (18pt+): 3:1 contrast ratio

**Project colors** (from `app/globals.css`):
- Primary green: `oklch(0.52 0.15 149.49)` on white - likely AA compliant
- Foreground: `oklch(0.22 0 0)` - excellent contrast
- Secondary gold: `oklch(0.75 0.17 62.22)` - may need testing on light backgrounds

**Always verify** CategoryBadge and custom color combinations with actual contrast checker.

---

## Known Technical Issues

### Dev Server Port Conflicts
**Symptom**: Server starts on port 3001 instead of 3000, or fails with lock error.

**Solution**:
```bash
pkill -f "next dev"
rm -rf .next/dev
npm run dev
```

### Playwright Navigation Errors
**Symptom**: `net::ERR_CONNECTION_REFUSED` when navigating.

**Solution**: Wait 15-20 seconds after starting dev server, verify with curl:
```bash
curl -s http://localhost:3000 > /dev/null && echo "Ready"
```

---

## Files to Check for Design System Compliance

1. **Color tokens**: `/app/globals.css` (lines 8-53 for light mode)
2. **Font definitions**: `/app/layout.tsx` (font configurations)
3. **Utility functions**: `/lib/utils.ts` (cn() function for className merging)
4. **Component patterns**: `/sections/*.tsx` (for animation patterns)
5. **shadcn/ui config**: `/components.json` (for component style baseline)

---

## Validation Report Template

Use this structure for all validation reports:

1. **🔴 Critical Issues** - Blocking bugs, accessibility violations
2. **🟡 Important Suggestions** - Design system violations, UX improvements
3. **🟢 Minor Polish** - Spacing tweaks, animations, nice-to-haves
4. **✅ Design System Compliance** - What's working well
5. **📱 Responsive Behavior** - Breakpoint analysis
6. **🎨 Visual Consistency** - Comparison with existing components
7. **⚠️ Edge Cases** - Testing missing data, long content, etc.
8. **✨ Recommendations** - Actionable next steps

Include code snippets and line numbers for all findings.

---

## Key Learnings from Validations

### 2026-02-05: News & Events Detail Pages
- Next.js 15 async params caught early through runtime error
- Code review can identify design token violations without browser testing
- Breadcrumb components exist but aren't consistently applied
- CategoryBadge component needs refactoring for design system compliance
- Sticky sidebar pattern well-implemented but needs navbar height verification
- PortableTextContent is exemplary in design token usage

**Pattern Recognition**: When new sections are added, check if existing components (like Breadcrumb) should be applied for consistency.

---

## Agent Collaboration Notes

**When to escalate to coder-agent**:
- Critical implementation bugs (like async params issue)
- Design token violations requiring code changes
- Missing accessibility features
- Component refactoring needs

**When to escalate to code-reviewer**:
- After fixes are implemented
- Before committing changes
- Security concerns (external links, user input)

**When to escalate to sanity-cms-architect**:
- Query parameter issues
- Schema-related bugs
- Content modeling concerns

---

## Remember

- **Always read the file before testing** - Many issues can be caught in code review
- **Check browser console first** - Runtime errors reveal implementation bugs quickly
- **Test with real data** - Query Sanity for actual slugs/content before browser testing
- **Document patterns** - Every validation reveals reusable patterns for future work
- **Think mobile-first** - Start validation at smallest breakpoint and scale up
