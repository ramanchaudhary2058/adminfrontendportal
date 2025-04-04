import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addCourses } from "../../api/course";
import { toast } from "react-toastify";

const CourseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate(); // Hook for navigation

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await addCourses(data);
      alert("Course Created Successfully!");
      console.log(response.data);
      reset(); // Clear form
    } catch (error) {
      console.error("Error creating course:", error.response?.data || error.message);
      toast.error(error.response?.data || "Failed to create course");
    }
  };

  return (
    <div className="w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Create a Course</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block font-semibold">Title:</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Schedule Input (Date) */}
        <div>
          <label className="block font-semibold">Schedule:</label>
          <input
            type="datetime-local"
            {...register("schedule", { required: "Schedule is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.schedule && <p className="text-red-500">{errors.schedule.message}</p>}
        </div>

        {/* Price Input */}
        <div>
          <label className="block font-semibold">Price:</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        {/* URL Input */}
        <div>
          <label className="block font-semibold">Course URL:</label>
          <input type="url" {...register("url")} className="w-full p-2 border rounded" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
