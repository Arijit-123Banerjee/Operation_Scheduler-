import React, { useState, useEffect } from "react";
import { db, collection, query, where, getDocs } from "@/Firebase";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  FaUser,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaHeartbeat,
  FaDoorClosed,
} from "react-icons/fa";

const UserDashBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [operationDetails, setOperationDetails] = useState(null);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      if (operationDetails && operationDetails.operationDate) {
        const operationDate = parseISO(operationDetails.operationDate);
        setCountdown(formatDistanceToNow(operationDate, { addSuffix: true }));
      }
    };

    // Update countdown every minute
    const interval = setInterval(updateCountdown, 60000);
    updateCountdown(); // Initial update

    return () => clearInterval(interval);
  }, [operationDetails]);

  const handleSearch = async () => {
    if (!searchTerm) {
      setError("Please enter a patient name.");
      setOperationDetails(null);
      return;
    }

    try {
      setError("");
      const operationsRef = collection(db, "operations");
      const q = query(operationsRef, where("patientName", "==", searchTerm));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No operations found for this patient.");
        setOperationDetails(null);
      } else {
        const operations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOperationDetails(operations[0]); // Assuming one patient, but can handle multiple if needed
      }
    } catch (e) {
      setError("Error fetching operations: " + e.message);
      setOperationDetails(null);
    }
  };

  return (
    <div className="p-6 min-h-screen background_svg flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-blue-800">
        Patient Dashboard
      </h2>

      <div className="flex justify-between items-center mb-8 w-full max-w-lg">
        <input
          type="text"
          placeholder="Enter patient name"
          className="border border-gray-300 rounded-md px-4 py-2 w-60 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-4 px-6 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

      {operationDetails && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="p-6 bg-white/30 rounded-lg shadow-lg backdrop-blur-lg border border-white/50">
            <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center">
              <FaUser className="mr-2" /> Patient Name
            </h3>
            <p className="text-xl font-semibold text-blue-900">
              {operationDetails.patientName}
            </p>
          </div>
          <div className="p-6 bg-white/30 rounded-lg shadow-lg backdrop-blur-lg border border-white/50">
            <h3 className="text-lg font-bold mb-4 text-green-700 flex items-center">
              <FaUserMd className="mr-2" /> Doctor Name
            </h3>
            <p className="text-xl font-semibold text-green-900">
              {operationDetails.doctorName}
            </p>
          </div>
          <div className="p-6 bg-white/30 rounded-lg shadow-lg backdrop-blur-lg border border-white/50">
            <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center">
              <FaCalendarAlt className="mr-2" /> Operation Date
            </h3>
            <p className="text-xl font-semibold text-blue-900">
              {operationDetails.operationDate}
            </p>
            <p className="mt-2 font-semibold text-gray-700">Countdown:</p>
            <p className="text-lg text-red-600">{countdown}</p>
          </div>
          <div className="p-6 bg-white/30 rounded-lg shadow-lg backdrop-blur-lg border border-white/50">
            <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center">
              <FaUser className="mr-2" /> Anesthesiologist Name
            </h3>
            <p className="text-xl font-semibold text-blue-900">
              {operationDetails.anesthesiologistName}
            </p>
          </div>
          <div className="p-6 bg-white/30 rounded-lg shadow-lg backdrop-blur-lg border border-white/50">
            <h3 className="text-lg font-bold mb-4 text-green-700 flex items-center">
              <FaHeartbeat className="mr-2" /> Operation Name
            </h3>
            <p className="text-xl font-semibold text-green-900">
              {operationDetails.operationName}
            </p>
          </div>
          <div className="p-6 bg-white/30 rounded-lg shadow-lg backdrop-blur-lg border border-white/50">
            <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center">
              <FaClock className="mr-2" /> Operation Time
            </h3>
            <p className="text-xl font-semibold text-blue-900">
              {operationDetails.operationTime}
            </p>
          </div>
          <div className="p-6 bg-white/30 rounded-lg shadow-lg backdrop-blur-lg border border-white/50">
            <h3 className="text-lg font-bold mb-4 text-green-700 flex items-center">
              <FaDoorClosed className="mr-2" /> OT Room Number
            </h3>
            <p className="text-xl font-semibold text-green-900">
              {operationDetails.otRoomNumber}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashBoard;
