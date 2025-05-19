import React, { useState, useEffect } from "react";
import brandLogo from "../../../public/Brand_Logo.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Search from "../shop/Search";
import { LogOut } from "lucide-react";
import { Avatar, Badge, Space } from "antd";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import UserDropdown from "./UserDropdown";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../functions/users";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItem = [
    { path: "/", name: "Home" },
    { path: "/shop", name: "Shop" },
    { path: "/contact", name: "Contact" },
  ];

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ดึงข้อมูลโปรไฟล์เมื่อ user มี token
  useEffect(() => {
    if (user?.token && !user?.profilePicture) {
      getUserProfile(user.token)
        .then((res) => {
          dispatch({
            type: "UPDATE_USER",
            payload: {
              ...user,
              profilePicture: res.data.profilePicture || null,
            },
          });
        })
        .catch((err) => {
          console.error("Failed to load profile:", err);
          toast.error("Failed to load profile data");
        });
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    toast.success("Logged out successfully!");
    navigate("/");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-15">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img className="w-28 sm:w-36" src={brandLogo} alt="logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-200"
              >
                {item.name}
              </NavLink>
            ))}
            <Link to="/cart" className="flex rounded-xl bg-gray-200 p-2">
              <Badge count={cart.length} size="small" offset={[5, 0]}>
                <IoCartOutline size={20} />
              </Badge>
            </Link>
            <Search isOpen={isOpen}/>
            {!user?.token ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-sm px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-indigo-100 hover:shadow transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-sm px-4 py-2 text-sm font-semibold ring-1 ring-gray-400 hover:bg-indigo-700 hover:text-white hover:ring-0 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            ) : user?.role === "admin" ? (
              <div className="group relative flex items-center cursor-pointer rounded px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 transition-all duration-300">
                <img
                  src={user?.profilePicture || "https://avatar.iran.liara.run/public"}
                  alt="Profile"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover mr-1"
                />
                <span className="text-sm">{user.username}</span>
                <IoMdArrowDropdown />
                <div className="absolute top-full right-0 mt-2 w-48 rounded-md border border-gray-100 bg-white shadow-xl hidden group-hover:block">
                  <Link to="/admin/index">
                    <div className="text-sm text-center rounded-md hover:bg-indigo-100 hover:text-indigo-600 m-2 py-2">
                      My Dashboard
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 border-t border-gray-300 py-3 text-sm hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <UserDropdown user={user} logout={handleLogout} mobile={false} toggleMenu={toggleMenu} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-indigo-600">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col px-4 py-2 space-y-2">
              <div className="py-2">
                <Search />
              </div>
              {menuItem.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  onClick={toggleMenu}
                  className="text-gray-700 hover:bg-gray-100 hover:text-indigo-600 px-3 py-2 text-base font-medium rounded-md"
                >
                  {item.name}
                </NavLink>
              ))}
              <Link
                to="/cart"
                onClick={toggleMenu}
                className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 text-base rounded-md"
              >
                <Badge count={cart.length} size="small" offset={[5, 0]}>
                  <IoCartOutline size={20} />
                </Badge>
                Cart
              </Link>
              
              {!user?.token ? (
                <div className="flex flex-col gap-2 mb-4">
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="text-gray-700 hover:bg-indigo-100 px-3 py-2 text-base font-medium rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={toggleMenu}
                    className="text-gray-700  hover:bg-indigo-700 hover:text-white px-3 py-2 text-base font-medium rounded-md ring-1 ring-gray-400 hover:ring-0"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : user?.role === "admin" ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/admin/index"
                    onClick={toggleMenu}
                    className="flex items-center gap-2 text-gray-700 hover:bg-indigo-100 px-3 py-2 text-base font-medium rounded-md"
                  >
                    <img
                      src={user?.profilePicture || "https://avatar.iran.liara.run/public"}
                      alt="Profile"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 text-base font-medium rounded-md"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              ) : (
                <UserDropdown isOpen={isOpen} user={user} logout={handleLogout} mobile={true} toggleMenu={toggleMenu} />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MenuBar;