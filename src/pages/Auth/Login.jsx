import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Mail, Lock, Eye, EyeOff, XCircle } from 'lucide-react';
import { useState } from "react";
import Logo from "../../Components/Logo/Logo";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { signInUser, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signInUser(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/user-not-found') {
        setError('email', { 
          type: 'manual', 
          message: 'No account found with this email' 
        });
      } else if (error.code === 'auth/wrong-password') {
        setError('password', { 
          type: 'manual', 
          message: 'Incorrect password' 
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Invalid email or password",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInGoogle();

      try {
        await fetch(`https://garments-tracker-system.vercel.app/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: result.user.email,
            name: result.user.displayName,
            photoURL: result.user.photoURL,
            role: 'buyer', 
            status: 'approved'
          })
        });
      } catch (err) {
        console.log('User may already exist:', err);
      }

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        showConfirmButton: false,
        timer: 1500
      });

      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        
        {/* Logo */}
        <div className="text-center mb-5"> 
          <div className="inline-flex items-center justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-4xl font-bold text-white mt-2">Welcome Back!</h1>
          <p className="text-white">Login to access your account</p>          
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
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
                  } rounded-xl focus:border-indigo-600 focus:outline-none`}
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.email.message}
                </p>
              )}
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
                  {...register("password", { required: "Password is required" })}
                  className={`w-full pl-11 pr-12 py-3 border-2 ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl focus:border-indigo-600 focus:outline-none`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
              Register Now
            </Link>
          </p>
        </div>
        
        <p className="text-center mt-6 text-white text-sm">
          ©{currentYear} Garment<span className="text-yellow-400">Track</span>. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;