import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setLimit, setSort } from "../../reducer/auth/userSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const { query, batch } = useSelector((state) => state.userdata);

  function setUserLimit(data) {
    dispatch(setLimit(parseInt(data)));
  }
  function setUserSort(data) {
    dispatch(setSort(data));
  }
  function setUserByName(data) {
    dispatch(setFilters({ name: data }));
  }
  function setUserByBatch(data) {
    dispatch(setFilters({ batch: data }));
  }

  return (
    <div className="rounded-lg px-6 py-4 mb-4 w-full bg-white shadow-md flex flex-wrap gap-4 md:gap-6 justify-between items-center">
      {/* Name Filter */}
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
        <label className="font-medium text-gray-700">Name:</label>
        <input
          type="text"
          value={query?.filters?.name || ""}
          className="py-2 ml-2 px-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUserByName(e.target.value)}
        />
      </div>

      {/* Batch Filter */}
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
        <label className="font-medium text-gray-700">Batch:</label>
        <select
          value={query?.filters?.batch || ""}
          className="py-2 ml-2 px-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUserByBatch(e.target.value)}
        >
          <option value="">Select Batch</option>
          {batch?.map((batchItem, index) => (
            <option key={index} value={batchItem}>
              {batchItem}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Filter */}
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
        <label className="font-medium text-gray-700">Sort:</label>
        <select
          value={query?.sort || ""}
          className="py-2 px-3 ml-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUserSort(e.target.value)}
        >
          <option value="" disabled>Select</option>
          <option value={JSON.stringify({ createdAt: -1 })}>Recent Added</option>
          <option value={JSON.stringify({ createdAt: 1 })}>Oldest Added</option>
          <option value={JSON.stringify({ name: 1 })}>Name (A-Z)</option>
          <option value={JSON.stringify({ name: -1 })}>Name (Z-A)</option>
        </select>
      </div>

      {/* Limit Filter */}
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
        <label className="font-medium text-gray-700">Limit:</label>
        <select
          value={query?.limit || ""}
          className="py-2 px-3 ml-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUserLimit(e.target.value)}
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

export default Filters;
