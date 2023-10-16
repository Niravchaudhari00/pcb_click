import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseRoleType } from "../../interface/responseInterface";
import axiosInstance from "../../services/AxiosInstance";
import { EndPoint } from "../../services/API";

export const getRoleData = createAsyncThunk<any, void>(
  "role/getRole",
  async () => {
    const response = await axiosInstance.get(EndPoint.ROLE);
    //     toast.success(response.data.message);
    return response.data;
  }
);

interface RoleType {
  roleData: Array<ResponseRoleType>;
  loading: boolean;
}
const initialState: RoleType = {
  roleData: [],
  loading: false,
};

export const RoleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoleData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getRoleData.fulfilled, (state, action) => {
      state.loading = false;
      state.roleData = action.payload.data;
    });

    builder.addCase(getRoleData.rejected, (state) => {
      state.loading = false;
    });
  },
});
