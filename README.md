# Blinking — Real people. Real trust.

A responsive React/TypeScript website preserving Blinking's Epilogue typeface, original logo, #5A6DB2 blue, #00D59F mint and #161C36 navy. Signzy inspires the narrative pacing and identity journey, with original copy and Blinking's own published capabilities.

## Run

```sh
npm install
npm run dev -- --port 5176
npm run build
```

## Three distinct scroll scenes

- Verify clients’ identity: biometric lens, real person and identity document.
- Video verification: a live customer-and-agent call on a laptop.
- Collect data: identity, contact and address cards organizing into a folder.

Each chapter controls its own clip through GSAP ScrollTrigger. ffprobe confirmed all raw sources are 1440 x 1440 at 24fps. FFmpeg exports use 1200px desktop frames at quality91, and 768px mobile frames at quality86. Mobile requests every second frame. Feathered edges and background-colored padding blend the scenes into #F3F4F8 instead of a bordered tile.

The component keeps at most five concurrent requests and a cache of 16 desktop or 12 mobile decoded frames. Posters remain visible while loading and when motion fails; users can retry, pause, resume and navigate between chapters. Reduced-motion visitors see all three still scenes beside their descriptions.

## Credit ledger

Four image masters and five video clips were generated through Higgsfield, with no generation retries.

| Generation | Exact estimated credits |
|---|---:|
| Original identity image, GPT Image2 2k/high | 6.5 |
| Original identity clip, Seedance2.5 6s | 54 |
| Video verification image, GPT Image2 2k/high | 6.5 |
| Data collection image, GPT Image2 2k/high | 6.5 |
| Video verification clip, Seedance2.5 6s | 54 |
| Data collection clip, Seedance2.5 5s | 45 |
| New gateway hero, Nano Banana image | 2 |
| 3D identity hero loop, Grok Video 4s | 6 |
| 3D AML screening loop, Grok Video 4s | 6 |
| **Total** | **186.5 / 200** |

These are the tools' exact preflight estimates. FFmpeg conversions did not submit generation jobs. Visuals are illustrative, not a live identity verification service.

Contact, product, plan and company links go to Blinking's real site. No fake forms or invented statistics are included.

## Connected platform and industry stories

The hero uses the exact Blinking SVG mark as a layered CSS 3D loop. The selected 720px Higgsfield identity-ring film now illustrates AML and due diligence, with accessible HTML capability labels and a static poster fallback. The separately generated dark AML candidate remains recorded in the credit ledger but is not shipped. The verification films retain their original imagery.

The platform sequence connects Collect → Verify → Review → Welcome. GSAP scrubs the connecting lines, reveals the steps, and transitions the explanatory copy in a pinned stage. Below 1024px width or 800px height, all steps stay in the document and a compact progress diagram remains visible as they scroll. Reduced motion keeps every step visible without animation or pinning.

Industry examples show bank account opening, remote subscriber onboarding, and player verification. On spacious desktops vertical scrolling moves one horizontal track; smaller screens and reduced-motion mode use native horizontal scrolling. Named industry buttons and previous/next controls are available in both modes. These are explanatory diagrams, not screenshots or live verification results.

## Sources

- https://www.blinking.id/
- https://www.blinking.id/solutions/identify/
- https://www.blinking.id/wp-content/themes/blinking/assets/css/main.css?ver=7.1
- https://www.blinking.id/wp-content/themes/blinking/assets/img/general/blinking-logo.svg
- https://www.signzy.com/

The original logo, footer logo, customer logos and phone screenshot were downloaded directly from Blinking. Epilogue is self-hosted from the same Google Fonts family referenced by Blinking's CSS. Its OFL license is included with the font files.

## Verification

```sh
npx tsc --noEmit
npx oxlint app components/navigation.tsx components/scroll-journey.tsx components/platform-journey.tsx components/industries.tsx components/page-motion.tsx
npm run build
```

The template-wide `npm run lint` includes pre-existing findings in unused generated UI components and `hooks/use-mobile.ts`; application files are linted explicitly above. No browser UI QA was run. Static document, media completeness and build checks are performed separately.
