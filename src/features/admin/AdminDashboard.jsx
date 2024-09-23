import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-64 md:fixed md:h-full">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-14 max-sm:ml-14  ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
