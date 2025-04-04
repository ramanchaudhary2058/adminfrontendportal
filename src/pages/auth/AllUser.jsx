import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"; // For navigation
import profileimage from "../../assets/authimage/man.png";
import { fetchAllBacthes, fetchAllUsers } from "../../reducer/auth/authAction";
import { REGISTER_ROUTE } from "../../constants/route";

import { resetQuery } from "../../reducer/auth/userSlice";
import Filters from "../../components/auth/Filters";

const AllUser = () => {
  const { allUser,query } = useSelector((state) => state.userdata); // Fetch from Redux
  const navigate = useNavigate();
const dispatch=useDispatch()
useEffect(()=>{
    dispatch(fetchAllUsers(query))
    dispatch(fetchAllBacthes())
},[dispatch,query])
  return (
    <div className="container mx-auto p-4 ml-3">
     <div className="flex justify-between items-center mt-3 mb-4">
     <h1 className="text-2xl font-semibold ">All Users</h1>
    <div className="space-x-2">
    <button onClick={()=>dispatch(resetQuery())} className="bg-sky-500 hover:bg-sky-300 px-3 py-1 rounded-lg">
                ResetFilter
    </button>
     <button className="bg-sky-500 rounded-lg px-3 py-1 hover:bg-sky-600 me-4"><NavLink to={REGISTER_ROUTE}>Add User</NavLink></button>
    </div>
     </div>
     <Filters/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allUser && allUser.length > 0 ? (
          allUser.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center space-y-4"
            >
              <img
                src={user.image || profileimage}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-center">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={() => navigate(`/user/${user._id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AllUser;
