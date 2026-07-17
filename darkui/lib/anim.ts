"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The active Lenis instance, shared so the nav can drive smooth anchor scrolls.
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED = "(prefers-reduced-motion: reduce)";

export const INK = "#090A0A";
export const PAPER = "#F1EFE8";
export const GRAY = "#B8B8B0";
export const DGRAY = "#222422";
export const SIGNAL = "#D6FF3F";

export { gsap, ScrollTrigger };
