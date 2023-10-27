import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slice/AuthSlice";
import { ModuleSlice } from "./slice/ModuleSlice";
import { useDispatch } from "react-redux";
import { RoleSlice } from "./slice/RoleSlice";
import { PermissionSlice } from "./slice/PermissionSlice";
import { UserManagementSlice } from "./slice/UserManagementSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    module: ModuleSlice.reducer,
    role: RoleSlice.reducer,
    permission: PermissionSlice.reducer,
    user: UserManagementSlice.reducer,
  },
});
export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
