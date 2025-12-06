import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { motion } from 'framer-motion';
import { Mail, Lock, User, Image, Eye, EyeOff, Chrome, ShoppingBag, XCircle, CheckCircle } from 'lucide-react';
import Logo from "../../Components/Logo/Logo";

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerUser(data.email, data.password);
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL || "https://i.pravatar.cc/150"
      });

      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          photoURL: data.photoURL || "https://i.pravatar.cc/150",
          role: data.role,
          status: 'pending'
        })
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: `Welcome ${data.name}! Please login to continue.`,
        showConfirmButton: false,
        timer: 2000
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
        confirmButtonColor: '#4F46E5'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      const result = await signInGoogle();
      
      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
          role: 'buyer',
          status: 'pending'
        })
      });

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        showConfirmButton: false,
        timer: 1500
      });
      
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
        confirmButtonColor: '#4F46E5'
      });
    } finally {
      setIsLoading(false);
    }
  };

    const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-5">
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="inline-flex items-center justify-center mb-4">
            <Logo></Logo>
        </motion.div>
        <h1 className="text-4xl font-bold text-white mt-2">Create Account</h1>
        <p className="text-white">Join us to get started</p>
        </div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full pl-11 pr-4 py-3 border-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl focus:border-indigo-600 focus:outline-none transition-colors`}
                  placeholder="Enter Your Name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`w-full pl-11 pr-4 py-3 border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl focus:border-indigo-600 focus:outline-none transition-colors`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Photo URL (Optional)
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="url"
                  {...register("photoURL")}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role
              </label>
              <select
                {...register("role", { required: true })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors"
              >
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Status will be set to "pending" by default
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                      message: "Must include uppercase and lowercase letters"
                    }
                  })}
                  className={`w-full pl-11 pr-12 py-3 border-2 ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl focus:border-indigo-600 focus:outline-none transition-colors`}
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {/* Password Strength Indicators */}
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  {passwordStrength.hasUpperCase ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <XCircle size={14} className="text-gray-300" />
                  )}
                  <span className={passwordStrength.hasUpperCase ? 'text-green-600' : 'text-gray-500'}>
                    At least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {passwordStrength.hasLowerCase ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <XCircle size={14} className="text-gray-300" />
                  )}
                  <span className={passwordStrength.hasLowerCase ? 'text-green-600' : 'text-gray-500'}>
                    At least one lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {passwordStrength.hasMinLength ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <XCircle size={14} className="text-gray-300" />
                  )}
                  <span className={passwordStrength.hasMinLength ? 'text-green-600' : 'text-gray-500'}>
                    At least 6 characters
                  </span>
                </div>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Register Btn */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Signup */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleRegister}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              <Chrome size={20} className="text-red-500" />
              Sign up with Google
            </motion.button>
          </div>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700">
              Login Here
            </Link>
          </p>
        </motion.div>
        <p className="text-center mt-6 text-white/80 text-sm">
          © {currentYear} Garment<span className="text-yellow-400">Track</span>. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Register;