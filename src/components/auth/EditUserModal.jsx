import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { editUser } from "../../api/auth";
import { toast } from "react-toastify";

const EditUserModal = ({ editModalOpen, setEditModalOpen, id, user, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  React.useEffect(() => {
    reset(user);
  }, [user, reset]);

  const onSubmit = async (data) => {
    const updatedUser = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      batch: data.batch,
    };

    try {
      await editUser(id, updatedUser);
      onSuccess(data);
      setEditModalOpen(false);
      toast.success('Successfully updated ')
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal
      isOpen={editModalOpen}
      onRequestClose={() => setEditModalOpen(false)}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-white bg-opacity-5  transition-opacity"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
          />
          {errors.name && <p className="text-red-500">{errors?.name?.message}</p>}

          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">{errors?.email?.message}</p>}

          <input
            type="text"
            {...register("phone")}
            className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone"
          />

          <input
            type="text"
            {...register("batch")}
            className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Batch"
          />

          <div className="flex justify-end space-x-24 pe-4">
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditUserModal;
