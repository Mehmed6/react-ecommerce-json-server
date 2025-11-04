import {configureStore} from "@reduxjs/toolkit";
import appReducer from "./appSlice.tsx"
import basketReducer from "./basketSlice.tsx"
export const store = configureStore({
    reducer: {
        appStore: appReducer,
        basketStore : basketReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type ApiDispatch = typeof store.dispatch;