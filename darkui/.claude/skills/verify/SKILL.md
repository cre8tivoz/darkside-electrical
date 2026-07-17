# Verify: darkui (Jaques.Design scroll site)

Next.js app in `darkui/`. The surface is a scroll-driven GSAP/Lenis page —
verification means driving the real browser through the scroll film and
looking at screenshots, not running tests.

## Build & launch

```bash
cd darkui
npm install          # first time only
npm run build
npx next start -p 3123   # run in background
```

Always restart the server after a rebuild — `next start` caches the build
manifest and a stale server 400s on renamed chunks (symptom: document height
collapses to ~2 viewports because the page JS never loads).

## Drive

Use Playwright with the pre-installed Chromium (do NOT `playwright install`):

```js
chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" })
```

- Scroll with `page.mouse.wheel(0, delta)` loops, NOT `window.scrollTo` —
  Lenis owns the scroll position and fights direct writes.
- Wait ~900ms after reaching a target for the `scrub: 0.9` catch-up before
  screenshotting.
- Healthy desktop document height is ~24 viewports (pinned scenes ×
  300%-ish each). If it's ~2 viewports, the JS bundle failed to load.
- Test 3 contexts: 1440×900, 390×844, and `reducedMotion: "reduce"`
  (reduced mode must show a plain stacked document, ~11 viewports).
- Collect `console`/`pageerror` events; the page should produce zero errors.

## Flows worth driving

- Full scroll film top→bottom at desktop; screenshot each scene mid-pin.
- Nav anchor click (e.g. `a[href="#context"]`) lands in the right scene and
  the active item + theme (html[data-theme]) update.
- CTA hover wipe on `.final-cta`.

## Gotchas

- Initial animation states must be set via `gsap.set(...)` inline, never
  only in the stylesheet — GSAP records/overwrites values across
  ScrollTrigger refreshes and stylesheet-only initial states get clobbered
  (this bit us with a full-screen ink overlay covering the paper scene).
- Never tween `scaleX`/`scaleY` on an element whose only rotation lives in a
  CSS `transform` with a zero scale — the degenerate matrix loses the
  rotation. Pass `rotation:` in the same tween.
