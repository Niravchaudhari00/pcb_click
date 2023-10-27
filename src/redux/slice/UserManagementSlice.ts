import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/AxiosInstance";
import { EndPoint } from "../../services/API";

interface UserDataType {
  id: number;
  name: string;
  email_address: string;
  signup_time: string;
  status: string;
  tbl_role: {
    name: string;
  };
}
export interface UserManagementResponsType {
  count: number;
  rows: UserDataType[];
}

interface UserManagementType {
  userManagementData: UserManagementResponsType | null;
  loading: boolean;
}

export const getUserManagement = createAsyncThunk<any, any>(
  "user/getUser",
  async (query) => {
    const response = await axiosInstance.get(`${EndPoint.USER}${query}`);
    return response.data.data;
  }
);

const initialState: UserManagementType = {
  userManagementData: null,
  loading: false,
};

export const UserManagementSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserManagement.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserManagement.fulfilled, (state, action) => {
      state.loading = false;
      state.userManagementData = action.payload;
    });
    builder.addCase(getUserManagement.rejected, (state) => {
      state.loading = false;
    });
  },
});
