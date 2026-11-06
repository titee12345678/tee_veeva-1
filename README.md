# Tee & Veeva

A photographic love letter from Tee to Veeva. An English photo journal with warm paper tones, forest-green typography, and the couple's own photographs.

## Explore

- `index.html` — our story, a parallax cover, a scroll-linked photo sequence, a personal letter, and relationship milestones.
- `slides.html` — twelve photographs with a keyboard-accessible full-screen viewer and the original video memory.
- `calendar.html` — birthdays and anniversaries, month navigation, and the next occasion in Bangkok time.
- Original `index1.html`, `congratulations.html`, and `demo.html` links continue to the corresponding redesigned experience.

Music is off until the visitor chooses to play it. Reduced-motion settings disable scroll-linked transforms and animated reveals. The mobile photo sequence supports native horizontal swiping.

## Run locally

Use Node.js 22 or newer for the checks, and Python 3 for the local server. No package installation or build step is required.

```sh
npm run dev
# Open http://127.0.0.1:4173
npm test
npm run check
```

## Publish

This is a static website, ready for GitHub Pages. Serve the root of the `main` branch. Asset URLs are relative, so the site also works under a repository subpath.

## Notes

The relationship dates come from the original site: first meeting on 24 November 2024, relationship anniversary on 9 March 2025, and birthdays on 1 July and 31 July. Recurring occasions advance to the next year after the date has passed.

Optimized WebP photographs and locally hosted fonts avoid third-party runtime dependencies. Cormorant Garamond and Manrope are supplied under the SIL Open Font License; their licenses are in `assets/fonts/`. Original media and legacy supporting files are retained, while the new pages load only the files under `assets/` and their selected media.

See [the design notes](docs/DESIGN.md) for the visual and interaction direction.
