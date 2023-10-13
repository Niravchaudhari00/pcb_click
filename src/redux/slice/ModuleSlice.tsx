import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ModuleEndPoint } from "../../services/API";
import axiosInstance from "../../services/AxiosInstance";
import { ResponseModuleTypes } from "../../interface/moduleInterface";

// addModuleName async thunk
export const addModuleName = createAsyncThunk<any, any>(
  "module/addModule",
  async (data) => {
    const response = await axiosInstance.post(ModuleEndPoint.MODULE, data);
    return response.data;
  }
);

export const getModuleData = createAsyncThunk<any, void>(
  "module/getModule",
  async () => {
    const response = await axiosInstance.get(ModuleEndPoint.MODULE);
    return response.data;
  }
);

interface ResponseType {
  data: Array<ResponseModuleTypes>;
  loading: boolean;
}

const initialState: ResponseType = {
  data: [],
  loading: false,
};

// Slice
export const ModuleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addModuleName.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addModuleName.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload.data);
    });

    builder.addCase(addModuleName.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getModuleData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getModuleData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getModuleData.rejected, (state) => {
      state.loading = false;
    });
  },
});

// export
export const {} = ModuleSlice.actions;
export default ModuleSlice.reducer;
