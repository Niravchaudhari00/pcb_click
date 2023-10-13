import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slice/AuthSlice";
import { ModuleSlice } from "./slice/ModuleSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    module: ModuleSlice.reducer,
  },
});
export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
