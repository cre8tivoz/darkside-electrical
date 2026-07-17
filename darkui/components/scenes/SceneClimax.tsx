"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/anim";

export default function SceneClimax() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { motion: MOTION_OK, narrow: "(max-width: 799px)" },
      (ctx) => {
        const c = ctx.conditions as { motion: boolean; narrow: boolean };
        if (!c.motion || !ref.current) return;
        const q = gsap.utils.selector(ref.current);

        gsap.set(q(".climax-zoom"), {
          scale: c.narrow ? 5 : 9,
          transformOrigin: "10% 16%",
        });
        gsap.set(q(".climax-kimi"), {
          clipPath: "inset(42% 0 42% 0)",
          opacity: 0,
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        // begin inside a giant letter, zoom out until readable
        tl.to(
          q(".climax-zoom"),
          { scale: 1, duration: 0.5, ease: "power1.out" },
          0.02
        )
          // lock the words to a strict grid
          .to(q(".climax-grid span"), { scaleX: 1, duration: 0.1, stagger: 0.05 }, 0.54)
          // compress everything into KIMI K3
          .to(q(".climax-zoom"), { scaleY: 0.04, duration: 0.14, ease: "power1.in" }, 0.72)
          .to(q(".climax-grid span"), { opacity: 0, duration: 0.05 }, 0.8)
          .to(q(".climax-zoom"), { opacity: 0, duration: 0.04 }, 0.84)
          .to(
            q(".climax-kimi"),
            { opacity: 1, clipPath: "inset(0% 0 0% 0)", duration: 0.14 },
            0.84
          );
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      className="scene scene-climax"
      data-scene
      data-theme="signal"
      ref={ref}
      aria-label="Not a chat window. A working intelligence."
    >
      <div className="climax-pin">
        <div className="climax-grid" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="climax-zoom">
          <h3 className="climax-statement display">
            <span className="cl-line">NOT A CHAT WINDOW.</span>
            <span className="cl-line">A WORKING INTELLIGENCE.</span>
          </h3>
        </div>
        <p className="climax-kimi display" aria-hidden="true">
          KIMI K3
        </p>
      </div>
    </section>
  );
}
