import Sidebar from "@/Components/AdminCompoents/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";

const AdminDashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen relative">
      {/* Sidebar for desktop */}
      <div
        className={`fixed inset-0 xl:static xl:w-[20%] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 z-40`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Sidebar toggle button for mobile */}
      <div className="fixed top-4 left-4 z-50 xl:hidden">
        <Hamburger
          toggled={isSidebarOpen}
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
          size={20} // Optional: Adjust the size of the hamburger icon
        />
      </div>

      <div
        className={`flex-1 transition-all duration-300 overflow-scroll ${
          isSidebarOpen ? "blur-sm" : ""
        }`}
      >
        <Outlet /> {/* This is where the nested routes will be rendered */}
      </div>
    </div>
  );
};

export default AdminDashBoard;
