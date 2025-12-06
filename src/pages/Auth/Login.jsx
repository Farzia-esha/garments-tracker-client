import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      // Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
      });

      navigate("/"); // Redirect to home/dashboard
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 font-bold text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
