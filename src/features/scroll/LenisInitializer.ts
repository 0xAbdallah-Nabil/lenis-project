// src/features/scroll/LenisInitializer.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

import { setLenis, setLenisScroll } from "@/features/scroll/lenisSlice";
import type { AppDispatch } from "@/store";

gsap.registerPlugin(ScrollTrigger);

export function LenisInitializer() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const instance = new Lenis({
            autoRaf: false, // we drive it via gsap.ticker instead
            anchors: true,
        });

        dispatch(setLenis(instance));

        const onScroll = (e: { scroll: number; progress: number; velocity: number }) => {
            dispatch(
                setLenisScroll({
                    scroll: e.scroll,
                    progress: e.progress,
                    velocity: e.velocity,
                })
            );
        };

        instance.on("scroll", onScroll);
        instance.on("scroll", ScrollTrigger.update);

        const update = (time: number) => instance.raf(time * 1000);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            instance.off("scroll", onScroll);
            instance.destroy();
            dispatch(setLenis(null));
        };
    }, [ dispatch ]);

    return null;
}