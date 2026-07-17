"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, setLenis, REDUCED } from "@/lib/anim";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import ProgressRail from "@/components/ProgressRail";
import SceneHero from "@/components/scenes/SceneHero";
import SceneInside from "@/components/scenes/SceneInside";
import SceneProcess from "@/components/scenes/SceneProcess";
import SceneCapabilities from "@/components/scenes/SceneCapabilities";
import SceneIndex from "@/components/scenes/SceneIndex";
import SceneClimax from "@/components/scenes/SceneClimax";
import SceneFinal from "@/components/scenes/SceneFinal";

export default function Page() {
  useEffect(() => {
    if (window.matchMedia(REDUCED).matches) return;

    document.documentElement.classList.add("fx");

    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // layouts change under .fx, and timelines must be measured with real fonts
    ScrollTrigger.refresh();
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
      document.documentElement.classList.remove("fx");
    };
  }, []);

  return (
    <>
      <Loader />
      <Nav />
      <ProgressRail />
      <main id="main">
        <SceneHero />
        <SceneInside />
        <SceneProcess />
        <SceneCapabilities />
        <SceneIndex />
        <SceneClimax />
        <SceneFinal />
      </main>
    </>
  );
}
