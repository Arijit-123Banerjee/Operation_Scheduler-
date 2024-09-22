import React, { useState } from "react";
import {
  FaList,
  FaUserMd,
  FaStore,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed z-0">
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm z-0"
          onClick={toggleMenu}
        ></div>
      )}

      <button
        onClick={toggleMenu}
        className={`absolute top-4 left-4 z-30 ${
          isOpen ? "text-sky-600" : "text-gray-600"
        } focus:outline-none`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 h-full ${
          isOpen ? "w-64" : "w-16"
        } bg-white text-gray-800 shadow-lg transition-all duration-300 ease-in-out z-20`}
      >
        <div className="p-4">
          <h2
            className={`text-lg font-semibold mt-10 ${
              isOpen ? "" : "hidden"
            } text-sky-600`}
          >
            Dashboard
          </h2>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {[
              { icon: FaList, label: "Operations" },
              { icon: FaUserMd, label: "Doctors" },
              { icon: FaStore, label: "Store" },
              { icon: FaCalendarAlt, label: "Appointments" },
              { icon: FaUser, label: "User Profile" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="px-4 py-8 hover:bg-sky-100 cursor-pointer group relative"
              >
                <Icon
                  className={`inline-block ${
                    isOpen ? "mr-2" : "mx-auto"
                  } text-sky-600`}
                />
                <span
                  className={
                    isOpen
                      ? ""
                      : "hidden group-hover:block absolute left-16 bg-white text-gray-800 px-2 py-1 rounded shadow-md"
                  }
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 hover:bg-red-100 cursor-pointer group ">
          <FaSignOutAlt
            className={`inline-block ${
              isOpen ? "mr-2" : "mx-auto"
            } text-red-500`}
          />
          <span
            className={
              isOpen
                ? ""
                : "hidden group-hover:block absolute left-16 bg-white text-gray-800 px-2 py-1 rounded shadow-md"
            }
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
