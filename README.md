# jesusrafael9.github.io

Personal site of Jesus Cardozo — Senior Software Engineer · AI Platform Architecture.

Live at **https://jesusrafael9.github.io/** (Spanish, default) and **https://jesusrafael9.github.io/en/** (English).

It is a static site: hand-written HTML, CSS and JavaScript. No framework, no build step, no npm dependencies, no analytics and no third-party requests (system fonts, inline SVG icons).

## Structure

```
index.html            Spanish page (default language)
en/index.html         English page
assets/css/styles.css Styles and light/dark theme tokens
assets/js/main.js     Theme toggle, footer year, project cards
assets/img/           Avatar (WebP + JPEG) and Open Graph images (SVG source + PNG)
data/projects.json    Projects shown in the "Projects" section
favicon.svg / favicon.ico / apple-touch-icon.png
robots.txt / sitemap.xml
.nojekyll             Tells GitHub Pages to serve the files as they are
```

The two pages share the same structure. When you change copy or markup in one, mirror it in the other.

## Run it locally

The project cards are loaded with `fetch`, which browsers block on `file://` URLs, so opening `index.html` directly will never show the projects section. Serve the folder instead:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/ (Spanish) or http://localhost:8000/en/ (English).

## Add or publish a project

Projects live in [`data/projects.json`](data/projects.json); no HTML changes are needed. Each entry looks like this:

```json
{
  "slug": "fleet-mcp-server",
  "name": "fleet-mcp-server",
  "language": "TypeScript",
  "status": "published",
  "repo": "https://github.com/jesusrafael9/fleet-mcp-server",
  "demo": null,
  "es": { "tagline": "…", "problem": "…", "highlights": ["…", "…", "…"] },
  "en": { "tagline": "…", "problem": "…", "highlights": ["…", "…", "…"] }
}
```

| Field | Notes |
|---|---|
| `status` | Only `"published"` entries are rendered. `"planned"` and `"in_progress"` are ignored. |
| `name`, `es.tagline`, `en.tagline` | Required. An entry without a name or a tagline is skipped. |
| `language` | Optional tag shown next to the name. |
| `repo`, `demo` | Optional. Must be a full `http(s)` URL; use `null` to show no link. |
| `problem`, `highlights` | Optional. Empty values are simply not shown. |

While no project is `"published"`, the whole section and its link in the navigation stay hidden.

To publish one of the planned projects:

1. Fill in `problem` and `highlights` in both `es` and `en`.
2. Check that `repo` (and `demo`, if any) point to a public URL that works.
3. Change `status` to `"published"`.
4. Check both languages locally, then commit.

The order of the file is the order on the page.

## Theme

The site follows the system light/dark preference. The button in the header overrides it and the choice is kept in `localStorage`; choosing the same theme as the system removes the override. Colors are CSS custom properties at the top of `assets/css/styles.css` (the dark set appears twice on purpose: once for the system preference, once for the manual override).

## Open Graph images

`assets/img/og-image-es.svg` and `og-image-en.svg` are the sources. Social networks do not accept SVG, so each one has a 1200×630 PNG next to it. If you edit an SVG, export the PNG again (for example, open the SVG in a browser at 1200×630 and take a screenshot) and keep the same file name.

## Deployment

GitHub Pages publishes the root of the `master` branch. Anything merged into `master` goes live; there is nothing to build.
