import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  // Fetch all enrollments on component mount
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Get token from localStorage or state
        const response = await axios.get(
          'http://localhost:5000/api/enrollment', // API URL to get all enrollments
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Send JWT token for authentication
            },
          }
        );
        setEnrollments(response.data); // Set enrollments state
      } catch (error) {
        console.error('Error fetching enrollments:', error);
        setResponseMessage(error.response?.data?.message || 'Failed to fetch enrollments');
      }
    };

    fetchEnrollments();
  }, []);

  const handleStatusUpdate = async (enrollmentId, newStatus) => {
    try {
      const token = localStorage.getItem('authToken'); // Get token from localStorage or state

      const response = await axios.put(
        `http://localhost:5000/api/enrollment/${enrollmentId}/status`, // API URL to update status
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authentication
          },
        }
      );

      setResponseMessage(response.data.message);

      // Update the enrollment list after status update
      setEnrollments((prevEnrollments) =>
        prevEnrollments.map((enrollment) =>
          enrollment._id === enrollmentId
            ? { ...enrollment, status: newStatus } // Update the status of the specific enrollment
            : enrollment
        )
      );
    } catch (error) {
      console.error('Error updating enrollment status:', error);
      setResponseMessage(error.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="rounded-xl p-6 w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">All Enrollments</h2>

        {/* Response Message */}
        {responseMessage && (
          <div className="mt-4 text-center text-green-600">{responseMessage}</div>
        )}

        {/* Enrollment Table */}
        <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-2 border-b">Enrollment ID</th>
              <th className="py-2 px-2 border-b">Status</th>
              <th className="py-2 px-2 border-b">Student ID</th>
              <th className="py-2 px-2 border-b">Course ID</th>
              <th className="py-2 px-2 border-b">Update Status</th>
              <th className="py-2 px-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment._id} className="text-gray-700">
                <td className="py-2 px-2 border-b">{enrollment._id}</td>
                <td className="py-2 px-2 border-b">{enrollment.status}</td>
                <td className="py-2 px-2 border-b">{enrollment.student}</td>
                <td className="py-2 px-2 border-b">{enrollment.course}</td>
                <td className="py-2 px-2 border-b">
                  <select
                    className="w-full border rounded-lg p-2"
                    value={enrollment.status}
                    onChange={(e) => handleStatusUpdate(enrollment._id, e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="SUCCESS">SUCCESS</option>
                    <option value="FAILED">FAILED</option>
                  </select>
                </td>
                <td className="py-2 px-2 border-b">
                  <button className="px-2 py-1 bg-indigo-400 rounded-2xl">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllEnrollments;
