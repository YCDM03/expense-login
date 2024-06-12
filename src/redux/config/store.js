import { configureStore } from "@reduxjs/toolkit";
import listSlice from "../slices/listSlice";
import loginSlice from "../slices/loginSlice";

const store = configureStore({
  reducer: { list: listSlice, login: loginSlice },
});

export default store;
