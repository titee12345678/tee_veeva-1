# Verification — single-page update

The journal was checked in Chromium at widths 320, 375, 390, 600, 768, 900, 1024, 1440, and 1920 pixels, plus 844×390 landscape. Each size passed checks for page overflow and visible button targets of at least 44×44 CSS pixels. A narrow-calendar overflow was reproduced at 320px and fixed by allowing grid children to shrink and sizing the seven date columns explicitly.

The river portrait is the first image and the first album photograph. All twelve photos, both films, the entire letter and postscript, milestones, and calendar are in `index.html`. Navigation points to local chapter IDs; former page URLs redirect to those chapters. The six HTML entry points are English and chapter IDs are unique.

Checked behavior:

- The mobile menu opens, closes after selecting a chapter, and keeps the reader in the same document. Navigation remains fixed and changes to an opaque surface while scrolling. At 667×320, keyboard focus reaches the last menu link inside a scrollable menu; resizing to 1024px closes the mobile menu and shows all five desktop chapter links without overflow.
- Month navigation changes November to December with 31 dates. Date calculations retain the five passing unit tests for recurrence, same-day events, Bangkok midnight, leap years, and non-negative elapsed time.
- Reduced motion removes hero transforms, reveals the complete letter, and keeps the postcard paused. Switching motion preference remains supported.
- The Remotion postcard starts when visible, has native controls plus pause/replay, and pauses off screen. Its encoded output was inspected: H.264, 1280×720, 30fps, 12 seconds, approximately 2.2 MB. Representative frames from all three chapters were visually inspected.
- The image viewer continues to use a native dialog with arrow navigation, Escape, and restored focus.

`npm run check` validates the website JavaScript. `npm test` passes all five date tests. The Remotion composition compiled and rendered successfully. Its npm dependency audit reported zero vulnerabilities at installation.

UI/UX Pro Max was used for design-system and UX searches; project-specific decisions are recorded in `UX-UPDATE.md`. The hosted Remotion MCP is shut down, and this browser session had no Studio WebMCP bridge; the film was generated with the actual local Remotion CLI. No MCP use is claimed.

Review: all content remains in a native vertical flow; user controls and English copy stay visible; no third-party scripts or rendering framework are delivered to viewers; photographs, fonts, and the encoded film are served locally. Original media and legacy supporting files are retained. Publish the root of `main` through GitHub Pages; revert the feature commits to undo the update.
