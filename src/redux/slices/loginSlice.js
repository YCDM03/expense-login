import { createSlice } from "@reduxjs/toolkit";

const initialState = !!localStorage.getItem("accessToken");

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("accessToken", action.payload);
      return true;
    },
    logout: (state, action) => {
      localStorage.removeItem("accessToken");
      return false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
