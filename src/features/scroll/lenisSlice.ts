import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type Lenis from "lenis";

interface LenisScrollPayload {
    scroll: number;      // raw scroll position in px
    progress: number;    // 0 → 1 across the full scrollable document
    velocity: number;    // px/frame, useful for velocity-based effects later
}

interface LenisState {
    instance: Lenis | null;
    scroll: number;
    progress: number;
    velocity: number;
}

const initialState: LenisState = {
    instance: null,
    scroll: 0,
    progress: 0,
    velocity: 0,
};

const lenisSlice = createSlice({
    name: "lenis",
    initialState,
    reducers: {
        setLenis: (state, action: PayloadAction<Lenis | null>) => {
            state.instance = action.payload as unknown as typeof state.instance;
        },
        setLenisScroll: (state, action: PayloadAction<LenisScrollPayload>) => {
            state.scroll = action.payload.scroll;
            state.progress = action.payload.progress;
            state.velocity = action.payload.velocity;
        },
    },
});

export const { setLenis, setLenisScroll } = lenisSlice.actions;
export default lenisSlice.reducer;