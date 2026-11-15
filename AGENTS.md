# Working on dorfingerjonas.at

Personal portfolio of Jonas Dorfinger. Static site: plain HTML, CSS and JavaScript, no build step, no dependencies, no framework. GitHub Pages serves the `master` branch at `dorfingerjonas.at` (see `CNAME`), so **a push to `master` is a deploy**.

## Files

| File | Holds |
| --- | --- |
| `index.html` | The whole page. All content lives here as plain markup. |
| `imprint.html` | Legal disclosure (§25 MedienG) and privacy note. |
| `style/main.css` | All styles for both pages. Design tokens at the top, one commented block per section. |
| `scripts/boot.js` | Runs in `<head>` before paint: picks the accent colour, restores the saved theme. Holds the colour palette. |
| `scripts/main.js` | All behaviour. Every feature is switched on by a `data-*` attribute in the markup. |
| `fonts/` | Self-hosted variable fonts: Bricolage Grotesque (headings), Figtree (body). Latin subset only. |
| `img/` | Favicon and project logos. `*.ai` source files are git-ignored. |

## Preview

```bash
python -m http.server 4173
```

Open `http://localhost:4173`. Use a server, not `file://`, so fonts load the way they do in production.

## Rules that are easy to break

1. **Do not invent facts about Jonas.** Roles, dates, employers, project descriptions and hobbies come from him. If a fact is missing, ask; do not fill the gap with something plausible.
2. **No third-party requests.** No CDN scripts, web-font services, analytics, embeds or icon kits. The imprint states that the site sets no cookies, runs no tracking and loads nothing from other servers. If that ever has to change, update the Privacy section of `imprint.html` in the same change.
3. **Never use `--accent` as a text colour.** The accent is random per visit and ranges from pale yellow to dark blue. Use it as a background and put `--on-accent` on top of it; `boot.js` computes that pairing for contrast.
4. **Icons are inline SVG**: 24×24 viewBox, `class="icon"`, stroke-based, `aria-hidden="true"`. The fonts cover basic Latin only, so arrows, symbols and emoji typed as text fall back to a system font and look off.
5. **Keep both themes working.** Colours are tokens defined with `light-dark()` on `:root` in `main.css`. Do not hard-code colours inside components.
6. Indentation is four spaces. Commit only when Jonas asks.

## Editing content

Every section in `index.html` is a `<section class="wrap" id="…">` with a `<header class="title">` (chip + `h2`) followed by its content. To add a new section, copy that shell, pick an `id`, and add a matching link to `<nav class="nav__links">` at the top.

### Hero (`#top`)

Greeting, headline, intro paragraph, three buttons. The three small labels around the avatar are `<span class="sticker sticker--a|b|c">`; their positions are tuned for short text (about 20 characters at most). The avatar is an inline SVG; its shirt takes the accent colour through `.shirt`.

### Now (`#now`)

A six-column bento grid. Each card is `<article class="card card--NAME">` with a chip, an `h3` and a paragraph. Column spans are set per class in `main.css` under `/* Now: bento */` (`card--work` spans 4, `card--lap` 2, `card--study` and `card--abroad` 3 each). A new card needs its own `card--NAME` rule with a span, and a line in the `max-width: 720px` block so it goes full width on phones. Rows should add up to six.

### Stack (`#stack`)

The live layout is the recipe card: one `<li>` per technology inside `<ul class="ingredients">`, with `ingredient__name` and a short `ingredient__note`. The closing line appears by itself once every box is ticked; no script involved.

An alternative layout, the sticker board, is kept **commented out** right below it because Jonas may switch back. Leave it, its styles (`/* Stack: sticker board */` in `main.css`) and the "Draggable stickers" block in `main.js` in place. When the tech list changes, update the commented block too so it does not go stale: one `<li class="tech" data-reveal="pop" data-drag>` per technology. Tilt and colour come from `.tech:nth-child(n)` rules, defined for six items; a seventh needs its own rule or it sits untilted in the plain card colour. To switch back, uncomment the board and comment out the recipe card.

### Projects (`#projects`)

Copy an existing `<a class="card project">` block and change:

- `href`, the `h3`, the one- or two-sentence description, and the link label inside `.project__go`.
- The logo: add an SVG to `img/` and set `width` and `height` on the `<img>` to its real proportions. Keep `alt=""` because the title sits right below. Logos sit on a frame that stays light in dark mode, so draw them for a light background.

The grid is three columns, then two below 900px, then one below 560px. Role tags (`<ul class="tags">`) are supported but commented out on purpose. A commented-out placeholder card (`project--soon`) is kept at the end of the grid for projects that are not ready to show.

### Beyond code (`#beyond`)

Cards are `<li class="card hobby">` with an icon in `.hobby__icon`, an `h3` and one sentence. The grid has four columns and the resting tilt is defined for four cards (`.hobby:nth-child(1…4)`). The fourth card's icon spins a full turn on hover, which is meant for the pizza slice; if the order changes, move that rule with it.

### Contact (`#contact`) and footer

The email address appears in four places: the hero button, the contact button, and twice in `imprint.html`. GitHub and LinkedIn links appear in the hero, the contact panel and under the projects. Change all of them together. The footer year is hard-coded.

### Page metadata

`<title>`, `description` and the `og:*` tags in the `<head>` of `index.html` repeat the role and tagline. Update them when the headline or job changes.

### Imprint

Name, town and email sit in the `<address>` block. The legal wording was written for a private, non-commercial site. If the site starts offering services or Jonas registers a business, the imprint needs a proper review, not a quick edit.

## Behaviour hooks

Add these attributes to markup; `main.js` and `main.css` do the rest.

| Attribute | Effect |
| --- | --- |
| `data-reveal` | Animates in when scrolled into view. Values: none (rise), `pop`, `left`, `right`. Content stays visible without JavaScript. |
| `data-stagger` | On a parent: its `data-reveal` descendants animate one after another. |
| `data-tilt` | Card leans toward the pointer. |
| `data-lap` | Element text becomes the time spent on the page. Reuse freely. |
| `data-parallax` | Container for `.bubble` elements. Each bubble sets `--x`, `--y`, `--s` (size), `--depth`, `--o` (opacity) and `--n` (entry order) inline. |
| `data-eyes` | On the avatar SVG: `.eye` elements follow the pointer. |
| `data-drag`, `data-drag-area` | Element can be dragged with a mouse, kept inside the nearest area. |
| `data-accent-cycle`, `data-accent-name` | Button that steps to the next accent; element that shows its name. |
| `data-theme-toggle` | Button that switches light and dark. The choice is the only thing stored in `localStorage`. |

`main.js` also contains a `data-split` handler left over from a discarded design. Nothing uses it and it has no styles.

## Accent colours

The palette is the `palette` array in `scripts/boot.js` (`name` + lowercase six-digit `hex`). Add or remove entries there and nothing else needs to change. The static fallback `#84a6d6` in `main.css` and in the `theme-color` meta tags only shows if JavaScript is off.

## Before calling a change done

Check the page in the browser, not only in the source:

- Light and dark theme (toggle top right).
- A pale accent and a dark one. Click the dot in the nav to cycle; "Butter" in light mode and "Deep sea" in dark mode are the hard cases.
- 375px wide: nothing overflows sideways, nothing is hidden under the floating nav.
- Console is free of errors and no request leaves the domain.
- All animation respects `prefers-reduced-motion`; new motion should be covered by the existing rule at the end of `main.css`.
