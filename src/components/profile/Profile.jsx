
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducer/auth/authSlice';
import { FaPerson } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { getUserById } from '../../api/auth';

import profileimage from '../../assets/authimage/man.png'
const UserProfile = ({setProfileOpen}) => {
  const dispatch = useDispatch();
 const {user}= useSelector((state)=>state.auth)
 const [users,setUser]=useState(null)
 function getUser(){
getUserById(user._doc._id).then((response)=>{
  // console.log(response.data)
  setUser(response.data)
}).catch((error)=>{
  console.log(error.message)
})
 }
useEffect(()=>{
    getUser()
},[])
  return (
  
   
      <div className="bg-white p-4 rounded-2xl shadow-lg w-56  text-center ">
      <button onClick={()=>setProfileOpen(false)} className='w-full flex items-end justify-end'>  <RxCross2 className='text-lg text-red-500' /></button>
      <img src={users?.image||profileimage}alt="profile image" className='w-20 h-20 px-2 ml-14 rounded-full border-black'/>
        <h2 className="text-xl font-semibold ">User Profile</h2>
        <p className="text-gray-600">Welcome to your profile!</p>
        <p className="text-black text-lg">{users?.name}</p>
       
        <button 
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
    // </div>
  );
};

export default UserProfile;

