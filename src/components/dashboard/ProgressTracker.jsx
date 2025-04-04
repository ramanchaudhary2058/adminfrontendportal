import React from "react";
import { COURSES_ROUTE, USERS_ROUTE } from "../../constants/route";
import { Link } from "react-router-dom";

const ProgressTracker = ({ totalCourses, totalUsers, upcomingCoursesCount }) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-x-2 gap-y-2">
      {/* Total Users */}
      <Link to={USERS_ROUTE}>
        <div className="bg-gradient-to-r flex from-sky-900 to-sky-400 h-24 rounded-lg px-7 py-7 hover:animate-pulse">
          <div>
            <h1 className="text-lg text-white font-bold">Total</h1>
            <p className="text-sm text-white">Users</p>
          </div>
          <p className="text-white text-3xl font-bold ml-16">{totalUsers}</p>
        </div>
      </Link>

      {/* Total Courses */}
      <Link to={`${COURSES_ROUTE}/all-courses`}>
        <div className="bg-gradient-to-r flex from-purple-900 to-purple-400 h-24 w-full rounded-lg px-7 py-7 hover:animate-pulse">
          <div>
            <h1 className="text-lg text-white font-bold">Total</h1>
            <p className="text-sm text-white">Courses</p>
          </div>
          <p className="text-white text-3xl font-bold ml-16">{totalCourses}</p>
        </div>
      </Link>

      {/* Upcoming Classes */}
      <div className="bg-gradient-to-r flex from-red-900 to-red-400 h-24 w-full rounded-lg px-7 py-7 hover:animate-pulse">
        <div>
          <h1 className="text-lg text-white font-bold">Upcoming</h1>
          <p className="text-sm text-white">Classes</p>
        </div>
        <p className="text-white text-3xl font-bold ml-16">{upcomingCoursesCount}</p>
      </div>

      {/* Current Enrollment (Placeholder Value) */}
      <div className="bg-gradient-to-r flex from-blue-900 to-blue-700 h-24 w-full rounded-lg px-7 py-7 hover:animate-pulse">
        <div>
          <h1 className="text-lg text-white font-bold">Current</h1>
          <p className="text-sm text-white">Enrollment</p>
        </div>
        <p className="text-white text-3xl font-bold ml-16">30</p>
      </div>
    </div>
  );
};

export default ProgressTracker;
