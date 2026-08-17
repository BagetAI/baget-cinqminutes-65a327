"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function GsapAnimations() {
  useEffect(() => {
    // Guard for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle hero stagger reveal
      gsap.from(".hero-stagger", {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Subtle feature card entrance
      gsap.from(".card-reveal", {
        y: 30,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
