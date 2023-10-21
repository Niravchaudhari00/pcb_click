import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/AxiosInstance";
import { EndPoint } from "../../services/API";
import { ResponsePermissionType } from "../../interface/responseInterface";
import { PermissionPayloadType } from "../../components/core/permission/Permission";

// Get Permission data
export const getPermissionData = createAsyncThunk<any, number>(
  "permission/getPermission",
  async (id) => {
    const response = await axiosInstance.get(`${EndPoint.PERMISSION}/${id}`);
    return response.data;
  }
);

export const permissionUpdate = createAsyncThunk<any, PermissionPayloadType>(
  "permission/updatePermission",
  async (updateData) => {
    const response = await axiosInstance.post(
      `${EndPoint.PERMISSION}/${"update"}`,
      updateData
    );

    return response.data.data;
  }
);

export const permissionUpdateAll = createAsyncThunk<any, any>(
  "permission/updateAllPermission",
  async (parmissionUpdateAllData) => {
    await axiosInstance.post(
      `${EndPoint.PERMISSION}/${"update-all"}`,
      parmissionUpdateAllData
    );
    return parmissionUpdateAllData;
  }
);

export interface PermissionType {
  permissionData: Array<ResponsePermissionType>;
  loading: boolean;
  updateLoading: boolean;
}
const initialState: PermissionType = {
  permissionData: [],
  loading: false,
  updateLoading: false,
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
    // permission update
    builder.addCase(permissionUpdate.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(permissionUpdate.fulfilled, (state, action) => {
      state.updateLoading = false;
      let index = state.permissionData.findIndex(
        (data) =>
          data.role_id === action.payload.role_id &&
          data.module_id === action.payload.module_id
      );

      if (index !== -1) {
        state.permissionData[index] = {
          ...state.permissionData[index],
          ...action.payload,
        };
      }
    });

    builder.addCase(permissionUpdate.rejected, (state) => {
      state.updateLoading = false;
    });

    // permission all update
    builder.addCase(permissionUpdateAll.pending, (state) => {
      state.updateLoading = true;
    });

    builder.addCase(permissionUpdateAll.fulfilled, (state) => {
      state.updateLoading = false;
    });

    builder.addCase(permissionUpdateAll.rejected, (state) => {
      state.updateLoading = false;
    });
  },
});
