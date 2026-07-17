# JAQUES.DESIGN — concept launch site

A continuous, scroll-controlled typographic film. Built with Next.js, React,
TypeScript, GSAP ScrollTrigger and restrained Lenis smooth scrolling.

The letter **J** is the portal: solid type → outline → mask → negative space →
grid → navigation marker, across ~1100vh of pinned scenes.

## Scenes

- `00` Loader — calibration line, `INITIALISING 000%`
- `01` Hero — JAQUES.DESIGN, the J scales into a portal
- `02` Inside — diagonal planes, THINK / ACROSS / THE ENTIRE / PROBLEM
- `03` Process — warm paper, horizontal 1 → 2 → 3
- `04` Capabilities — REASON / CODE / BUILD typographic transformations
- `05` Index — specification rows against a stationary J (Kimi K3 refs kept intentionally for now)
- `06` Climax — the single signal-color moment
- `07` Final CTA — BOOK JAQUES

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

`prefers-reduced-motion: reduce` removes pinning, zooming and smooth scroll;
all content remains as a plainly scrollable document.
