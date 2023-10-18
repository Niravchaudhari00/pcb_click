import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/AxiosInstance";
import { EndPoint } from "../../services/API";
import { ResponsePermissionType } from "../../interface/responseInterface";

// Get Permission data
export const getPermissionData = createAsyncThunk<any, number>(
  "role/getPermission",
  async (id) => {
    const response = await axiosInstance.get(`${EndPoint.PERMISSION}/${id}`);
    return response.data;
  }
);

// Get permission data by id
// export const getPermissionDataById = createAsyncThunk<any, number>(
//   "role/getPermissionById",
//   async (id) => {
//     const response = await axiosInstance.get(`${EndPoint.PERMISSION}/${id}`);
//     return response.data;
//   }
// );

export interface PermissionType {
  permissionData: Array<ResponsePermissionType>;
  loading: boolean;
}
const initialState: PermissionType = {
  permissionData: [],
  loading: false,
};

export const PermissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPermissionData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getPermissionData.fulfilled, (state, action) => {
      state.loading = false;
      state.permissionData = action.payload.data;
    });

    builder.addCase(getPermissionData.rejected, (state) => {
      state.loading = false;
    });
  },
});
