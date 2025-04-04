import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";  // Import useNavigate
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { LOGIN_ROUTE } from "../../constants/route";

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();  // Initialize navigate

  const token = searchParams.get("token"); // Get token from URL

  useEffect(() => {
    if (!token) {
      setError("Invalid or expired reset link.");
    }
  }, [token]);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        confirmPassword: data.confirmPassword,
        password: data.password,
      });

      if (response.data.success) {
        setMessage("Password reset successfully! You can now log in.");
        toast.success("successfully updated password")
    
      } else {
        setError("Failed to reset password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <p className="text-gray-600 text-center mb-6">Enter a new password to reset your account.</p>

        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {token ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter new password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters long" },
                })}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors?.password && <p className="text-red-500 text-sm">{errors?.password?.message}</p>}

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm new password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        ) : (
          <p className="text-center text-red-500">Invalid reset link. Please request a new one.</p>
        )}

        {/* Navigate Back Button */}
        <button
          onClick={() => navigate(-1)}  // Go back to previous page
          className="w-full mt-4 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
