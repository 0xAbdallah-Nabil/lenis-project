import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export function ThemeInitializer() {
    const mode = useSelector((state: RootState) => state.theme.mode);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("dark", "light");
        root.classList.add(mode);
        root.style.colorScheme = mode;
        window.localStorage.setItem("theme", mode);
    }, [ mode ]);

    return null;
}