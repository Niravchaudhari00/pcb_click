import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EndPoint } from "../../services/API";
import axiosInstance from "../../services/AxiosInstance";
import { ResponseModuleTypes } from "../../interface/moduleInterface";
import { toast } from "react-toastify";

// Post Method
export const addModuleName = createAsyncThunk<any, any>(
  "module/addModule",
  async (moduleName) => {
    const response = await axiosInstance.post(EndPoint.MODULE, moduleName);
    toast.success(response.data.message);
    return response.data;
  }
);
// Get Method
export const getModuleData = createAsyncThunk<any, void>(
  "module/getModule",
  async () => {
    const response = await axiosInstance.get(EndPoint.MODULE);
    return response.data;
  }
);
// Put Method
export const updateModuleName = createAsyncThunk<any, any>(
  "module/updateModule",
  async (updateModuleData) => {
    const response = await axiosInstance.put(
      `${EndPoint.MODULE}/${updateModuleData.id}`,
      { name: updateModuleData.name }
    );
    toast.success(response.data.message);
    return response.data;
  }
);

// Delete Method
export const deleteModuleName = createAsyncThunk<any, any>(
  "module/deleteModule",
  async (deleteModuleId) => {
    const response = await axiosInstance.delete(
      `${EndPoint.MODULE}/${deleteModuleId}`
    );
    toast.success(response.data.message);
    return deleteModuleId;
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
    // Add Module
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
    // Get Module
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

    // Put Module
    builder.addCase(updateModuleName.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateModuleName.fulfilled, (state, action) => {
      state.loading = false;
      // improve your logic when you click edit instant update value
      const index = state.data.findIndex(
        (data) => data.id === action.payload.data.id
      );
      state.data[index] = action.payload.data;
    });
    builder.addCase(updateModuleName.rejected, (state) => {
      state.loading = false;
    });

    // Delete Module
    builder.addCase(deleteModuleName.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteModuleName.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.data.findIndex((data) => data.id === action.payload);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    });
    builder.addCase(deleteModuleName.rejected, (state) => {
      state.loading = false;
    });
  },
});

// export
export default ModuleSlice.reducer;
