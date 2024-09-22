"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHotel,
  FaUserPlus,
  FaCalendarAlt,
  FaClipboardList,
  FaSignOutAlt,
  FaVideo,
  FaQuestionCircle,
  FaUserCog,
} from "react-icons/fa";
import { Spin as Hamburger } from "hamburger-react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar({ userRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = userRole === "admin";
  const isUser = userRole === "user";
  const navigate = useNavigate();

  const scrollToServices = (e) => {
    e.preventDefault();
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navLinks = isAdmin
    ? [
        { href: "/services", text: "Services", icon: FaClipboardList },
        { href: "/doctors-list", text: "Doctors List", icon: FaUserCog },
        { href: "/store", text: "Store", icon: FaHotel },
        { href: "/faq", text: "FAQ", icon: FaQuestionCircle },
      ]
    : isUser
    ? [
        { href: "/my-appointments", text: "My Appointments" },
        { href: "/book-room", text: "Book a Room" },
        { href: "/medical-records", text: "Medical Records" },
        { href: "/doctors", text: "Our Doctors" },
      ]
    : [
        { href: "/about", text: "About" },
        { href: "#services", text: "Services", onClick: scrollToServices },
        { href: "#faq", text: "FAQ", onClick: scrollToServices },
        { href: "/contact", text: "Contact", onClick: scrollToServices },
      ];

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
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    onClick={link.onClick}
                    className="text-sky-800 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAdmin ? (
                <>
                  <button
                    className="flex items-center justify-center px-4 py-2 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white rounded-md text-sm font-medium transition-colors duration-200 mr-2"
                    onClick={handleRegister}
                  >
                    <FaUserPlus className="h-4 w-4 mr-2" />
                    Sign up for free
                  </button>
                  <Link to={"/admindashboard"}>
                    <button className="flex items-center justify-center px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-md text-sm font-medium transition-colors duration-200">
                      <FaCalendarAlt className="h-4 w-4 mr-2" />
                      Schedule an operation
                    </button>
                  </Link>
                </>
              ) : isUser ? (
                <button className="flex items-center justify-center px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaSignOutAlt className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    className="flex items-center justify-center px-4 py-2 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white rounded-md text-sm font-medium transition-colors duration-200 mr-2"
                    onClick={handleRegister}
                  >
                    <FaUserPlus className="h-4 w-4 mr-2" />
                    Sign up for free
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-md text-sm font-medium transition-colors duration-200">
                    <FaHotel className="h-4 w-4 mr-2" />
                    Book a room
                  </button>
                </>
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                onClick={link.onClick}
                className="text-sky-800 hover:text-sky-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center"
              >
                {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                {link.text}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-sky-200">
            <div className="flex flex-col items-center px-5 space-y-2">
              {isAdmin ? (
                <>
                  <button
                    className="flex items-center justify-center w-full px-4 py-2 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={handleRegister}
                  >
                    <FaUserPlus className="h-4 w-4 mr-2" />
                    Sign up for free
                  </button>
                  <button className="flex items-center justify-center w-full px-4 py-2 bg-sky-600 text-white  hover:bg-sky-700 rounded-md text-sm font-medium transition-colors duration-200">
                    <FaCalendarAlt className="h-4 w-4 mr-2" />
                    Schedule an operation
                  </button>
                </>
              ) : isUser ? (
                <button className="flex items-center justify-center w-full px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaSignOutAlt className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    className="flex items-center justify-center w-full px-4 py-2 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={handleRegister}
                  >
                    <FaUserPlus className="h-4 w-4 mr-2" />
                    Sign up for free
                  </button>
                  <button className="flex items-center justify-center w-full px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-md text-sm font-medium transition-colors duration-200">
                    <FaHotel className="h-4 w-4 mr-2" />
                    Book a room
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
