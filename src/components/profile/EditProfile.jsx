import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { inputProfile } from "../../reducer/auth/authAction";
import { NavLink } from "react-router-dom";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  async function submitImage(data) {
    try {
      const formData = new FormData();
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      dispatch(inputProfile(formData));
      toast.success("Profile uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload profile.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Upload Your Profile Image</h1>

        <form onSubmit={handleSubmit(submitImage)} className="space-y-4">
          {/* File Input */}
          <label className="block text-gray-700 font-medium">Profile Image</label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="w-full border p-2 rounded-md cursor-pointer focus:ring-2 focus:ring-blue-400"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

          {/* Upload Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Upload
          </button>
        </form>

        {/* Change Password Button */}
        <NavLink to="/forgot-password">
          <button className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-300 transition duration-300">
            Change Password
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default EditProfile;
