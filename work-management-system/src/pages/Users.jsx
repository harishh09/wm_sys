import { useState } from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  addUser,
  deleteUser,
  toggleStatus,
  updateUser,
} from "../features/usersSlice";

const Users = () => {
  const users = useSelector(
    (state) =>
      state.users.users
  );

  const dispatch =
    useDispatch();

  const [name, setName] =
    useState("");

  const [role, setRole] =
    useState("Employee");

  const [
    editingUser,
    setEditingUser,
  ] = useState(null);

  const handleAddUser =
    () => {
      if (
        !name.trim()
      )
        return;

      if (
        editingUser
      ) {
        dispatch(
          updateUser({
            id: editingUser.id,
            name,
            role,
            lastActive:
              new Date().toLocaleString(),
          })
        );

        setEditingUser(
          null
        );
      } else {
        dispatch(
          addUser({
            id: Date.now(),
            name,
            role,
            status:
              "Active",
            lastActive:
              new Date().toLocaleString(),
          })
        );
      }

      setName("");
      setRole(
        "Employee"
      );
    };

  const handleEdit =
    (user) => {
      setEditingUser(
        user
      );
      setName(
        user.name
      );
      setRole(
        user.role
      );
    };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">
        Users 👥
      </h1>

      {/* Add/Edit */}
      <div className="mb-6 flex gap-3 flex-wrap">
        <input
          placeholder="User name"
          value={name}
          onChange={(
            e
          ) =>
            setName(
              e.target
                .value
            )
          }
          className="px-4 py-2 rounded border w-64 bg-gray-800 text-white border-gray-600"
        />

        <select
          value={role}
          onChange={(
            e
          ) =>
            setRole(
              e.target
                .value
            )
          }
          className="px-4 py-2 rounded border w-52 bg-gray-800 text-white border-gray-600"
        >
          <option>
            Admin
          </option>
          <option>
            Manager
          </option>
          <option>
            Employee
          </option>
        </select>

        <button
          onClick={
            handleAddUser
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingUser
            ? "Update"
            : "Add"}
        </button>
      </div>

      {/* User List */}
      {users.length ===
        0 && (
        <p className="text-gray-400">
          No users yet.
        </p>
      )}

      <div className="space-y-4">
        {users.map(
          (u) => (
            <div
              key={
                u.id
              }
              className="bg-gray-800 border border-gray-700 rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-white">
                  {
                    u.name
                  }
                </p>

                <p className="text-sm text-gray-400">
                  {
                    u.role
                  }{" "}
                  •{" "}
                  {
                    u.status
                  }
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Last Active:{" "}
                  {u.lastActive ||
                    "N/A"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleEdit(
                      u
                    )
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    dispatch(
                      toggleStatus(
                        u.id
                      )
                    )
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Toggle
                </button>

                <button
                  onClick={() =>
                    dispatch(
                      deleteUser(
                        u.id
                      )
                    )
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Users;