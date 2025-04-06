import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import appStepSlice from "./appStepSlice";

enableMapSet();

export const store = configureStore({
  reducer: {
    appSteps: appStepSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
