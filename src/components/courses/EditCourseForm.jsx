import { useState } from "react";

const EditCourseForm = ({ course, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({ ...course });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Edit Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Title"
        />
        <input
          type="datetime-local"
          name="schedule"
          value={formData.schedule}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Price"
        />
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Course URL"
        />
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourseForm;
