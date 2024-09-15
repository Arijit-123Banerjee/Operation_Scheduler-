import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Import React Icons for logout

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate logout and navigation for demonstration
    navigate("/");
  };

  return (
    <nav
      className="bg-[rgba(255,255,255,0.2)] shadow-lg rounded-xl fixed inset-0 z-10 my-4 ml-4 h-[calc(100vh-32px)] w-72 transition-transform duration-300 xl:translate-x-0 backdrop-blur-[12.5px] border border-[rgba(255,255,255,0.18)]"
      style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
    >
      <div className="relative">
        <a className="py-6 px-8 text-center" href="#/">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
            DashBoard
          </h6>
        </a>
        <button
          aria-label="Close sidebar"
          className="align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          type="button"
          onClick={closeSidebar}
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            &#10005; {/* X icon for closing */}
          </span>
        </button>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li>
            <Link to="/admindashboard">
              <button
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize ${
                  location.pathname === "/admindashboard"
                    ? "bg-[#23b76c] text-white"
                    : "text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                }`}
                type="button"
              >
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Dashboard
                </p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/admindashboard/operations">
              <button
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize ${
                  location.pathname === "/admindashboard/operations"
                    ? "bg-[#23b76c] text-white"
                    : "text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                }`}
                type="button"
              >
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  List of Operations
                </p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/admindashboard/doctors">
              <button
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize ${
                  location.pathname === "/admindashboard/doctors"
                    ? "bg-[#23b76c] text-white"
                    : "text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                }`}
                type="button"
              >
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Available Doctors
                </p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/admindashboard/store">
              <button
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize ${
                  location.pathname === "/admindashboard/store"
                    ? "bg-[#23b76c] text-white"
                    : "text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                }`}
                type="button"
              >
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Store
                </p>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/admindashboard/appointments">
              <button
                className={`align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize ${
                  location.pathname === "/admindashboard/appointments"
                    ? "bg-[#23b76c] text-white"
                    : "text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                }`}
                type="button"
              >
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  List of Appointments
                </p>
              </button>
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:bg-red-100 py-3 px-4 rounded-lg w-full transition-colors duration-200 ease-in-out"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-sans font-bold">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
