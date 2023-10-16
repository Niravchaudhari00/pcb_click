import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/AxiosInstance";
import { EndPoint } from "../../services/API";

// createAsyncThunk
export const getAuth = createAsyncThunk<any, any>(
  "auth/getAuthentication",
  async (userInfo) => {
    const response = await axiosInstance.post(EndPoint.LOGIN, userInfo);
    return response.data;
  }
);

// Interface
interface Auth {
  token: string | null;
  loading: boolean;
}

const authToken = localStorage.getItem("token");
const initialState: Auth = {
  token: authToken ? authToken : null,
  loading: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.data.token;
      localStorage.setItem("token", action.payload.data.token);
    });
    builder.addCase(getAuth.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default AuthSlice.reducer;
