import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaHospital,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import OperationModal from "./OperationModal";
import Spinner from "../../components/Spinner";
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
import { db } from "../../firebase/firebaseConfig";

const Operation = () => {
  const [operations, setOperations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingOperation, setEditingOperation] = useState(null);

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

  return (
    <div className="operation-scheduler p-8 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-[#0284c7] text-center">
        Operation Scheduler
      </h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="create-operation-btn bg-[#0284c7] hover:bg-[#0273a1] text-white font-bold py-3 px-6 rounded-full mb-8 flex items-center justify-center mx-auto transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
      >
        <FaPlus className="mr-2 sm:inline" />
        <span className="sm:inline hidden">Create New Operation</span>
        <span className="inline sm:hidden">Create</span>
      </button>

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
        <div className="overflow-x-auto bg-white rounded-xl shadow-2xl">
          <table className="operations-table w-full">
            <thead className="bg-[#0284c7] text-white">
              <tr>
                <th className="py-4 px-6 text-left">
                  <MdPerson className="inline mr-2" /> Patient Name
                </th>
                <th className="py-4 px-6 text-left">
                  <FaCalendarAlt className="inline mr-2" /> Date
                </th>
                <th className="py-4 px-6 text-left">
                  <FaClock className="inline mr-2" /> Time
                </th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left">
                  <FaUserMd className="inline mr-2" /> Doctor Name
                </th>
                <th className="py-4 px-6 text-left">
                  <FaHospital className="inline mr-2" /> OT Room
                </th>
                <th className="py-4 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {operations.map((op) => (
                <tr
                  key={op.id}
                  className="border-b border-gray-200 hover:bg-[#e0f2fe] transition duration-150 ease-in-out"
                >
                  <td className="py-4 px-6 font-medium">{op.patientName}</td>
                  <td className="py-4 px-6">{op.date}</td>
                  <td className="py-4 px-6">{op.time}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        op.status === "Scheduled"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {op.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">{op.doctorName}</td>
                  <td className="py-4 px-6">{op.otRoom}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleEdit(op)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(op.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Operation;
