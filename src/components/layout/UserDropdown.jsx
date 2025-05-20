import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { LogOut } from "lucide-react";

const UserDropdown = ({ user, logout, mobile, toggleMenu, isOpen }) => {
  const profilePicture = user?.profilePicture;

  if (mobile) {
    return (
      <div className="flex flex-col gap-2 mb-4">

        <Link
          to="/user/index"
          onClick={toggleMenu}
          className="text-gray-700 group hover:bg-indigo-100 px-3 py-2 text-base font-medium rounded-md"
        >
          <div className="flex gap-2 items-center">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full border-gray-400 object-cover border p-0.5"
            />
            {isOpen ? <span className=" font-semibold group-hover:text-indigo-600">{user.username}</span> : "Profile"}
          </div>
        </Link>

        <button
          onClick={() => {
            logout();
            toggleMenu();
          }}
          className="flex items-center gap-2 group text-gray-700 hover:bg-gray-100 px-3 py-2 text-base font-medium rounded-md"
        >
          <LogOut className="w-4 h-4 group-hover:text-red-600" /> <span className="group-hover:text-red-600">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <div className="group relative flex items-center cursor-pointer rounded-md px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 transition-all duration-300">
      <img
        src={profilePicture}
        alt="Profile"
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover mr-1"
      />
      <span className="text-sm sm:text-base">{user.username}</span>
      <IoMdArrowDropdown className="ml-1" />

      <div className="absolute top-full right-0 w-40 mt-2 sm:w-48 rounded-md border border-gray-100 bg-white shadow-xl hidden group-hover:block z-50">
        {/* Pseudo-element เพื่อเติม gap */}
        <div className="absolute -top-2 left-0 w-full h-2 bg-transparent" />
        <Link to="/user/index">
          <div className="text-sm sm:text-base text-center rounded-md hover:bg-indigo-100 hover:text-indigo-600 mx-2 my-2 py-2">
            Profile
          </div>
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 border-t border-gray-300 py-3 text-sm sm:text-base hover:bg-gray-100"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;