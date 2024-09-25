import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-64 md:fixed md:h-full z-20">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10"
          onClick={handleSidebarToggle}
        ></div>
      )}

      <div
        className={`flex-1 md:ml-16 max-sm:ml-16 transition-all duration-300 ${
          isSidebarOpen ? "blur-sm" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
