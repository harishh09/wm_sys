import { createSlice } from "@reduxjs/toolkit";

// ✅ Load user from localStorage
const storedAuth =
  JSON.parse(localStorage.getItem("auth")) || null;

const initialState = {
  user: storedAuth?.user || null,
  token: storedAuth?.token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // ✅ Login
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem(
        "auth",
        JSON.stringify(action.payload)
      );
    },

    // ✅ Logout
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("auth");
    },
  },
});

export const {
  loginSuccess,
  logout,
} = authSlice.actions;

export default authSlice.reducer;