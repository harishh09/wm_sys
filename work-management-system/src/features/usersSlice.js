import { createSlice } from "@reduxjs/toolkit";

const storedUsers =
  JSON.parse(localStorage.getItem("users")) || [];

const initialState = {
  users: storedUsers,
};

const saveUsers = (users) => {
  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );
};

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      saveUsers(state.users);
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (u) => u.id !== action.payload
      );
      saveUsers(state.users);
    },

    toggleStatus: (state, action) => {
      const user = state.users.find(
        (u) => u.id === action.payload
      );

      if (user) {
        user.status =
          user.status === "Active"
            ? "Inactive"
            : "Active";

        user.lastActive =
          new Date().toLocaleString();
      }

      saveUsers(state.users);
    },

    updateUser: (state, action) => {
      state.users = state.users.map((u) =>
        u.id === action.payload.id
          ? { ...u, ...action.payload }
          : u
      );

      saveUsers(state.users);
    },
  },
});

export const {
  addUser,
  deleteUser,
  toggleStatus,
  updateUser,
} = usersSlice.actions;

export default usersSlice.reducer;