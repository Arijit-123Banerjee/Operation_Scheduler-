import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const EmergencyModal = ({ isOpen, onClose, onAddEmergency }) => {
  const [doctorName, setDoctorName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleAddClick = () => {
    onAddEmergency({ doctorName, roomNumber });
    setDoctorName("");
    setRoomNumber("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes size={20} /> {/* Close icon */}
        </button>
        <h2 className="text-lg font-semibold mb-4">Development Mode </h2>
      </div>
    </div>
  );
};

export default EmergencyModal;
