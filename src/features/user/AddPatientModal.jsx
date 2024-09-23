import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";

const AddPatientModal = ({ closeModal }) => {
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("male");
  const [patientDob, setPatientDob] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const patientData = {
      name: patientName,
      age: patientAge,
      gender: patientGender,
      dob: patientDob,
    };

    try {
      await addDoc(collection(db, "patients"), patientData);
      alert("Patient added successfully!");
      closeModal(); // Close modal after submission
    } catch (error) {
      console.error("Error adding patient: ", error);
      alert("Error adding patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#0284c7]">
          Add Patient
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="patientName"
              className="block text-sm font-medium text-gray-700"
            >
              Patient Name:
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="border rounded w-full p-2 mt-1 focus:ring-2 focus:ring-[#0284c7] focus:border-[#0284c7]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="patientAge"
              className="block text-sm font-medium text-gray-700"
            >
              Patient Age:
            </label>
            <input
              type="number"
              id="patientAge"
              name="patientAge"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              className="border rounded w-full p-2 mt-1 focus:ring-2 focus:ring-[#0284c7] focus:border-[#0284c7]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="patientGender"
              className="block text-sm font-medium text-gray-700"
            >
              Patient Gender:
            </label>
            <select
              id="patientGender"
              name="patientGender"
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              className="border rounded w-full p-2 mt-1 focus:ring-2 focus:ring-[#0284c7] focus:border-[#0284c7]"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="patientDob"
              className="block text-sm font-medium text-gray-700"
            >
              Patient Date of Birth:
            </label>
            <input
              type="date"
              id="patientDob"
              name="patientDob"
              value={patientDob}
              onChange={(e) => setPatientDob(e.target.value)}
              className="border rounded w-full p-2 mt-1 focus:ring-2 focus:ring-[#0284c7] focus:border-[#0284c7]"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-[#0284c7] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#0273a1] transition flex items-center"
              disabled={loading}
            >
              {loading && <FaSpinner className="animate-spin mr-2" />}
              Save Patient
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="text-red-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
