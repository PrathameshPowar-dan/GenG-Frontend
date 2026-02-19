"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            anchors: {
                offset: -100,
            },
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        const observer = new MutationObserver(() => {
            if (document.body.style.overflow === "hidden") {
                lenis.stop(); // Pause smooth scrolling when modal is open
            } else {
                lenis.start(); // Resume when modal closes
            }
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["style", "class"],
        });

        return () => {
            observer.disconnect(); // Clean up the observer
            lenis.destroy();       // Clean up Lenis
        };
    }, []);

    return null;
}