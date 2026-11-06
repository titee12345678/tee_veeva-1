# Tee & Veeva — one continuous photo journal

Visual thesis: a photographic love letter, mixing warm ivory paper, forest-green ink, literary typography, and the couple's own photographs. The river portrait opens the website and is the first photograph in the album.

Content progression: cover → the beginning → eleven photographs in reading order → the full letter and postscript → a Remotion postcard and the original video → relationship milestones and the full calendar → closing. Navigation stays in the same document. Previous page URLs redirect to their matching chapters.

Interaction thesis: gentle camera-like cover parallax, staggered photo entrances, a letter coming into focus, and a three-chapter Remotion film. There is no pinned horizontal gallery, nested scrolling area, or automatic looping video. Film playback has visible controls; reduced motion disables automatic playback and decorative transforms.

UI/UX Pro Max was applied to the existing identity: 16px body copy, at least 44px button targets, fluid typography, shrinking grid children, safe-area padding, native anchors, readable photo captions, and responsive vertical layouts. Gallery order follows DOM order. Calendar controls wrap instead of overflowing on narrow phones.

The film is generated locally with Remotion, while the published website stays buildless. Editable composition code lives in `motion/`. Local fonts and optimized photographs are retained. Dates are calculated in Asia/Bangkok.
