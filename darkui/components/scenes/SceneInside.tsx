"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/anim";

export default function SceneInside() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ motion: MOTION_OK }, (ctx) => {
      const c = ctx.conditions as { motion: boolean };
      if (!c.motion || !ref.current) return;
      const q = gsap.utils.selector(ref.current);

      gsap.set(q(".line-inner"), { yPercent: 120 });
      gsap.set(q(".coord"), { clipPath: "inset(0 100% 0 0)" });
      gsap.set(q(".inside-diag"), { rotate: -32, scaleX: 0.25 });

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

      tl.fromTo(
        q(".plane-1"),
        { x: "-28vw", y: "12vh" },
        { x: "0vw", y: "0vh", duration: 0.55 },
        0
      )
        .fromTo(
          q(".plane-2"),
          { x: "34vw", y: "-18vh" },
          { x: "4vw", y: "-2vh", duration: 0.6 },
          0
        )
        .fromTo(
          q(".plane-3"),
          { x: "-12vw", y: "34vh" },
          { x: "2vw", y: "4vh", duration: 0.65 },
          0
        )
        .fromTo(
          q(".plane-4"),
          { x: "26vw", y: "26vh" },
          { x: "-4vw", y: "2vh", duration: 0.65 },
          0
        )
        .fromTo(q(".frag-1"), { xPercent: -35 }, { xPercent: 8, duration: 0.85 }, 0)
        .fromTo(q(".frag-2"), { xPercent: 45 }, { xPercent: -8, duration: 0.85 }, 0)
        .fromTo(q(".frag-3"), { yPercent: 55 }, { yPercent: -5, duration: 0.85 }, 0)
        .to(
          q(".coord"),
          { clipPath: "inset(0 0% 0 0)", duration: 0.08, stagger: 0.05 },
          0.08
        )
        .to(
          q(".line-inner"),
          { yPercent: 0, duration: 0.16, stagger: 0.13, ease: "power1.out" },
          0.2
        )
        // the diagonal levels out into the line that leads to the next scene
        .to(q(".inside-diag"), { opacity: 1, duration: 0.04 }, 0.76)
        .to(q(".inside-diag"), { rotate: 0, scaleX: 1, duration: 0.2 }, 0.78);
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      className="scene scene-inside"
      data-scene
      data-theme="dark"
      ref={ref}
      aria-label="Inside Jaques"
    >
      <div className="inside-stage">
        <div className="plane plane-1" aria-hidden="true" />
        <div className="plane plane-2" aria-hidden="true" />
        <div className="plane plane-3" aria-hidden="true" />
        <div className="plane plane-4" aria-hidden="true" />
        <span className="frag frag-1" aria-hidden="true">
          J
        </span>
        <span className="frag frag-2" aria-hidden="true">
          Q
        </span>
        <span className="frag frag-3" aria-hidden="true">
          S
        </span>
        <div className="measure measure-h" aria-hidden="true" />
        <div className="measure measure-v" aria-hidden="true" />
        <p className="coord coord-1 label">37.8136° S</p>
        <p className="coord coord-2 label">144.9631° E</p>
        <p className="coord coord-3 label">Grid / 04</p>
        <p className="coord coord-4 label">Scale 1:1</p>
        <h2 className="inside-words display">
          <span className="line">
            <span className="line-inner">THINK</span>
          </span>
          <span className="line">
            <span className="line-inner">ACROSS</span>
          </span>
          <span className="line">
            <span className="line-inner">THE ENTIRE</span>
          </span>
          <span className="line">
            <span className="line-inner">PROBLEM</span>
          </span>
        </h2>
        <div className="inside-diag" aria-hidden="true" />
      </div>
    </section>
  );
}
