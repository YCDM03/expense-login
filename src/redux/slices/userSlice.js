import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("accessToken");

const initialState = {
  loginStatus: !!token,
  userId: null,
  accessToken: token ?? null,
  avatar: null,
  nickname: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReset: (state, action) => {
      state.loginStatus = false;
    },
    userLogin: (state, action) => {
      localStorage.setItem("accessToken", action.payload);
      state.loginStatus = true;
      state.accessToken = action.payload;
    },
    userLogout: (state, action) => {
      localStorage.removeItem("accessToken");
      state.loginStatus = false;
    },
    loadUser: (state, action) => {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.avatar = action.payload.avatar;
    },
    updateUser: (state, action) => {
      state.nickname = action.payload.nickname;
      state.avatar = action.payload.avatar;
    },
  },
});

export const { userLogin, userLogout, loadUser, updateUser, userReset } =
  userSlice.actions;
export default userSlice.reducer;
