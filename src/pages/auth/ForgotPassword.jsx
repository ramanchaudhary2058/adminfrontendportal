import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";  // Import useNavigate

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetLink, setResetLink] = useState("");
  const navigate = useNavigate();  // Initialize navigate

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    setError("");
    setResetLink("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { phone: data.phone });

      if (response.data.success) {
        setMessage(response.data.message);
        setResetLink(response.data.ResetLink); // Store reset link
      } else {
        setError("Failed to send reset link.");
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
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password?</h2>
        <p className="text-gray-600 text-center mb-6">Enter your phone number to reset your password</p>

        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {!resetLink ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="tel"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>
        ) : (
          <div className="text-center mt-4">
            <p className="text-gray-700 mb-2">Click the button below to reset your password:</p>
            <NavLink
              to={resetLink}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Reset Password
            </NavLink>
          </div>
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

export default ForgotPassword;
