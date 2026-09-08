# Blinking website direction

Audience: enterprise product, risk, and compliance teams evaluating identity onboarding.
Goal: understand Blinking's configurable verification flow and contact its team.
Narrative: real people, real trust; verify clients’ identity, review customers over live video, and collect customer data.
Reference: Signzy's product-led customer journey and pinned animation; no borrowed copy or business claims.
Brand: exact original SVG, Epilogue 300/400/500/600/700, #5a6db2 blue, #00d59f mint, #161c36 navy, #f3f4f8 background.
Structure: Navigation / Hero / Customer proof / ScrollJourney / Solutions / Industries / Privacy / Contact / Footer.
Responsive: stacked hero; two-row customer proof; shorter sticky canvas and natural-length copy on small screens; static fully readable journey with reduced motion.
States: navigation expanded/collapsed, journey loading/static fallback/ready/paused, active industry, hover/focus/pressed. No invented form or fake success states; contact links use Blinking's actual contact page.

## Design risks and corrections
- Generic AI imagery: use a human-centered biometric lens in the actual brand palette.
- Overstated claims: only describe capabilities published by Blinking; no invented accuracy, speed or certification metrics.
- Illegible mint CTA: navy text on original mint.
- Heavy animation: ffmpeg WebP frame sequence, progressive loading, paused/reduced-motion fallback.
- Repeated split cards: vary the page with a sticky journey, asymmetric product composition, industry tabs and typographic privacy band.

## Sources
https://www.blinking.id/
https://www.blinking.id/wp-content/themes/blinking/assets/css/main.css?ver=7.1
https://www.blinking.id/wp-content/themes/blinking/assets/img/general/blinking-logo.svg
https://www.signzy.com/

Motion revision: three distinct clips, shared #F3F4F8 background, feathered edges, high-quality 24fps frame exports, and per-chapter progress.

## September 8 revision

Targeted evolution for enterprise buyers: preserve Epilogue, original palette, logo, navigation, and the three existing verification films. Replace the repeated hero picture with one new gateway sculpture on the exact pale neutral background. Motion intensity 6, layout variance 6, density 4.

Component tree: Home → HeroArtwork; existing ScrollJourney; PlatformJourney → connected four-step diagram + explanatory panels + step navigation; Industries → horizontal viewport + three distinct use-case diagrams + navigation.

The platform story assembles Collect → Verify → Review → Welcome as the visitor scrolls. Industry panels explain bank account opening, subscriber activation, and verified player access. These are examples, never simulated live results or invented product screenshots. Desktop scroll moves the panels horizontally; smaller/short screens use horizontal swiping and explicit navigation. Reduced-motion visitors can access every step without pinning.

Risks and corrections: repeated hero art → new asset; generic identical industry cards → specific symbols and process labels; clipping under the header → measured pin distance and minimum-height breakpoint; hidden keyboard destinations → controls and focus-aware navigation; motion failing to load → all content readable in the initial static layout. Continuous movement uses GSAP refs, with React state only for chapter changes.

## Industry and AML revision

The Review chapter now leads into a dedicated AML and due-diligence section, with indexable copy for AML, PEP, watchlist, media, and configurable risk checks. The section depicts verified identity evidence entering a screening stack and becoming connected review context. It makes the capability visible without presenting a simulated result as real customer data.

Each industry panel is now a four-beat visual sequence: capture, verify, screen or connect, and outcome. Desktop scroll scrubs each sequence before moving the rail to the next industry; mobile keeps the same story in an accessible horizontal carousel. The graphics are code-rendered at device resolution, preserving quality and using no additional video-generation credits.

## Brand loop and screening sculpture

The approved CSS-rendered hero and AML sculpture are preserved at the Git tag `approved-3d-logo-aml-2026-09-08`. The active hero uses a Higgsfield 3D identity loop on the exact pale page color; the AML chapter uses a matching dark screening-orb loop. HTML signal and screening labels stay above or below the films so the meaning remains readable and indexable. Static posters replace motion for reduced-motion visitors. These two additions used 12 credits, bringing the project ledger to 186.5 / 200.
