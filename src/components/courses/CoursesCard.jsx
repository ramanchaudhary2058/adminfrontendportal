import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeContent } from "../../reducer/headerSlice";
import { fetchAllCourses } from "../../reducer/courses/courseAction";
import { CLASSCONTENT_ROUTE } from "../../constants/route";

const CourseCard = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {courses.map((course) => (
        <div
          key={course.id || course.title} 
          className="bg-white rounded-2xl shadow-lg p-4 transition-transform transform hover:scale-105"
        >
          <div className="w-full h-40 rounded-md overflow-hidden bg-gray-200">
            {course.url ? (
              <img
                src={course.url}
                alt={course.title}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold mt-3 uppercase">{course.title}</h2>

          <Link to={`${CLASSCONTENT_ROUTE}?subject=${encodeURIComponent(course.title)}`}>
            <button
              onClick={() => dispatch(changeContent("class-content"))}
              className="mt-3 w-full text-white bg-blue-500 px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-all"
            >
              Watch Videos
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
