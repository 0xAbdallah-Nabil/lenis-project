import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { setLenis, setLenisScroll } from "@/features/scroll/lenisSlice";
import type { AppDispatch } from "@/store";

export function LenisInitializer() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const instance = new Lenis({
            autoRaf: true,
            anchors: true,
        });

        dispatch(setLenis(instance));

        const onScroll = (e: {
            scroll: number;
            progress: number;
            velocity: number;
        }) => {
            dispatch(
                setLenisScroll({
                    scroll: e.scroll,
                    progress: e.progress,
                    velocity: e.velocity,
                })
            );
        };

        instance.on("scroll", onScroll);

        return () => {
            instance.off("scroll", onScroll);
            instance.destroy();
            dispatch(setLenis(null));
        };
    }, [ dispatch ]);

    return null;
}