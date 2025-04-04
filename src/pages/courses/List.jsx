import { useState, useEffect } from "react";
import { deleteCourses, updateCourses } from "../../api/course";
import EditCourseForm from "../../components/courses/EditCourseForm";
import CourseViewCard from "../../components/courses/CourseViewCard";
import { Link } from "react-router-dom";
import { COURSES_ROUTE } from "../../constants/route";
import FiltersCourses from "../../components/courses/FiltersCourses";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../reducer/courses/courseAction";
import { removeCourse, modifyCourse, resetQuery } from "../../reducer/courses/courseSlice"; // Import actions for removing and modifying courses

const CourseList = () => {
  const { courses, query } = useSelector((state) => state.course); // Fetch from Redux
  const [editCourse, setEditCourse] = useState(null);

  const dispatch = useDispatch();

  // Fetch courses when the component mounts or query changes
  useEffect(() => {
    dispatch(fetchAllCourses(query));
  }, [dispatch, query]);

  // Delete Course
  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteCourses(id);
      dispatch(removeCourse(id)); // Dispatch action to remove the course from Redux store
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Update Course
  const updateCourse = async (updatedCourse) => {
    try {
      await updateCourses(updatedCourse._id, updatedCourse);
      dispatch(modifyCourse(updatedCourse)); // Dispatch action to update the course in Redux store
      setEditCourse(null);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="container mx-auto px-6">
      <p className="text-3xl font-semibold text-gray-500 mt-4">All Courses</p>

      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold mb-4">📚 Courses</h1>
       <div className="space-x-2">
       <button  onClick={()=>dispatch(resetQuery()) }className="text-lg mb-4 px-3 py-1 rounded-lg bg-indigo-400 text-white">
            ResetFilters
          </button>
        <Link to={`${COURSES_ROUTE}/add`}>
          <button className="text-lg mb-4 px-3 py-1 rounded-lg bg-sky-400 text-white">
            Add Course
          </button>
        </Link>
       </div>
      </div>

      <FiltersCourses />

      {editCourse ? (
        <EditCourseForm
          course={editCourse}
          onUpdate={updateCourse}
          onCancel={() => setEditCourse(null)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {courses.length===0?<div className="text-xl text-red-400 text-center w-full mt-42 ml-60">course not match !!</div>:courses.map((course) => (
            <CourseViewCard
              key={course._id}
              course={course}
              onDelete={deleteCourse}
              onEdit={setEditCourse}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
