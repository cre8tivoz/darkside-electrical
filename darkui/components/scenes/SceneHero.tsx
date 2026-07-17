"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/anim";

export default function SceneHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { motion: MOTION_OK, narrow: "(max-width: 799px)" },
      (ctx) => {
        const c = ctx.conditions as { motion: boolean; narrow: boolean };
        if (!c.motion || !ref.current) return;
        const q = gsap.utils.selector(ref.current);

        gsap.set(q(".hero-meta"), { clipPath: "inset(0% 0% 0% 0%)" });

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

        tl.to(
          q(".hero-meta"),
          { clipPath: "inset(0 0 100% 0)", stagger: 0.03, duration: 0.1 },
          0.04
        )
          .to(q(".hero-jd"), { yPercent: -140, autoAlpha: 0, duration: 0.12 }, 0.04)
          // AQUES leaves the viewport, the J stays
          .to(q(".hero-rest"), { xPercent: 140, duration: 0.34 }, 0.08)
          .to(q(".hero-line2"), { xPercent: -170, duration: 0.34 }, 0.1)
          // the J becomes the portal: scale toward its negative space
          .to(
            q(".hero-jwrap"),
            {
              scale: c.narrow ? 7 : 13,
              transformOrigin: "30% 36%",
              duration: 0.42,
            },
            0.3
          )
          // solid type becomes outline / mask as it engulfs the viewport
          .to(q(".hero-j-lines"), { opacity: 1, duration: 0.1 }, 0.44)
          .to(q(".hero-j-solid"), { opacity: 0, duration: 0.12 }, 0.5)
          // travel through the negative space
          .to(q(".hero-jwrap"), { xPercent: -70, yPercent: 45, duration: 0.2 }, 0.72)
          // the stroke becomes the diagonal that opens the next scene
          .fromTo(
            q(".hero-diag"),
            { opacity: 1, scaleX: 0, rotation: -32 },
            { scaleX: 1, rotation: -32, duration: 0.18, immediateRender: false },
            0.78
          );
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      id="model"
      className="scene scene-hero"
      data-scene
      data-nav="model"
      data-theme="dark"
      ref={ref}
    >
      <div className="hero-stage">
        <p className="hero-meta hero-meta-tl label">Made in Melbourne</p>
        <p className="hero-meta hero-meta-tr label">
          Websites, Apps &amp; Projects
        </p>
        <p className="hero-meta hero-meta-bl label">
          Bookings from September 2026
        </p>
        <p className="hero-meta hero-meta-br label">Scroll to enter ↓</p>
        <span className="hero-jd display" aria-hidden="true">
          JD
        </span>
        <h1 className="hero-word display" aria-label="JAQUES.DESIGN">
          <span className="hero-line1">
            <span className="hero-jwrap">
              <span className="hero-j hero-j-solid">J</span>
              <span className="hero-j hero-j-lines" aria-hidden="true">
                J
              </span>
            </span>
            <span className="hero-rest">AQUES</span>
          </span>
          <span className="hero-line2">.DESIGN</span>
        </h1>
        <div className="hero-diag" aria-hidden="true" />
      </div>
    </section>
  );
}
