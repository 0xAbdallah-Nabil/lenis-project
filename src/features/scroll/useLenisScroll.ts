import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export function useLenis() {
    return useSelector((state: RootState) => state.lenis.instance);
}

export function useLenisProgress() {
    return useSelector((state: RootState) => state.lenis.progress);
}

export function useLenisScrollY() {
    return useSelector((state: RootState) => state.lenis.scroll);
}

export function useLenisVelocity() {
    return useSelector((state: RootState) => state.lenis.velocity);
}