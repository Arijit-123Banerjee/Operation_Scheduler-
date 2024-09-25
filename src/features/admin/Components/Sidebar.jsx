import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineClipboardList,
  HiOutlineUserGroup,
  HiOutlineShoppingBag,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineMenuAlt2,
  HiOutlineHome,
} from "react-icons/hi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { useLocation } from "react-router-dom";

const UserSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      icon: HiOutlineHome,
      label: "Home",
      path: "/",
    },
    {
      icon: MdOutlineDashboardCustomize,
      label: "User Dashboard",
      path: "/admindashboard",
    },
    {
      icon: HiOutlineClipboardList,
      label: "Operations",
      path: "/admindashboard/operations",
    },
    {
      icon: HiOutlineUser,
      label: "Doctors",
      path: "/admindashboard/doctors",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-30 text-gray-600 hover:text-sky-600 focus:outline-none"
      >
        <HiOutlineMenuAlt2 className="w-6 h-6" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full ${
          isOpen ? "w-64" : "w-16"
        } bg-white text-gray-800 shadow-lg transition-all duration-300 ease-in-out z-20`}
      >
        <div className="p-4 mt-16 ">
          <h2
            className={`text-xl font-bold ${
              isOpen ? "" : "hidden"
            } text-sky-600`}
          >
            User Dashboard
          </h2>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2">
            {menuItems.map(({ icon: Icon, label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  className="flex items-center px-4 py-3 hover:bg-sky-50 cursor-pointer group relative transition-colors duration-200"
                >
                  <Icon
                    className={`text-gray-600 group-hover:text-sky-600 w-6 h-6 ${
                      isOpen ? "mr-3" : "mx-auto"
                    }`}
                  />
                  <span
                    className={`${
                      isOpen ? "inline-block" : "hidden"
                    } group-hover:text-sky-600`}
                  >
                    {label}
                  </span>
                  {/* Tooltip on collapsed state */}
                  {!isOpen && (
                    <span className="hidden group-hover:block absolute left-16 bg-white text-gray-800 px-2 py-1 rounded shadow-md">
                      {label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4 hover:bg-red-50 cursor-pointer group">
          <HiOutlineLogout
            className={`inline-block ${
              isOpen ? "mr-3" : "mx-auto"
            } text-red-500 w-6 h-6`}
          />
          <span
            className={`${isOpen ? "inline-block" : "hidden"} text-red-500`}
          >
            Logout
          </span>
          {!isOpen && (
            <span className="hidden group-hover:block absolute left-16 bg-white text-gray-800 px-2 py-1 rounded shadow-md">
              Logout
            </span>
          )}
        </div>
      </div>

      {/* Background overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Main content with blur effect when sidebar is open */}
      <div className={`transition-all duration-300 ${isOpen ? "blur-sm" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default UserSidebar;
