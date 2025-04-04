import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import profileimage from "../../assets/authimage/man.png";
import { deleteUser, getUserById } from "../../api/auth";

import { USERS_ROUTE } from "../../constants/route";
import EditUserModal from "../../components/auth/EditUserModal";
import DeleteUserModal from "../../components/auth/DeleteUserModal";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [getUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Fetch user details
  function fetchUser() {
    setLoading(true); // Start loading
    getUserById(id)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(getUser._id);
      setDeleteModalOpen(false);
      toast.success('succussfully deleted')
      navigate(USERS_ROUTE);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Show loading state
  if (loading) {
    return <div className="text-center mt-10 text-blue-500 font-semibold">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <img
          src={getUser.image || profileimage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold mt-4">{getUser.name}</h1>
        <p className="text-gray-600">{getUser.email}</p>

        <div className="mt-4 p-4 border rounded-lg w-full text-center">
          <h2 className="text-lg font-semibold">Additional Details</h2>
          <p>Phone: {getUser.phone || "N/A"}</p>
          <p>Batch: {getUser.batch || "N/A"}</p>
        </div>

        {/* Edit & Delete Buttons */}
        <div className="flex mt-4 space-x-4">
          <button
            onClick={() => setEditModalOpen(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            <FaTrash /> Delete
          </button>
        </div>

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}  // Go back to previous page
          className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
        >
          Go Back
        </button>
      </div>

      {/* Edit Modal */}
      <EditUserModal
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        id={getUser?._id}
        user={getUser}
        onSuccess={(updatedUser) => setUser(updatedUser)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteUserModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        button={
          <button
            onClick={handleDeleteUser}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        }
        getUser={getUser}
      />
    </div>
  );
};

export default UserDetails;
