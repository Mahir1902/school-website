"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Toggle animations (open/close) retarget mid-flight instead of fighting.
gsap.defaults({ overwrite: "auto" });

// Mirror the prefers-reduced-motion rule in globals.css: GSAP ignores CSS
// transition-duration, so speed every tween up to effectively instant.
// ponytail: global timeScale, per-tween durations if an animation must stay slow.
if (typeof window !== "undefined") {
  gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
    gsap.globalTimeline.timeScale(1000);
    return () => gsap.globalTimeline.timeScale(1);
  });
}

export { gsap, useGSAP };
