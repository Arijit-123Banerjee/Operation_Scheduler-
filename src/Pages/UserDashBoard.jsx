import React, { useState, useEffect } from "react";
import { db, collection, query, where, getDocs } from "@/Firebase";
import { formatDistanceToNow, parseISO } from "date-fns";

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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">
        Patient Dashboard
      </h2>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Enter patient name"
          className="border border-gray-300 rounded-md px-4 py-2 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-blue-700">
              Patient Name
            </h3>
            <p className="text-xl font-semibold text-blue-900">
              {operationDetails.patientName}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-green-700">
              Doctor Name
            </h3>
            <p className="text-xl font-semibold text-green-900">
              {operationDetails.doctorName}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-blue-700">
              Operation Date
            </h3>
            <p className="text-xl font-semibold text-blue-900">
              {operationDetails.operationDate}
            </p>
            <p className="mt-2 font-semibold text-gray-700">Countdown:</p>
            <p className="text-lg text-red-600">{countdown}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-blue-700">
              Anesthesiologist Name
            </h3>
            <p className="text-xl font-semibold text-blue-900">
              {operationDetails.anesthesiologistName}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-green-700">
              Operation Name
            </h3>
            <p className="text-xl font-semibold text-green-900">
              {operationDetails.operationName}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-blue-700">
              Operation Time
            </h3>
            <p className="text-xl font-semibold text-blue-900">
              {operationDetails.operationTime}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-green-700">
              OT Room Number
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
