import React, { useEffect, useState } from "react";
import bgimage from "../../assets/authimage/bgimge.png";
import sideimage from "../../assets/authimage/sideimage.png";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff, IoLogoLinkedin } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../reducer/auth/authAction";
import { fetchRegister } from "../../api/auth";
import { toast } from "react-toastify";
import Spinner from "../Sipnner";
import { LOGIN_ROUTE } from "../../constants/route";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { error, loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
const navigate=useNavigate()
  const submit = async (data) => {
  dispatch(registerUser(data))
  toast.success("Register successfully")
  reset();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
    
      {/* <div className="hidden lg:flex w-1/2 items-center justify-center">
        <img src={bgimage} alt="bgimage" className="w-full h-auto opacity-40" />
      </div> */}

      {/* Sign-Up Form */}
      <div className="flex flex-col justify-center w-full lg:w-full px-3 py-10 bg-white shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
          Register Student
        </h2>
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4 w-1/2 mx-auto  p-3"
        >
          {/* Name Input */}
          <div>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Full Name"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Phone Input */}
          <div>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Phone Number"
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>

          {/* Batch Input */}
          <div>
            <input
              type="text"
              {...register("batch", { required: "Batch is required" })}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter Batch"
            />
            <p className="text-red-500 text-sm">{errors.batch?.message}</p>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none pr-10"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </button>
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm your password",
              })}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none pr-10"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </button>
            <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md py-3 text-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up {loading && <Spinner className="w-5 h-5 ml-2 inline" />}
          </button>

          {/* Divider */}
          {/* <p className="text-center text-gray-500">OR</p> */}

          {/* Sign In Link */}
          {/* <p className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link to={LOGIN_ROUTE} className="text-blue-600 font-medium">
              Sign In
            </Link>
          </p> */}

          {/* Social Login Icons */}
          {/* <div className="flex justify-center gap-4 mt-4">
            <FaGoogle className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500" />
            <FaGithub className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500" />
            <IoLogoLinkedin className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500" />
          </div> */}
          <button
          onClick={() => navigate(-1)}  // Go back to previous page
          className="w-full mt-4 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition"
        >
          Go Back
        </button>
        </form>
        
      </div>
     
    
      {/* Right Side Image (Hidden on Small Screens) */}
      {/* <div className="hidden lg:flex w-1/2 items-center justify-center">
        <img src={sideimage} alt="sideimage" className="w-full h-auto" />
      </div> */}
    </div>
  );
};

export default SignUp;
