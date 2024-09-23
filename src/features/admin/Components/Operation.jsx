import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaHospital,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import { MdPerson } from "react-icons/md";
import OperationModal from "./OperationModal";
import Spinner from "../../../components/Spinner";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const Operation = () => {
  const [operations, setOperations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingOperation, setEditingOperation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOperations();
  }, []);

  const fetchOperations = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "operations"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedOperations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOperations(fetchedOperations);
    } catch (error) {
      console.error("Error fetching operations: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewOperationSubmit = async (newOperation) => {
    setIsLoading(true);
    try {
      if (editingOperation) {
        await updateDoc(
          doc(db, "operations", editingOperation.id),
          newOperation
        );
      } else {
        await addDoc(collection(db, "operations"), newOperation);
      }
      setIsModalOpen(false);
      setEditingOperation(null);
      await fetchOperations();
    } catch (error) {
      console.error("Error adding/updating operation: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this operation?")) {
      setIsLoading(true);
      try {
        await deleteDoc(doc(db, "operations", id));
        await fetchOperations();
      } catch (error) {
        console.error("Error deleting operation: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (operation) => {
    setEditingOperation(operation);
    setIsModalOpen(true);
  };

  const filteredOperations = operations.filter((op) =>
    op.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="operation-scheduler p-4 sm:p-8 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-[#0284c7] text-center">
        Operation Scheduler
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="create-operation-btn bg-gradient-to-r from-[#0284c7] to-[#0273a1] hover:from-[#0273a1] hover:to-[#02608b] text-white font-bold py-3 px-6 rounded-full mb-4 sm:mb-0 flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          <FaPlus className="mr-2" />
          <span>Create New Operation</span>
        </button>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by patient name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0284c7] transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <OperationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOperation(null);
        }}
        onSubmit={handleNewOperationSubmit}
        operation={editingOperation}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOperations.map((op) => (
            <div
              key={op.id}
              className="bg-gradient-to-r from-white to-[#f0f9ff] rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-xl text-gray-800 flex items-center">
                  <MdPerson className="mr-2 text-[#0284c7] text-2xl" />
                  {op.patientName}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    op.status === "Scheduled"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {op.status}
                </span>
              </div>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-[#0284c7]" />
                  <span className="font-medium">Date:</span> {op.date}
                </p>
                <p className="flex items-center">
                  <FaClock className="mr-2 text-[#0284c7]" />
                  <span className="font-medium">Time:</span> {op.time}
                </p>
                <p className="flex items-center">
                  <FaUserMd className="mr-2 text-[#0284c7]" />
                  <span className="font-medium">Doctor:</span> {op.doctorName}
                </p>
                <p className="flex items-center">
                  <FaHospital className="mr-2 text-[#0284c7]" />
                  <span className="font-medium">OT Room:</span> {op.otRoom}
                </p>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(op)}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <FaEdit className="text-xl" />
                </button>
                <button
                  onClick={() => handleDelete(op.id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Operation;
