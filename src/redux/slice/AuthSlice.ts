import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Auth {
  token: string | null;
  progress: number;
}
const authToken = localStorage.getItem("token");
const initialState: Auth = {
  token: authToken ? authToken : null,
  progress: 0,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, actions) => {
      state.token = actions.payload;
    },
    setProgress: (state, actions) => {
      state.progress = actions.payload;
    },
  },
});

export const { setToken, setProgress } = AuthSlice.actions;
export default AuthSlice.reducer;
