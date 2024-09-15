import Sidebar from "@/Components/AdminCompoents/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import EmergencyModal from "@/Components/Emergencies/EmergencyModal";
import { FaExclamationCircle } from "react-icons/fa";

const AdminDashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const handleAddEmergency = (emergencyDetails) => {
    // Handle the emergency addition here
    console.log("Emergency details added:", emergencyDetails);
  };

  return (
    <div
      className="flex h-screen relative"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg")',
        backgroundSize: "cover",
      }}
    >
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
        {/* Emergency Button */}
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="fixed bottom-4 right-4 z-50 p-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700"
        >
          <FaExclamationCircle size={24} /> {/* Emergency icon */}
        </button>
      </div>

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onAddEmergency={handleAddEmergency}
      />
    </div>
  );
};

export default AdminDashBoard;
