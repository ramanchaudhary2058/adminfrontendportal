import React, { useState } from "react";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../constants/route";
import { Link, NavLink } from "react-router-dom";

import { IoBookSharp, IoPersonSharp } from "react-icons/io5";
import { MdLineWeight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { authMenu } from "../constants/navMenu";
import UserProfile from "./profile/Profile";
import { useSelector } from "react-redux";

const Navbar = ({ isOpen, setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="bg-sky-400 sticky top-0 z-50 opacity-95 py-1 ps-10 pe-6 text-white flex justify-between items-center">
      <div className="flex flex-row items-center justify-between w-60">
        <button onClick={() => setOpen(!isOpen)}>
          {isOpen ? <MdLineWeight className="text-3xl" /> : <RxCross2 className="text-2xl" />}
        </button>
        <div className="flex items-center justify-between">
          <IoBookSharp className="text-5xl mt-1 mr-2" />
          <div className="ml-3 text-md text-center">
            Sipalaya Training
            <p className="mr-3 text-sm">Admin Portal</p>
          </div>
        </div>
      </div>

      {!user && (
        <ul className="space-x-8 flex justify-around items-center relative">
          {authMenu.map((menu) => (
            <li key={menu.route}>
              <NavLink to={menu.route}>{menu.label}</NavLink>
            </li>
          ))}
        </ul>
      )}

      {user && (
        <div className="flex gap-x-4">
        
        


          <button onClick={() => setProfileOpen(true)}>
            <IoPersonSharp />
          </button>

          <div className={`${isProfileOpen ? "block" : "hidden"} absolute top-2 right-2`}>
            <UserProfile setProfileOpen={setProfileOpen} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
