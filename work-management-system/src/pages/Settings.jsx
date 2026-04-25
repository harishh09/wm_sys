import { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

const Settings = () => {
  const user = useSelector(
    (state) => state.auth?.user
  );

  const { theme, toggleTheme } =
    useTheme();

  const [name, setName] =
    useState(user?.name || "");

  const [password, setPassword] =
    useState("");

  const handleProfileSave =
    () => {
      localStorage.setItem(
        "profileName",
        name
      );

      toast.success(
        "Profile updated"
      );
    };

  const handlePasswordChange =
    () => {
      if (!password.trim()) {
        toast.error(
          "Enter new password"
        );
        return;
      }

      toast.success(
        "Password changed"
      );

      setPassword("");
    };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Settings ⚙️
      </h1>

      {/* Profile */}
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow mb-6">
        <h2 className="font-bold text-xl mb-4">
          Profile
        </h2>

        <p className="mb-2">
          <b>Role:</b>{" "}
          {user?.role || "N/A"}
        </p>

        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Update Name"
          className="w-full border p-3 rounded mb-4 text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />

        <button
          onClick={
            handleProfileSave
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Profile
        </button>
      </div>

      {/* Password */}
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow mb-6">
        <h2 className="font-bold text-xl mb-4">
          Change Password
        </h2>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          placeholder="New Password"
          className="w-full border p-3 rounded mb-4 text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />

        <button
          onClick={
            handlePasswordChange
          }
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Update Password
        </button>
      </div>

      {/* Theme */}
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow">
        <h2 className="font-bold text-xl mb-4">
          Theme
        </h2>

        <p className="mb-4">
          Current Theme:{" "}
          <b>{theme}</b>
        </p>

        <button
          onClick={() => {
            toggleTheme();
            toast.success(
              "Theme changed"
            );
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default Settings;