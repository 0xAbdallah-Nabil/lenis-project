import { configureStore } from "@reduxjs/toolkit";
import lenisReducer from "@/features/scroll/lenisSlice";
import themeReducer from "@/features/theme/themeSlice";

export const store = configureStore({
    reducer: {
        lenis: lenisReducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: [ "lenis.instance" ],
                ignoredActions: [ "lenis/setLenis" ],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;