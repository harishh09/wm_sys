import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://wm-sys.onrender.com/login",
        data
      );

      // Save Redux + localStorage
      dispatch(loginSuccess(res.data));

      toast.success("Login successful");

      // Role based redirect
      const role = res.data.user.role;

      if (role === "Admin") {
        navigate("/");
      } else if (role === "Manager") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md transition-colors duration-300"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Login
        </h1>

        <input
          placeholder="Email"
          {...register("email")}
          className="w-full border p-3 mb-4 rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border p-3 mb-4 rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded font-semibold">
          Login
        </button>

        <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
          No account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;