import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import projectsReducer from "../features/projectsSlice";
import usersReducer from "../features/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    users: usersReducer, //  add this
  },
});