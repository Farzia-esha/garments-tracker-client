import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { auth } from "../../firebase/firebase.init";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, photoURL, password } = data;

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile
      await updateProfile(user, { displayName: name, photoURL });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome ${name}! You can now login.`,
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="text"
            placeholder="Photo URL"
            {...register("photoURL")}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            {...register("role", { required: true })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="buyer">Buyer</option>
            <option value="manager">Manager</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                message: "Password must include uppercase and lowercase letters"
              }
            })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
