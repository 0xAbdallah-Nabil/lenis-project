import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light";

const THEME_KEY = "theme";

const getInitialTheme = (): ThemeMode => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
};

interface ThemeState {
    mode: ThemeMode;
}

const initialState: ThemeState = {
    mode: getInitialTheme(),
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
        },
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;