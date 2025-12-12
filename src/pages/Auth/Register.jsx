import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Mail, Lock, User, Image, Eye, EyeOff } from "lucide-react";
import Logo from "../../Components/Logo/Logo";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { registerUser, updateUserProfile, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password", "");

  const passwordStrength = {
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasMinLength: password.length >= 6
  };

  const imageKey = import.meta.env.VITE_IMGBB_KEY;

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      let uploadedImageUrl = "";
      if (data.photo?.[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const uploadRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imageKey}`,
          formData
        );

        uploadedImageUrl = uploadRes.data.data.url;
      }

      await registerUser(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
        photoURL: uploadedImageUrl || "https://i.pravatar.cc/150",
      });

      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          photoURL: uploadedImageUrl || "https://i.pravatar.cc/150",
          role: data.role,
          status: "pending",
        }),
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: `Welcome ${data.name}!`,
        toast: true,
        position: "top-right",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
        toast: true,
        position: "top-right",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  //Google Sign-Up
  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      const result = await signInGoogle();

      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
          role: "buyer",
          status: "pending",
        }),
      });

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: `Hello ${result.user.displayName}`,
        toast: true,
        position: "top-right",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
        toast: true,
        position: "top-right",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-5">
          <Logo />
          <h1 className="text-4xl font-bold text-white mt-2">Create Account</h1>
          <p className="text-white">Join us to get started</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block font-semibold">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full pl-11 py-3 border rounded-xl"
                  placeholder="Enter Your Name"
                />
              </div>
              {errors.name && <p className="text-red-500">Name is required.</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  {...register("email", { required:true })}
                  className="w-full pl-11 py-3 border rounded-xl"
                  placeholder="Your Email"
                />
              </div>
              {errors.email && <p className="text-red-500">Email is required.</p>}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block font-semibold">Photo</label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="w-full pl-11 py-3 border rounded-xl"
                />
              </div>
              {errors.photo && <p className="text-red-500">Photo is required.</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block font-semibold">Role</label>
              <select
                {...register("role", { required: true })}
                className="w-full py-3 border rounded-xl"
              >
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                      message: "Must include uppercase & lowercase",
                    },
                  })}
                  className="w-full pl-11 pr-12 py-3 border rounded-xl"
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <p className={`text-sm mt-1 ${
                passwordStrength.hasUpperCase &&
                passwordStrength.hasLowerCase &&
                passwordStrength.hasMinLength
                  ? "text-green-600"
                  : "text-red-500"
              }`}>
                Must contain: Uppercase + Lowercase + Minimum 6 characters
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          {/* Google Sign Up */}
          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 py-3 border rounded-xl"
          >
            <FcGoogle size={20} /> Sign up with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-bold">
              Login Here
            </Link>
          </p>
        </div>

        <p className="text-center mt-6 text-white text-sm">
          © {currentYear} GarmentTrack
        </p>
      </div>
    </div>
  );
};

export default Register;
