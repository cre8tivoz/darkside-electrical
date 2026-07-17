"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/anim";

export default function SceneProcess() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { motion: MOTION_OK, desktop: "(min-width: 800px)" },
      (ctx) => {
        const c = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!c.motion || !ref.current) return;
        const q = gsap.utils.selector(ref.current);

        if (c.desktop) {
          // initial states must be inline styles — stylesheet values can be
          // clobbered by GSAP's transform/clip bookkeeping across refreshes
          gsap.set(q(".process-exit"), { clipPath: "inset(100% 0% 0% 0%)" });

          // vertical scroll drives horizontal travel: 1 → 2 → 3
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "+=320%",
              pin: true,
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(
            q(".num-1"),
            { scale: 4.5, transformOrigin: "16% 46%" },
            { scale: 1, duration: 0.14, ease: "power1.out" },
            0
          )
            .fromTo(
              q(".doc span"),
              { scaleX: 0 },
              { scaleX: 1, duration: 0.14, stagger: 0.012 },
              0.06
            )
            .to(q(".process-track"), { xPercent: -66.667, duration: 0.62 }, 0.16)
            // the final 3 becomes a mask that reveals the next dark scene
            .to(
              q(".num-3"),
              { scale: 30, transformOrigin: "48% 42%", duration: 0.18 },
              0.82
            )
            .to(
              q(".process-exit"),
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.08 },
              0.92
            );
        } else {
          // mobile: controlled vertical transformations instead
          q<HTMLElement>(".process-panel").forEach((panel) => {
            const num = panel.querySelector(".process-num");
            if (!num) return;
            gsap.fromTo(
              num,
              { scale: 1.9, y: "9vh" },
              {
                scale: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 85%",
                  end: "top 15%",
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                },
              }
            );
          });
        }
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      className="scene scene-process"
      data-scene
      data-theme="paper"
      ref={ref}
      aria-label="Web sites for your industry"
    >
      <div className="process-pin">
        <p className="process-kicker label">Web sites for your industry</p>
        <div className="process-track">
          <article className="process-panel">
            <span className="process-num num-1 display" aria-hidden="true">
              1
            </span>
            <div className="doc" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="process-step label">Step 01 — Call</p>
            <h3 className="process-title display">QUICK 30 MINUTE CALL</h3>
            <p className="process-note label">Complete project awareness</p>
          </article>
          <article className="process-panel">
            <span
              className="process-num num-2 display is-outline"
              aria-hidden="true"
            >
              2
            </span>
            <div className="doc" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="process-step label">Step 02 — Prototypes</p>
            <h3 className="process-title display">WE PROTOTYPE 3 OPTIONS</h3>
            <p className="process-note label">Structured data, real content</p>
          </article>
          <article className="process-panel">
            <span className="process-num num-3 display" aria-hidden="true">
              3
            </span>
            <div className="doc" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="process-step label">Step 03 — Feedback Rounds</p>
            <h3 className="process-title display">FEEDBACK ROUNDS</h3>
            <p className="process-note label">Fewer artificial boundaries</p>
          </article>
        </div>
        <div className="process-exit" aria-hidden="true" />
      </div>
    </section>
  );
}
