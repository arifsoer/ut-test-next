import { configureStore } from "@reduxjs/toolkit";
import { participantsApi } from "./services/participants";

export const store = configureStore({
  reducer: {
    [participantsApi.reducerPath]: participantsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(participantsApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
