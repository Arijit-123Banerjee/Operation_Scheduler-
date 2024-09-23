import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineClipboardList,
  HiOutlineLogout,
  HiOutlineMenuAlt2,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: HiOutlineHome, label: "Home", path: "/" },
    {
      icon: MdOutlineDashboardCustomize,
      label: "User Dashboard",
      path: "/userdashboard",
    },
    {
      icon: HiOutlineClipboardList,
      label: "My Patients",
      path: "/userdashboard/tasks",
    },
    {
      icon: HiOutlineUser,
      label: "My Profile",
      path: "/userdashboard/myoperation",
    },
  ];

  return (
    <div className="fixed z-50">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-30 text-gray-600 hover:text-sky-600 focus:outline-none"
      >
        <HiOutlineMenuAlt2 className="w-6 h-6" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full ${
          isOpen ? "w-64" : "w-16"
        } bg-white text-gray-800 shadow-lg transition-all duration-300 ease-in-out z-20`}
      >
        <nav className="mt-40">
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default UserSidebar;
