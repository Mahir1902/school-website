# Editing website content

The school website's news, events, notices, photos, videos, academic calendar, homepage statistics and testimonials are edited in **Pages CMS**, a free web editor. You don't need to know any code.

## Getting access

1. A developer with access to the GitHub repository signs in once at <https://app.pagescms.org> with GitHub, installs the Pages CMS GitHub App on the repository, and opens it.
2. They invite each editor by email from the Pages CMS **Collaborators** settings. Editors don't need a GitHub account.
3. Editors follow the link in the invitation email and sign in with that email address.

## Making a change

1. Sign in at <https://app.pagescms.org> and open the school website.
2. Pick what to edit from the sidebar:

   | Sidebar item | Shows up on |
   |---|---|
   | News & Events → News | `/news-events/news`, the homepage News section, article pages |
   | News & Events → Events | `/news-events/events/upcoming` and `/past`, event pages |
   | News & Events → Notices | `/news-events/notices` |
   | Gallery → Photos / Videos | `/news-events/gallery`, `/news-events/gallery/videos` |
   | Academic calendar | `/academics/calendar` |
   | Homepage → Statistics / Testimonials | the homepage |

3. Open an entry to edit it, or add a new one. Fill in the form; the grey help text under each field explains what it is for.
4. Click **Save**. The website rebuilds automatically and the change is live within a few minutes.

## Things to know

- **Web address (news and events):** lowercase words joined by hyphens, e.g. `science-fair-2026`. It becomes the page's link (`/news-events/science-fair-2026`), so don't change it after publishing, and don't reuse one already taken by another news article or event.
- **Images:** upload JPG, PNG or WebP photos. Resize large phone photos to about 2000 pixels wide first; the editor does not shrink them. Fill in the image description for visitors using screen readers.
- **Events** move from Upcoming to Past automatically once their start time passes. Enter times in school (Dhaka) time.
- **Notices** disappear from the site after their expiry date. Pin a notice to keep it at the top. Attachments can be PDF, Word or Excel files.
- **Statistics and testimonials** appear in the order listed; reorder the list to change it. Untick "Show on website" to hide a testimonial without deleting it.
- **Article text** supports headings, bold, italics, lists, links and images using the editor toolbar.
- Every save is recorded in the repository history, so a developer can restore an earlier version if something goes wrong.
