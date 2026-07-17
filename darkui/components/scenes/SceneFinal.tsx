"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/anim";

export default function SceneFinal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ motion: MOTION_OK }, (ctx) => {
      const c = ctx.conditions as { motion: boolean };
      if (!c.motion || !ref.current) return;
      const q = gsap.utils.selector(ref.current);

      // the signal mark shrinks out of the climax into a small header
      gsap.fromTo(
        q(".final-mark"),
        { scale: 4, y: "16vh" },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "top 10%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        q(".final-body > *"),
        { clipPath: "inset(0 0 100% 0)", yPercent: 20 },
        {
          clipPath: "inset(0 0 -10% 0)",
          yPercent: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 65%",
            end: "top -5%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );

      // the huge cropped J settles below the viewport
      gsap.fromTo(
        q(".final-j"),
        { yPercent: 30 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "center bottom",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="access"
      className="scene scene-final"
      data-scene
      data-nav="access"
      data-theme="dark"
      ref={ref}
      aria-label="Book Jaques"
    >
      <p className="final-mark display">JAQUES.DESIGN</p>
      <div className="final-body">
        <h2 className="final-title display">JAQUES.DESIGN</h2>
        <p className="final-sub label">Booking work from Sep 2026</p>
        <p className="final-copy">Give us a buzz or shoot us a message.</p>
        <a className="final-cta" href="https://jaques.design/book">
          <span className="final-cta-label">Book Jaques</span>
          <span className="final-cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
        <p className="final-tech label">Jaques.design/book</p>
      </div>
      <footer className="final-foot">
        <p className="label">© 2026 Jaques.Design — Made in Melbourne</p>
        <p className="label">Websites, Apps &amp; Projects</p>
      </footer>
      <span className="final-j display" aria-hidden="true">
        J
      </span>
    </section>
  );
}
