"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/anim";

export default function ProgressRail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tween = gsap.to(ref.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="progress-rail" aria-hidden="true">
      <div className="progress-fill" ref={ref} />
    </div>
  );
}
