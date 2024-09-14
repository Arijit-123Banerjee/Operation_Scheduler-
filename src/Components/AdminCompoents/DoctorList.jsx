// DoctorList.js
import React, { useState, useEffect } from "react";
import DoctorModal from "./DoctorModal";
import { db, collection, addDoc, getDocs } from "@/Firebase"; // Adjust the import path as needed

const DoctorList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [error, setError] = useState("");

  // Fetch doctors from Firestore on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "doctors"));
        const doctors = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctorList(doctors);
      } catch (err) {
        setError("Error fetching doctors: " + err.message);
      }
    };

    fetchDoctors();
  }, []);

  // Handle adding a new doctor
  const handleAddDoctor = async (newDoctor) => {
    try {
      // Add new doctor to Firestore
      await addDoc(collection(db, "doctors"), newDoctor);

      // Fetch updated list of doctors
      const querySnapshot = await getDocs(collection(db, "doctors"));
      const doctors = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update local state
      setDoctorList(doctors);
      setIsModalOpen(false);
    } catch (error) {
      setError("Error adding doctor: " + error.message);
    }
  };

  const openAddModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Doctors List</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-green-700"
        >
          Add Doctor
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-3 py-3 sm:px-5 sm:py-4">Name</th>
                <th className="px-3 py-3 sm:px-5 sm:py-4">Rating</th>
                <th className="px-3 py-3 sm:px-5 sm:py-4">Status</th>
                <th className="px-3 py-3 sm:px-5 sm:py-4">Contact</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {doctorList.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="px-3 py-4 sm:px-5 sm:py-5">
                    <p>{doctor.name}</p>
                  </td>
                  <td className="px-3 py-4 sm:px-5 sm:py-5">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          fill={
                            index < Math.round(doctor.rating)
                              ? "currentColor"
                              : "none"
                          }
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className={`h-5 w-5 ${
                            index < Math.round(doctor.rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.02 6.195a1 1 0 00.95.69h6.518c.958 0 1.356 1.224.588 1.81l-5.28 3.834a1 1 0 00-.364 1.118l2.02 6.195c.3.921-.755 1.688-1.538 1.118l-5.28-3.834a1 1 0 00-1.175 0l-5.28 3.834c-.783.57-1.838-.197-1.538-1.118l2.02-6.195a1 1 0 00-.364-1.118L2.492 11.62c-.768-.586-.37-1.81.588-1.81h6.518a1 1 0 00.95-.69l2.02-6.195z"
                          />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm">
                        {doctor.rating} stars
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-4 sm:px-5 sm:py-5">
                    <span
                      className={`font-medium ${
                        doctor.status === "Present"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 sm:px-5 sm:py-5">
                    <p>{doctor.contact}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Modal */}
      <DoctorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDoctor}
      />
    </div>
  );
};

export default DoctorList;
