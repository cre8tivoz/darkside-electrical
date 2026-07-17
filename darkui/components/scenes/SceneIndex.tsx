"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, SIGNAL, GRAY } from "@/lib/anim";

const ROWS: Array<[string, string]> = [
  ["Index", "Kimi K3"],
  ["Model ID", "moonshotai/kimi-k3"],
  ["Access", "OpenRouter"],
  ["Interface", "Chat Completions"],
  ["Context", "1,048,576"],
  ["Status", "Available"],
];

export default function SceneIndex() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ motion: MOTION_OK }, (ctx) => {
      const c = ctx.conditions as { motion: boolean };
      if (!c.motion || !ref.current) return;
      const q = gsap.utils.selector(ref.current);
      const rows = q<HTMLElement>(".index-row");

      gsap.set(q(".index-rows"), { y: "30vh" });
      gsap.set(q(".index-final"), {
        opacity: 0,
        scaleX: 0.2,
        transformOrigin: "left center",
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

      tl.fromTo(
        q(".index-j"),
        { yPercent: 5 },
        { yPercent: -5, duration: 1 },
        0
      ).to(q(".index-rows"), { y: "-30vh", duration: 0.8 }, 0.05);

      // each row flashes signal as it crosses the arm line
      // (rows are a 10vh pitch travelling 60vh over 0.8 of the timeline)
      rows.forEach((row, i) => {
        const t = 0.1167 + 0.1333 * i;
        tl.to(row, { color: SIGNAL, duration: 0.025 }, t - 0.025).to(
          row,
          { color: GRAY, duration: 0.05 },
          t + 0.045
        );
      });

      // compress every row into a single line
      tl.to(
        rows,
        {
          y: (i: number) => `${55 - 10 * i}vh`,
          duration: 0.1,
          ease: "power1.in",
        },
        0.84
      )
        .to(rows, { scaleY: 0.08, opacity: 0, duration: 0.05 }, 0.94)
        .to(q(".index-final"), { opacity: 1, scaleX: 1, duration: 0.06 }, 0.94);
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="context"
      className="scene scene-index"
      data-scene
      data-nav="context"
      data-theme="dark"
      ref={ref}
      aria-label="Jaques index"
    >
      <div className="index-pin">
        <span className="index-j display" aria-hidden="true">
          J
        </span>
        <div className="index-arm" aria-hidden="true" />
        <dl className="index-rows">
          {ROWS.map(([k, v]) => (
            <div className="index-row" key={k}>
              <dt className="label">{k}</dt>
              <dd className="label">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="index-final label" aria-hidden="true">
          <span>Kimi K3</span>
          <span>Available</span>
        </p>
      </div>
    </section>
  );
}
