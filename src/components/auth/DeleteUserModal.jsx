import React from "react";
import Modal from "react-modal";

const DeleteUserModal = ({ deleteModalOpen, setDeleteModalOpen, getUser, button }) => {
  return (
    <Modal
      isOpen={deleteModalOpen}
      onRequestClose={() => setDeleteModalOpen(false)}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-white bg-opacity-10 transition-opacity"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 text-center">Are you sure?</h2>
        <p className="mb-4 text-center">
          Do you really want to delete <strong>{getUser?.name}</strong>?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setDeleteModalOpen(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-all duration-200"
          >
            Cancel
          </button>
          {button}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
