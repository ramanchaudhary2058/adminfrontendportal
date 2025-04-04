import React, { useEffect, useState } from "react";
import ProgressTracker from "../../components/dashboard/ProgressTracker";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../reducer/courses/courseAction";
import { getTotalCourses } from "../../api/course";
import { getUsersTotal } from "../../api/auth";

const AdminDashboard = () => {
  const [totalCourses, setTotalCourses] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchAllCourses());
    fetchDashboardData();
  }, [dispatch]);

  const fetchDashboardData = async () => {
    try {
      const [courseTotal, userTotal] = await Promise.all([
        getTotalCourses(),
        getUsersTotal(),
      ]);
      setTotalCourses(courseTotal.data);
      setTotalUsers(userTotal.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // **FILTER & SORT UPCOMING CLASSES BASED ON DATE**
  const upcomingClasses = courses
    .filter((course) => new Date(course.schedule) >= new Date()) // Future classes only
    .sort((a, b) => new Date(a.schedule) - new Date(b.schedule)); // Sort by date

  const upcomingCoursesCount = upcomingClasses.length; // Total upcoming classes

  return (
    <div className="p-6 w-full max-w-7xl mx-auto space-y-6">
      {/* Dashboard Title */}
      <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>

      {/* Progress Tracker with updated upcomingCoursesCount */}
      <ProgressTracker 
        totalCourses={totalCourses} 
        totalUsers={totalUsers} 
        upcomingCoursesCount={upcomingCoursesCount} 
      />

      {/* Upcoming Classes Section */}
      <h2 className="text-xl font-semibold">Upcoming Classes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingClasses.length > 0 ? (
          upcomingClasses.map((course, index) => (
            <DashboardCard key={index} {...course} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No upcoming classes available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
