# `.pages.yml` reference

Complete condensation of the Pages CMS 2.x docs (all 41 pages, read October 2026). Every docs page is also served as raw Markdown at `https://pagescms.org/docs/<path>.md` (for example `https://pagescms.org/docs/configuration/fields/block.md`); `curl` that if something here looks stale, it is more faithful than a summarising web fetch.

## Contents

1. Top level
2. media
3. content (collection, file, group)
4. format and editors
5. filename
6. view
7. operations
8. fields: common keys, pattern, list, body
9. Field types
10. components
11. actions
12. settings and commit
13. Collaborators and auth
14. Self-hosting

## 1. Top level

```yaml
media: ...       # where uploads go and what URL is written
content: [...]   # editable collections, single files, sidebar groups
components: {}   # reusable field definitions
settings: {}     # repo-wide behaviour (merge mode, commit identity/messages, hide settings page)
actions: [...]   # repo-level buttons that trigger GitHub Actions workflows
```

`.pages.yml` lives at the repo root and is read **per repository and per branch**. Suggested authoring order: media, content, components (if fields repeat), settings, actions.

## 2. media

Used by image fields, file fields and images inserted in rich-text.

```yaml
media: media            # string form == { input: media, output: /media }
```

```yaml
media:                  # single object
  input: src/media
  output: /media
  rename: random
  categories: [image]
```

```yaml
media:                  # array of named sources
  - name: images        # required with multiple sources
    label: Images
    input: media/images # repo folder files are committed to (required)
    output: /media/images  # public path written into content (required)
    rename: safe        # false (default, keep name) | true/safe (slugify) | random
    extensions: [png, jpg, webp]
    categories: [image] # image, document, video, audio, compressed, code, font, spreadsheet
    commit:             # per-source commit identity/templates, see section 12
      templates:
        create: "chore(media): add {filename}"
    actions:            # buttons on the media page
      - name: optimize-images
        label: Optimize images
        workflow: pages-cms-media-action.yml
  - name: docs
    input: media/docs
    output: /media/docs
    categories: [document]
```

Field-level media options override the source's defaults. No resizing or optimisation happens on upload.

## 3. content

Each entry is a `collection` (folder of files sharing a schema), a `file` (one file), or a `group` (sidebar organisation only, no editor route, holds nested entries in `items`).

| Key | Meaning |
|---|---|
| `name` * | Unique internal name |
| `label` | UI label |
| `type` * | `collection` \| `file` \| `group` |
| `path` * | Folder (collection) or file path (file). Not used by `group` |
| `fields` | Field schema. Omitted or empty means raw file editor |
| `filename` | Collection only, section 5 |
| `exclude` | Files to ignore in a collection, e.g. `["README.md"]` |
| `format` | Section 4 |
| `delimiters` | Custom frontmatter delimiters, e.g. `"+++"` or `["<!--", "-->"]` |
| `subfolders` | `true`/`false`, allow nested folders in a collection |
| `list` | On `type: file`: the whole file is a top-level array |
| `view` | Collection list display, section 6 |
| `operations` | Allow/block create, rename, delete, section 7 |
| `commit` | Per-entry commit identity/templates, section 12 |
| `actions` | Buttons for the collection/file, section 11 |
| `items` | Child entries of a `group` |

```yaml
content:
  - name: site
    label: Site settings
    type: file
    path: data/site.yml
    fields:
      - name: title
        type: string
  - name: docs
    label: Docs
    type: group
    items:
      - name: pages
        type: collection
        path: content/pages
        fields: [{ name: title, type: string }]
      - name: publications
        type: file
        path: data/publications.json
        format: json
        list: true
        fields: [{ name: title, type: string }]
```

## 4. format and editors

`format`: `yaml-frontmatter`, `json-frontmatter`, `toml-frontmatter`, `yaml`, `json`, `toml`, `datagrid`, `code`, `raw`.

Editors:
- **Structured fields**: when `fields` is set.
- **Raw file editor**: `fields` omitted/empty (robots.txt, redirects, small config files).
- **Code editor**: `format: code` on a single file.
- **Datagrid** (CSV-style table): `format: datagrid`, inferred automatically for `.csv`.

## 5. filename (collections only)

```yaml
filename: "{primary}.md"
filename:
  template: "{year}-{month}-{day}-{primary}.md"
  field: create     # false: hide filename input | create: show on create only | true: show on create and edit
```

Tokens: `{primary}` (view.primary, else `title`, else first field), `{slug}` (alias of primary), `{year}` `{month}` `{day}` `{hour}` `{minute}` `{second}` (current time, zero-padded), `{fields.<name>}` (entry field value, slugified), `{<name>}` (shorthand).

## 6. view (collections only)

| Key | Meaning |
|---|---|
| `fields` | Columns in the list, in order; dotted paths ok (`author.name`) |
| `primary` | Main label field, defaults to `title` |
| `sort` | Fields offered for sorting |
| `search` | Fields indexed for search |
| `default.search` / `default.sort` / `default.order` (`asc`\|`desc`) | Initial state |
| `layout` | `list` \| `tree` |
| `node` / `node.filename` / `node.hideDirs` (`all`\|`nodes`\|`others`) | Tree mode |

```yaml
view:
  fields: [title, published, date]
  primary: title
  sort: [date, title]
  default: { sort: date, order: desc }
```

## 7. operations

```yaml
operations:
  create: true
  rename: false
  delete: false
```

Defaults: collection create/rename/delete all `true`; file create `true`, rename `false`, delete `true`. Collaborators are bound by these too, so `delete: false` is a cheap guard against a client deleting a post (or a settings file) by accident.

## 8. fields: common keys

| Key | Meaning |
|---|---|
| `name` * | Stored key |
| `type` * / `component` | Exactly one of them |
| `label` | UI label, `false` hides the label |
| `description` | Helper text under the field |
| `required` | Must be filled (on an object: the object itself, not each child) |
| `pattern` | Regex validation, **string and text fields only** |
| `hidden` | Hide from the editor |
| `readonly` | Visible but not editable; inherited by nested object/block/list children |
| `default` | Initial value (beats list default and the type's default) |
| `list` | Repeat the field, below |
| `options` | Type-specific, section 9 |

`pattern` forms:

```yaml
pattern: "^[a-z0-9-]+$"
pattern:
  regex: "^[A-Z]{3}-\\d{4}$"
  message: "Use format ABC-1234"
```

`list`:

```yaml
- name: tags
  type: string
  list: true
- name: sections
  type: object
  list:
    min: 1
    max: 6
    collapsible:             # true/false or object; object and block lists only
      collapsed: true
      summary: "{title} ({index})"   # {index} 1-based, {fields.x} or {x}; missing values are empty; default "Item #n"
  fields: [...]
```

`field.list` (form repeats the field) is different from `options.multiple` (one field managing several selections, e.g. select/reference/image).

**`body` is special**: in frontmatter formats it maps to the file content below the frontmatter; all other fields stay in frontmatter.

## 9. Field types

| Type | Options |
|---|---|
| `string` | `minlength`, `maxlength` |
| `text` (multi-line) | `minlength`, `maxlength` |
| `rich-text` | `format` (`markdown` default \| `html`), `switcher` (Editor/Source toggle, default `true`), `media` (source name or `false`), `path` (default image folder), `extensions`, `categories` (`image`), `rename` |
| `number` | `min`, `max` |
| `boolean` | none |
| `date` | `format` (date-fns, e.g. `yyyy-MM-dd`), `time` (adds time picker), `min`, `max`, `step`. Initialises to now; `default: ""` keeps it empty |
| `select` | `values` (required; strings or `{ name, label }`), `multiple`, `min`, `max`, `placeholder`. Static values only |
| `reference` | `collection` (target), `multiple`, `min`, `max`, `search` ("name,email,fields.role"), `value` (stored template, e.g. `"{path}"`), `label` (display template). Tokens: `{path}` `{name}` `{primary}` `{fields.<path>}` `{<path>}` |
| `image` | `media`, `path`, `multiple` (`{ max: 6 }`), `extensions`, `categories` (`image`), `unique`, `rename` |
| `file` | `media`, `path`, `multiple`, `extensions`, `categories` (`image`, `document`, `video`, `audio`, `compressed`), `unique`, `rename` |
| `object` | none; nest `fields` |
| `block` | `blocks` and `blockKey` set **on the field** (see below) |
| `code` | `format`: yaml, yml, javascript, js, jsx, typescript, ts, tsx, json, html, htm, markdown, mdx |
| `uuid` | `editable` (type a custom value), `generate` (`false` hides the regenerate button). Auto-generated unless `default` set; `default: ""` forces empty |

Examples:

```yaml
- name: body
  type: rich-text
  options:
    format: html
    media: images
    rename: true

- name: published
  type: boolean
  default: true

- name: publish_at
  type: date
  default: ""
  options:
    time: true
    format: yyyy-MM-dd'T'HH:mm

- name: author
  type: reference
  options:
    collection: authors
    value: "{primary}"
    label: "{primary}"
```

Block (page-builder sections, each item a different schema; stored as objects with the chosen block name under `blockKey`, default `_block`):

```yaml
- name: sections
  type: block
  list: true
  blockKey: type
  blocks:
    - name: hero
      component: hero          # reuse a component
    - name: faqs
      fields:
        - name: items          # repeated data: nest a list field inside the block
          type: object
          list: true
          fields:
            - name: heading
              type: string
            - name: text
              type: rich-text
```

Saves as `sections: [{ type: hero, ... }, { type: faqs, items: [...] }]`. A block whose root is itself a list (`list: true` + `component` on the block) is not supported.

Custom field types exist but require running your own Pages CMS instance (a folder under `fields/custom/<type>/` in the Pages CMS app, exporting `schema`, `EditComponent`, etc.). Not available on the hosted app.

## 10. components

```yaml
components:
  seo:
    type: object
    label: SEO
    fields:
      - name: title
        type: string
      - name: description
        type: text
content:
  - name: pages
    type: collection
    path: content/pages
    fields:
      - name: seo
        component: seo
        label: Meta        # field-level keys override the component's
```

## 11. actions

Buttons that dispatch a GitHub Actions workflow via `workflow_dispatch`. Placement: repo level (top-level `actions`, sidebar), or on a collection, entry, file or media source.

| Key | Meaning |
|---|---|
| `name` * / `label` * | Internal name / button text |
| `workflow` * | File name in `.github/workflows/` |
| `ref` | Git ref to dispatch on; `current` = branch open in the CMS |
| `scope` | Collections only: `collection` or `entry` |
| `cancelable` | Default `true` |
| `confirm` | `false` to skip, or `{ title, message, button }` |
| `fields` | Extra inputs: `name`, `label`, `type` (`text`, `textarea`, `select`, `checkbox`, `number`), `required`, `default`, `options` (`[{ label, value }]` for select) |

The workflow must accept a `payload` string input:

```yaml
on:
  workflow_dispatch:
    inputs:
      payload:
        description: Pages CMS payload as JSON
        required: true
        type: string
```

`payload` is JSON with `source`, `action {name,label}`, `repository {owner,repo,ref,workflowRef,sha}`, `triggeredAt`, `triggerType`, `triggeredBy {name,email,githubUsername,...}`, `context {type,name,path,data}`, `inputs {...extra fields}`. Parse with `jq`, node or `actions/github-script`. GitHub Actions must be enabled on the repo.

Permissions: only GitHub users get "Run again"; collaborators can cancel only their own runs.

## 12. settings and commit

```yaml
settings:
  hide: false          # true hides the Settings page
  content:
    merge: false       # default: rewrite file from schema only, REMOVING keys not in fields
                       # true: merge into existing file, keeping unknown keys
  commit:
    identity: app      # app (default, GitHub app/installation identity) | user (send editor name/email)
    templates:
      create: "Create {path} (via Pages CMS)"                   # defaults shown
      update: "Update {path} (via Pages CMS)"
      delete: "Delete {path} (via Pages CMS)"
      rename: "Rename {oldPath} to {newPath} (via Pages CMS)"
```

Template tokens: `{action}` `{path}` `{filename}` `{name}` `{owner}` `{repo}` `{branch}` `{userName}` `{userEmail}` `{user}` (legacy), rename only: `{oldPath}` `{newPath}` `{oldFilename}` `{newFilename}`.

`content[].commit` and `media[].commit` override identity/templates per schema. Deleting `.pages.yml` from the UI is disabled by default.

## 13. Collaborators and auth

- Invited by email, for people without GitHub. Scoped to one repo (matched on email + owner + repo).
- Can open invited repos and edit content and media, within each entry's `operations`.
- Cannot manage `.pages.yml`, collaborators, or cache admin; those need a real GitHub user with repo access.
- Writes use the GitHub App installation token; commits show the app identity unless `commit.identity: user`.
- Token order: signed-in GitHub user's token if it can access the repo, else collaborator record, else denied.
- Collaborators are stored in Pages CMS's PostgreSQL database, not the repo. Moving installs: `npm run db:collaborators:export -- --output=collaborators.csv`, then `db:collaborators:import -- --input=...` (`--replace` optional).
- The CMS caches repo state in its database and refreshes via GitHub push webhooks; branch freshness rechecks every ~5 minutes by default. Commits made outside the CMS normally show quickly, but brief staleness is expected.

## 14. Self-hosting (only if the hosted app.pagescms.org won't do)

Needs: PostgreSQL (`DATABASE_URL`), `BETTER_AUTH_SECRET`, `CRYPTO_KEY` (`openssl rand -base64 32`), `BASE_URL` (required in production, one canonical URL), your own GitHub App (`npm run setup:github-app -- --base-url https://cms.example.com --env .env` in the Pages CMS repo, then disable "User-to-server token expiration"), `npm run db:migrate`. Optional `ADMIN_EMAILS`. **Collaborator invite emails need `EMAIL_PROVIDER` (`resend` or `smtp`) plus `EMAIL_FROM` and the provider's keys.**

Deploy targets: Vercel (deploy button in the docs; with a pooled Supabase URL set `POSTGRES_MAX_CONNECTIONS=1`), any Node host behind HTTPS (`npm run build && npm run start`), or local with Docker Postgres.

GitHub App permissions it requests: Email addresses (read); repo Administration, Actions, Contents (read/write); Checks, Commit statuses, Metadata (read). Events: installation target, repository, push, delete, check run, check suite, status, workflow run.
