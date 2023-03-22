import drawer from "./features/drawer";
import auth from "./features/auth";
import modal from "./features/modal";
import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";

export const store = configureStore({
    reducer: {
        auth,
        modal,
        drawer,
        [userApi.reducerPath]: userApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([
            userApi.middleware,

        ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;