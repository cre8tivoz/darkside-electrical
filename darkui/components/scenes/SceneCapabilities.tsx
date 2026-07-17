"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, DGRAY } from "@/lib/anim";

export default function SceneCapabilities() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ motion: MOTION_OK }, (ctx) => {
      const c = ctx.conditions as { motion: boolean };
      if (!c.motion || !ref.current) return;
      const q = gsap.utils.selector(ref.current);

      gsap.set(q(".caps-code .caps-word, .caps-build .caps-word"), {
        yPercent: 130,
      });
      gsap.set(
        q(
          ".caps-code .caps-label, .caps-code .caps-note, .caps-build .caps-label, .caps-build .caps-note"
        ),
        { clipPath: "inset(0 100% 0 0)" }
      );
      gsap.set(q(".col"), { scaleY: 0, transformOrigin: "center top" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      // 01 REASON — the word expands, its strokes align into columns
      tl.to(
        q(".caps-reason .caps-word"),
        { scaleX: 1.5, transformOrigin: "left center", duration: 0.2 },
        0.02
      )
        .to(q(".col"), { scaleY: 1, duration: 0.16, stagger: 0.03 }, 0.12)
        .to(q(".caps-reason .caps-word"), { yPercent: -140, duration: 0.12 }, 0.32)
        .to(
          q(".caps-reason .caps-label, .caps-reason .caps-note"),
          { clipPath: "inset(0 0 0 100%)", duration: 0.1 },
          0.32
        )
        // 02 CODE — the columns become its negative space
        .to(
          q(".caps-code .caps-word"),
          { yPercent: 0, duration: 0.14, ease: "power1.out" },
          0.4
        )
        .to(
          q(".caps-code .caps-label, .caps-code .caps-note"),
          { clipPath: "inset(0 0% 0 0)", duration: 0.1 },
          0.44
        )
        .to(q(".col"), { scaleX: 2.4, duration: 0.12 }, 0.42)
        // columns collapse into structural planes
        .to(q(".caps-code .caps-word"), { yPercent: -140, duration: 0.12 }, 0.6)
        .to(
          q(".caps-code .caps-label, .caps-code .caps-note"),
          { clipPath: "inset(0 0 0 100%)", duration: 0.1 },
          0.6
        )
        .to(
          q(".col"),
          {
            rotate: 90,
            scaleX: 6,
            scaleY: 0.5,
            y: (i: number) => `${(i - 2.5) * 13}vh`,
            backgroundColor: DGRAY,
            duration: 0.18,
            stagger: 0.015,
          },
          0.62
        )
        // 03 BUILD — assembled on the planes
        .to(
          q(".caps-build .caps-word"),
          { yPercent: 0, duration: 0.14, ease: "power1.out" },
          0.76
        )
        .to(
          q(".caps-build .caps-label, .caps-build .caps-note"),
          { clipPath: "inset(0 0% 0 0)", duration: 0.1 },
          0.8
        )
        .to(q(".col"), { opacity: 0.35, duration: 0.1 }, 0.8);
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="capabilities"
      className="scene scene-caps"
      data-scene
      data-nav="capabilities"
      data-theme="dark"
      ref={ref}
      aria-label="Capabilities"
    >
      <div className="caps-pin">
        <div className="caps-cols" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span className="col" key={i} />
          ))}
        </div>
        <div className="caps-layer caps-reason">
          <p className="caps-label label">01 / Reason</p>
          <div className="caps-wrap">
            <h3 className="caps-word display">REASON</h3>
          </div>
          <p className="caps-note label">
            Follow the problem beyond the first answer.
          </p>
        </div>
        <div className="caps-layer caps-code">
          <p className="caps-label label">02 / Code</p>
          <div className="caps-wrap">
            <h3 className="caps-word display">CODE</h3>
          </div>
          <p className="caps-note label">
            Move from intent to working systems.
          </p>
        </div>
        <div className="caps-layer caps-build">
          <p className="caps-label label">03 / Build</p>
          <div className="caps-wrap">
            <h3 className="caps-word display">BUILD</h3>
          </div>
          <p className="caps-note label">
            <span>Plan.</span> <span>Execute.</span> <span>Verify.</span>{" "}
            <span>Iterate.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
