"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, REDUCED } from "@/lib/anim";

export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia(REDUCED).matches) {
      setDone(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const count = el.querySelector<HTMLElement>(".loader-count")!;
    const progress = { v: 0 };

    const tl = gsap.timeline({ onComplete: () => setDone(true) });
    tl.to(progress, {
      v: 100,
      duration: 0.85,
      ease: "power2.inOut",
      onUpdate: () => {
        count.textContent = `INITIALISING ${String(
          Math.round(progress.v)
        ).padStart(3, "0")}%`;
      },
    })
      .to(
        el.querySelector(".loader-line"),
        { scaleX: 1, duration: 0.85, ease: "power2.inOut" },
        0
      )
      .to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.45,
        ease: "power3.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div className="loader" ref={ref} aria-hidden="true">
      <div className="loader-mark">JAQUES.DESIGN</div>
      <div className="loader-line" />
      <div className="loader-count label">INITIALISING 000%</div>
    </div>
  );
}
