"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaCalendarAlt, FaHotel } from "react-icons/fa";
import { Spin as Hamburger } from "hamburger-react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar({ userRole, isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = userRole === "admin";
  const isUser = userRole === "user";
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <nav className="bg-sky-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="logo" className="h-8 w-8" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {!isLoggedIn && (
                <button
                  className="flex items-center justify-center px-4 py-2 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white rounded-md text-sm font-medium transition-colors duration-200 mr-2"
                  onClick={handleRegister}
                >
                  <FaUserPlus className="h-4 w-4 mr-2" />
                  Sign up for free
                </button>
              )}
              {isAdmin && (
                <Link to={"/admindashboard"}>
                  <button className="flex items-center justify-center px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-md text-sm font-medium transition-colors duration-200">
                    <FaCalendarAlt className="h-4 w-4 mr-2" />
                    Schedule an operation
                  </button>
                </Link>
              )}
              {isUser && (
                <Link to={"/userdashboard"}>
                  <button className="flex items-center justify-center px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-md text-sm font-medium transition-colors duration-200">
                    <FaHotel className="h-4 w-4 mr-2" />
                    Book Ambulance
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              color="#0284c7"
              size={24}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-sky-100">
          <div className="pt-4 pb-3 border-t border-sky-200">
            <div className="flex flex-col items-center px-5 space-y-2">
              {!isLoggedIn && (
                <button
                  className="flex items-center justify-center w-full px-4 py-2 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white rounded-md text-sm font-medium transition-colors duration-200"
                  onClick={handleRegister}
                >
                  <FaUserPlus className="h-4 w-4 mr-2" />
                  Sign up for free
                </button>
              )}
              {isAdmin && (
                <button className="flex items-center justify-center w-full px-4 py-2 bg-sky-600 text-white  hover:bg-sky-700 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaCalendarAlt className="h-4 w-4 mr-2" />
                  Schedule an operation
                </button>
              )}
              {isUser && (
                <button className="flex items-center justify-center w-full px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaHotel className="h-4 w-4 mr-2" />
                  Book a room
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
