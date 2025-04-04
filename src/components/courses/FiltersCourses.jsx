import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setLimit, setSort } from "../../reducer/courses/courseSlice";

const FiltersCourses = () => {
  const dispatch = useDispatch();
  const {query} = useSelector((state) => state.course);

  function setCourseLimit(data) {
    dispatch(setLimit(parseInt(data)));
  }
  function setCourseSort(data) {
    dispatch(setSort(data));
  }
  function setCourseByName(data) {
    dispatch(setFilters({ title: data }));
  }
  // function setCourseByBatch(data) {
  //   dispatch(setFilters({ faculty: data }));
  // }

  return (
    <div className="rounded-lg px-6 py-4 mb-4 w-full bg-white shadow-md flex flex-wrap gap-4 md:gap-6 justify-between items-center">
      {/* Name Filter */}
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
        <label className="font-medium text-gray-700">Name:</label>
        <input
          type="text"
          value={query?.filters?.title || ""}
          className="py-2 ml-2 px-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCourseByName(e.target.value)}
        />
      </div>

   
      {/* <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
        <label className="font-medium text-gray-700">Batch:</label>
        <select
          value={query?.filters?.faculty || ""}
          className="py-2 ml-2 px-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCourseByBatch(e.target.value)}
        >
          <option value="">Select Batch</option>
          {batch?.map((batchItem, index) => (
            <option key={index} value={batchItem}>
              {batchItem}
            </option>
          ))}
        </select>
      </div> */}

      {/* Sort Filter */}
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
        <label className="font-medium text-gray-700">Sort:</label>
        <select
          value={query?.sort || ""}
          className="py-2 px-3 ml-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCourseSort(e.target.value)}
        >
          <option value="" disabled>Select</option>
          <option value={JSON.stringify({ createdAt: -1 })}>Recent Added</option>
          <option value={JSON.stringify({ createdAt: 1 })}>Oldest Added</option>
          <option value={JSON.stringify({price: 1 })}>Low to High</option>
          <option value={JSON.stringify({price: -1 })}>High to Low</option>
        </select>
      </div>

      {/* Limit Filter */}
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
        <label className="font-medium text-gray-700">Limit:</label>
        <select
          value={query?.limit || ""}
          className="py-2 px-3 ml-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCourseLimit(e.target.value)}
        >
          <option value="">Select</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default FiltersCourses;
