import React, { useState } from "react";
import {
  FaUser,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaHospital,
} from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Spinner from "../../components/Spinner";

const MyOperation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [operationData, setOperationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    const db = getFirestore();
    const operationsRef = collection(db, "operations");
    const q = query(operationsRef, where("patientName", "==", searchTerm));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setOperationData(doc.data());
      } else {
        console.log("No matching documents.");
        setOperationData(null);
      }
    } catch (error) {
      console.error("Error searching for operation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        My Operation Details
      </h1>
      <p className="text-lg text-gray-600 mb-4 text-center">
        Check your upcoming operation details, doctor info, and hospital
        location.
      </p>

      <p className="text-md text-gray-700 mb-2 text-center font-semibold">
        Please Enter Your Full Name With First Letter Of Each Word Capitalized
      </p>

      <div className="flex justify-center mb-8 max-sm:gap-2">
        <input
          type="text"
          placeholder="e.g. John Doe Smith"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 max-sm:rounded-full"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-5 py-3 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center max-sm:p-3 max-sm:rounded-full max"
        >
          <BiSearch className="inline-block mr-2" />{" "}
          <p className="max-sm:hidden">Search</p>
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8 mb-8 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-2 flex justify-center items-center">
              <Spinner />
            </div>
          ) : operationData ? (
            <>
              <InfoItem
                icon={<FaUser />}
                label="Patient Name"
                value={operationData.patientName}
              />
              <InfoItem
                icon={<FaUserMd />}
                label="Doctor Name"
                value={operationData.doctorName}
              />
              <InfoItem
                icon={<FaHospital />}
                label="Operation Name"
                value={operationData.status}
              />
              <InfoItem
                icon={<FaCalendarAlt />}
                label="Operation Date"
                value={operationData.date}
              />
              <InfoItem
                icon={<FaClock />}
                label="Operation Time"
                value={operationData.time}
              />
              <InfoItem
                icon={<FaHospital />}
                label="OT Room"
                value={operationData.otRoom}
              />
            </>
          ) : (
            <p className="col-span-2 text-center text-gray-500">
              No operation data found. Please search for a patient.
            </p>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Hospital Location
      </h2>
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzAwLjAiTiA3M8KwNTQnMDAuMCJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Hospital Location"
        ></iframe>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-md shadow-sm">
    <div className="text-indigo-500 text-xl">{icon}</div>
    <div>
      <p className="text-sm font-semibold text-gray-700">{label}:</p>
      <p className="text-lg text-gray-900">{value}</p>
    </div>
  </div>
);

export default MyOperation;
