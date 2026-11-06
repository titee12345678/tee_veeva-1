# Tee & Veeva

One continuous, English photo journal: a river-side cover, our story, eight additional photographs without repeating the cover or story images, the complete letter, two films, and a working relationship calendar. Every chapter is on `index.html`; the navigation scrolls within the same page.

[Open the website](https://titee12345678.github.io/tee_veeva-1/)

The original `slides.html`, `calendar.html`, `index1.html`, `congratulations.html`, and `demo.html` addresses redirect to the corresponding chapter. Music stays off until requested. The generated postcard has pause/replay controls and respects reduced motion. Photographs enlarge in a keyboard-accessible dialog.

## Local preview and checks

The website itself is buildless and has no runtime framework dependencies. Use Node.js 22 or newer for checks and Python 3 for the server.

```sh
npm run dev
# http://127.0.0.1:4173
npm test
npm run check
```

## Remotion source

`motion/` contains the editable 12-second, 1280×720, 30fps composition. The site serves its rendered H.264 MP4 from `assets/motion/`; visitors do not load the rendering tools.

```sh
npm --prefix motion ci
npm --prefix motion run studio
npm --prefix motion run poster
npm --prefix motion run render
```

The render scripts use Google Chrome at its standard macOS application path on this workspace. Adjust `--browser-executable` for another operating system or omit it to use Remotion's bundled browser.

Remotion's hosted documentation MCP closed in October 2026. Studio WebMCP was attempted, but this session's browser exposed no `document.modelContext` and the Codex browser host was unavailable. The film was rendered using the actual Remotion CLI. See [the UX and tooling notes](docs/UX-UPDATE.md).

## Design and dates

UI/UX Pro Max informed touch targets, readable type, native vertical flow, responsive grids, chapter navigation, and reduced-motion behavior. The ivory/forest palette, local Cormorant Garamond/Manrope fonts, and original photographs preserve the journal's identity. Font licenses are in `assets/fonts/`.

The original dates are retained: first meeting on 24 November 2024, relationship anniversary on 9 March 2025, and birthdays on 1 and 31 July. Calculations use Bangkok time and recurring events roll forward.

GitHub Pages serves the root of `main`. All assets use relative URLs so the site works under its repository path. Original media and legacy supporting files are retained. See [verification](docs/VERIFICATION.md) for the checked sizes and behavior.
