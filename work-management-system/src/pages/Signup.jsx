import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "http://localhost:5000/signup",
        data
      );

      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md transition-colors duration-300"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Signup
        </h1>

        <input
          {...register("name")}
          placeholder="Name"
          className="w-full border p-3 rounded mb-4 text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border p-3 rounded mb-4 text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full border p-3 rounded mb-4 text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />

        <select
          {...register("role")}
          className="w-full border p-3 rounded mb-4 text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        >
          <option value="Employee">
            Employee
          </option>
          <option value="Manager">
            Manager
          </option>
          <option value="Admin">
            Admin
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold"
        >
          Signup
        </button>

        <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          Already have account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;