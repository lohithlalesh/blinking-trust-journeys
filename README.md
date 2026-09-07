# Blinking — Real people. Real trust.

A responsive React/TypeScript website preserving Blinking's Epilogue typeface, original logo, #5A6DB2 blue, #00D59F mint and #161C36 navy. Signzy inspires the narrative pacing and identity journey, with original copy and Blinking's own published capabilities.

## Run

```sh
npm install
npm run dev -- --port 5176
npm run build
```

## Animation

Higgsfield generated one GPT Image 2 image and one 6-second Seedance 2.5 clip. Preflight estimates were 6.5 + 54 = 60.5 credits, within the 200-credit cap; no additional generations were submitted. The clip was converted using ffmpeg in Higgsfield's media sandbox into 90 desktop WebP frames (720px, 15fps) and 90 mobile frames (480px). The phone experience requests every second mobile frame. The hero WebP is about 52KB; the full desktop sequence is about 1.5MB.

`components/scroll-journey.tsx` connects page scroll to frame selection using GSAP ScrollTrigger. Five concurrent requests and a bounded decoded-image cache limit resource use. A static poster remains visible until frames load; a pause button, keyboard-accessible chapter links, mobile layout, and reduced-motion presentation are included. The generated visual is illustrative, not a live identity-verification product.

The contact, product-detail, plan and company links go to Blinking's real site. No fake form submissions, invented statistics, or cloned Signzy customer claims are included.

## Sources

- https://www.blinking.id/
- https://www.blinking.id/solutions/identify/
- https://www.blinking.id/wp-content/themes/blinking/assets/css/main.css?ver=7.1
- https://www.blinking.id/wp-content/themes/blinking/assets/img/general/blinking-logo.svg
- https://www.signzy.com/

The original logo, footer logo, customer logos and phone screenshot were downloaded directly from Blinking. Epilogue is self-hosted from the same Google Fonts family referenced by Blinking's CSS.

## Verification

```sh
npx tsc --noEmit
npx oxlint app components/navigation.tsx components/scroll-journey.tsx components/industries.tsx components/page-motion.tsx
npm run build
```

The template-wide `npm run lint` includes pre-existing findings in unused generated UI components and `hooks/use-mobile.ts`; application files are linted explicitly above. No browser UI QA was run. Static document, media completeness and build checks are performed separately.
