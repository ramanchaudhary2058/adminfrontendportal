import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import GetAllEnrollments from './GetAllEnrollment';

const UpdateEnrollStatus = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [responseMessage, setResponseMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage or state

      const response = await axios.put(
        `http://localhost:5000/api/enrollment/${data.enrollmentId}/status`, // API URL
        { status: data.status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authentication
          },
        }
      );

      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error updating status:', error);
      setResponseMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Update Enrollment Status</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Enrollment ID Input */}
          <label className="block text-gray-700 font-medium mb-2">Enrollment ID *</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mb-4"
            {...register('enrollmentId', { required: 'Enrollment ID is required' })}
          />
          {errors.enrollmentId && <p className="text-red-500 text-sm">{errors.enrollmentId.message}</p>}

          {/* Status Selection */}
          <label className="block text-gray-700 font-medium mb-2">Select Status *</label>
          <select
            className="w-full border rounded-lg p-2 mb-4"
            {...register('status', { required: 'Status is required' })}
          >
            <option value="">-- Select Status --</option>
            <option value="PENDING">PENDING</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="FAILED">FAILED</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={!errors.enrollmentId && !errors.status}
          >
            Update Status
          </button>
        </form>

        {/* Response Message */}
        {responseMessage && (
          <div className="mt-4 text-center text-green-600">{responseMessage}</div>
        )}
      </div>
      <GetAllEnrollments/>
    </div>
  );
};

export default UpdateEnrollStatus;
