---
name: pages-cms
description: Set up, configure and troubleshoot Pages CMS (pagescms.org), the free open-source Git-based CMS that lets non-technical editors edit content files in a GitHub repo through a web UI. Use this skill whenever the user wants a client or non-developer to edit blog posts, pages, team members, FAQs or other site content without touching code, mentions `.pages.yml`, app.pagescms.org, "a CMS for the static site", "let the client write blogs", inviting editors by email, or moving hardcoded content (TS/JSON arrays) into editable files. Also use when wiring a static/prerendered site (React Router, Vite, Astro, Next export, Hugo, Eleventy) to read content files that Pages CMS will write.
---

# Pages CMS

Pages CMS is a web UI over files in a GitHub repo. There is no database for content and no backend to build: an editor saves a form, Pages CMS commits the file, and the host (Vercel, Netlify, Cloudflare Pages) rebuilds on push. Everything is driven by one file, `.pages.yml`, at the repo root.

So the work is always two halves:

1. **Content files + config**: decide the file format and folder, write `.pages.yml` describing the fields.
2. **Site reads the files**: make the site load those files at build time (and prerender any new routes).

Full key-by-key config reference, condensed from every docs page: `references/config.md`. Read it when you need a field type, option or token you aren't sure of; don't guess keys. If you need the source, every docs page is served as raw Markdown at `https://pagescms.org/docs/<path>.md`; `curl` that rather than a summarising web fetch, which drops detail.

## How editors get in (tell the user this, it is usually their real question)

- Hosted, free: the developer signs in at https://app.pagescms.org with GitHub, installs the Pages CMS GitHub App on the repo, and picks the repo.
- Clients don't need GitHub: invite them by email as **collaborators** (from the Pages CMS UI). Collaborators can edit content and media only, not config or other collaborators.
- Collaborators live in Pages CMS's database, not the repo, so moving to a self-hosted instance needs a collaborator export/import. Self-hosting also means PostgreSQL, your own GitHub App and an email provider (Resend or SMTP) for invites; only suggest it if the hosted app is ruled out.
- Commits are made by the GitHub App identity by default; `settings.commit.identity: user` records the editor's name/email instead.
- No login, admin page or auth code is added to the site itself.

## Workflow

### 1. Pick the content format

Choose what the site can load with the least code, not what is fashionable:

- **JSON files** (`format: json`) when the site is JS/TS and bodies are HTML or plain fields. A bundler can import a folder of JSON with zero parsing (Vite: `import.meta.glob("../content/posts/*.json", { eager: true, import: "default" })`).
- **Markdown + YAML frontmatter** (`format: yaml-frontmatter`, the default for `.md`) when the site already has a Markdown pipeline (Astro, Hugo, Eleventy, MDX).
- Rich-text fields store **markdown** by default; set `options.format: html` if the site renders HTML (for example via `dangerouslySetInnerHTML`). Match whatever existing content uses so it migrates verbatim.

### 2. Write `.pages.yml`

Minimal blog collection (JSON, HTML body, images into the site's public folder):

```yaml
media:
  input: public/images/blog     # where uploads are committed
  output: /images/blog          # URL written into content
  extensions: [jpg, jpeg, png, webp]
content:
  - name: posts
    label: Blog posts
    type: collection
    path: content/posts
    format: json
    filename: "{fields.slug}.json"
    fields:
      - name: title
        type: string
        required: true
      - name: slug
        type: string
        required: true
        pattern: "^[a-z0-9-]+$"
        description: Web address of the post, lowercase words joined by hyphens.
      - name: date
        type: date
        options:
          format: yyyy-MM-dd
      - name: html
        label: Body
        type: rich-text
        options:
          format: html
    operations:
      rename: false     # renaming would change a live URL
    view:
      fields: [title, date]
      primary: title
      sort: [date, title]
      default: { sort: date, order: desc }
```

Notes that save rework:

- `media.input` must be inside the folder the host serves statically (`public/` for Vite/React Router/Next, `static/` for Hugo/SvelteKit), and `output` is that path minus the public prefix. Mismatch = broken images on the live site.
- Field `name`s become the stored keys. Reuse the site's existing property names so the loading code doesn't change.
- Store dates in a sortable format (`yyyy-MM-dd`) and format them for display in the site. Human dates like "March 16, 2012" sort wrong.
- Write `description:` on fields in plain language. Editors are non-technical; that helper text is their only documentation.
- `settings.content.merge` defaults to `false`: on save, any key not declared in `fields` is deleted from the file. Declare every key the site reads (`hidden: true` for ones editors shouldn't touch) or set `merge: true`.
- Use `operations` to switch off what the client shouldn't do (`rename: false` for anything that is a URL, `delete: false` on single files like site settings). Collaborators are bound by it.
- Prefer an explicit `slug` field (or `filename.field: create`) over `{primary}` when URLs already exist and must not change.

### 3. Make the site read the files

- Load the folder at build time and sort in code (newest first). Keep the exported shape identical to the old hardcoded array so pages don't change.
- Bundler-only APIs like `import.meta.glob` don't exist in Node config files. If a framework config (for example `react-router.config.ts` prerender list) needs slugs, read the folder with `node:fs` there.
- **Prerendered/static sites must list new routes.** If dynamic routes are enumerated for prerendering or the sitemap, derive them from the same content folder, otherwise a new post works in dev but 404s or serves the SPA shell in production.
- Migrate existing content into the new files with a one-off script (don't hand-copy), then delete the old array and confirm the build output still contains every old URL.

### 4. Guard the build against editor input

Editors will paste from Word and upload phone photos. Anything in the build that fails on content they typed means their post silently never goes live, and they get no error. Check for:

- Lint/check scripts that scan content folders (banned characters, spelling, link checkers). Make them auto-fix content or skip the content folder rather than fail. In this repo, `scripts/check-dashes.mjs` fails on em/en dashes; normalise them in content (e.g. replace with ", ") instead of failing.
- Image weight: Pages CMS does not resize or convert uploads. Restrict `extensions`, and if performance matters add a GitHub Action (triggerable from the CMS via `actions:`, see reference) that converts to WebP/resizes, or process images at build time.
- Raw HTML: rich-text output is editor-controlled. Fine for a trusted client; don't render it unsanitised if untrusted people can be collaborators.

### 5. Verify

- Run the production build and check the generated HTML for each content URL.
- Commit a sample entry the way Pages CMS would (same format and filename pattern), rebuild, confirm it appears in the list page, detail page, sitemap and prerender output.
- Tell the user the remaining manual steps: sign in at app.pagescms.org, install the GitHub App on the repo, invite the client by email.

## Hosting caveat worth mentioning

Every save triggers a rebuild, so the host must build on push. Vercel's free Hobby plan is non-commercial only; a business site needs Vercel Pro or a host whose free tier allows commercial use (Cloudflare Pages, Netlify).
