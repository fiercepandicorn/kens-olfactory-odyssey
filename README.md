# Ken's Olfactory Odyssey — Website & Media Kit

A single-page website + media kit for **Ken's Olfactory Odyssey**, an independent fragrance content creator. Plus a short Terms & Usage page.

This is a **static site** — plain HTML, CSS, and JavaScript. No build step, no framework, no server. It can be deployed as-is.

---

## Quick deploy (Vercel + GitHub)

This is the intended path. Claude Code can do all of this for you.

### 1. Put it on GitHub
```bash
cd kens-olfactory-odyssey
git init
git add .
git commit -m "Initial commit: Ken's Olfactory Odyssey website"
gh repo create kens-olfactory-odyssey --public --source=. --push
```
(or create the repo on github.com and `git remote add origin … && git push -u origin main`)

### 2. Deploy on Vercel
- Go to **vercel.com → Add New → Project → Import** the GitHub repo.
- **Framework Preset:** `Other` (it's static — no build needed).
- **Build Command:** leave empty. **Output Directory:** leave as root (`.`).
- Click **Deploy**. Live in ~30s on a `*.vercel.app` URL.

Or from the CLI:
```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

### 3. Custom domain
In Vercel → Project → **Settings → Domains**, add e.g. `kensolfactoryodyssey.com` and follow the DNS steps. HTTPS is automatic.

Every push to `main` auto-deploys.

---

## File structure
```
kens-olfactory-odyssey/
├── index.html          # The main site (hero, about, watch, media kit, partnerships, contact)
├── terms.html          # Terms & Usage page (linked from footer)
├── styles.css          # All styling + the 4 theme "directions" and font system
├── app.js              # Scroll reveals, sticky nav, marquee, count-ups, chart animation, inline video player
├── tweaks-app.jsx      # The in-page "Tweaks" control panel (theme / accent / font / grain)
├── tweaks-panel.jsx    # Tweaks panel framework (host protocol + form controls)
├── image-slot.js       # Drag-and-drop image placeholder web component
└── assets/
    ├── ken-lab.png         # Hero image (the workbench portrait)
    └── ken-stilllife.png   # About image (the bottles still life)
```

## How it works (notes for whoever maintains it)

- **No build step.** Open `index.html` over HTTP and it runs. (Use a local server, not `file://`, so fonts/scripts load — e.g. `npx serve` or `python3 -m http.server`.)
- **Fonts** load from Google Fonts (Playfair Display, Bodoni Moda, Cormorant, Newsreader, Spectral, Hanken Grotesk, Space Mono). Internet required at load.
- **Video thumbnails** load from YouTube's CDN (`i.ytimg.com`). The clips play inline in a modal; data lives in `data-vid` attributes on each `.short-card` in `index.html`.
- **Tweaks panel** (theme/accent/font switcher) uses React + Babel loaded via CDN `<script>` tags. It's an authoring aid; the chosen defaults are set in `index.html` on the `<html>` tag (`data-theme`, `data-accent`, `data-display`) and in `tweaks-app.jsx` (`KOO_DEFAULTS`). The current shipped defaults are **Lab / Gold / Playfair**.
- **The `<image-slot>` elements** let someone drag a custom image onto the page (persisted in localStorage in their browser). Not required for the live site.

## Updating content
- **Stats / numbers:** edit the values in the Media Kit section of `index.html` (search for `data-count`, `.stat`, `#viewChart`, `#ageStack`).
- **Videos:** each `.short-card` has a `data-vid="<youtube id>"`, an `href` to the Short, an `<img>` thumbnail (`i.ytimg.com/vi/<id>/maxresdefault.jpg`), a title, and a caption. Swap the IDs/titles to change the grid.
- **Social handles / contact:** in the Contact section and footer of `index.html`.
- **Hero / About images:** replace the files in `assets/` (keep the names, or update the `src`/`<img>` in `index.html`).

## A couple of optional follow-ups the creator may want
- Swap the hero image for a real photo of Ken (it's currently an illustrative portrait).
- Lock a final headline font (default is Playfair; others available in the Tweaks panel).

---
© 2026 Ken's Olfactory Odyssey. Site content is the creator's. Fonts are licensed via Google Fonts (Open Font License).
