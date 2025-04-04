const CourseViewCard = ({ course, onDelete, onEdit }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 border relative max-w-sm mx-auto">
        {/* Course Image */}
        {course.url ? (
          <img
            src={course.url}
            alt="Course"
            className="w-full h-40 object-cover rounded-md"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
            No Image
          </div>
        )}
  
        {/* Course Details */}
        <div className="p-2 space-y-2">
        
          <p className="text-gray-600">📅 {new Date(course.schedule).toLocaleString()}</p>
          <p className="text-gray-800">💰 Price: ${course.price}</p>
          <h2 className="text-xl font-semibold mt-2 uppercase">{course.title}</h2>
        </div>
  
        {/* Action Buttons */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => onEdit(course)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(course._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default CourseViewCard;
  