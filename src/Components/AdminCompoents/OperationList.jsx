import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Adjust the import path as needed
import { db, collection, addDoc, query, getDocs } from "@/Firebase";

const OperationList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [operationsList, setOperationsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const operationsPerPage = 5;

  useEffect(() => {
    const fetchOperations = async () => {
      const q = query(collection(db, "operations"));
      const querySnapshot = await getDocs(q);
      const operations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOperationsList(operations);
    };

    fetchOperations();
  }, []);

  const handleAddOperation = async (newOperation) => {
    try {
      const docRef = await addDoc(collection(db, "operations"), newOperation);
      setOperationsList((prev) => [
        ...prev,
        { id: docRef.id, ...newOperation },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Filter operations based on the search term
  const filteredOperations = operationsList.filter((operation) =>
    Object.values(operation).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate the operations to be displayed on the current page
  const startIndex = currentPage * operationsPerPage;
  const endIndex = startIndex + operationsPerPage;
  const currentOperations = filteredOperations.slice(startIndex, endIndex);

  // Determine if there are more pages
  const hasNextPage = endIndex < filteredOperations.length;
  const hasPrevPage = currentPage > 0;

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">Operations</h2>
          <span className="text-xs text-gray-500">
            View details of performed operations
          </span>
        </div>
        <div className="mt-4 flex w-full flex-wrap items-center gap-4 sm:mt-0 sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm bg-white bg-opacity-30 backdrop-blur-md shadow-lg sm:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-green-700"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Operation
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border bg-white bg-opacity-30 backdrop-blur-md shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-3 py-2 sm:px-5 sm:py-3">ID</th>
                <th className="px-3 py-2 sm:px-5 sm:py-3">Patient Name</th>
                <th className="px-3 py-2 sm:px-5 sm:py-3">Operation Name</th>
                <th className="px-3 py-2 sm:px-5 sm:py-3">Doctor Name</th>
                <th className="px-3 py-2 sm:px-5 sm:py-3">Operation Date</th>
                <th className="px-3 py-2 sm:px-5 sm:py-3">Operation Time</th>
                <th className="px-3 py-2 sm:px-5 sm:py-3">OT Room Number</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {currentOperations.length > 0 ? (
                currentOperations.map((operation) => (
                  <tr key={operation.id}>
                    <td className="border-b border-gray-200 bg-white px-3 py-3 text-xs sm:px-5 sm:py-5 sm:text-sm">
                      <p className="whitespace-no-wrap">{operation.id}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-3 py-3 text-xs sm:px-5 sm:py-5 sm:text-sm">
                      <p className="whitespace-no-wrap">
                        {operation.patientName}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-3 py-3 text-xs sm:px-5 sm:py-5 sm:text-sm">
                      <p className="whitespace-no-wrap">
                        {operation.operationName}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-3 py-3 text-xs sm:px-5 sm:py-5 sm:text-sm">
                      <p className="whitespace-no-wrap">
                        {operation.doctorName}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-3 py-3 text-xs sm:px-5 sm:py-5 sm:text-sm">
                      <p className="whitespace-no-wrap">
                        {operation.operationDate}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-3 py-3 text-xs sm:px-5 sm:py-5 sm:text-sm">
                      <p className="whitespace-no-wrap">
                        {operation.operationTime}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-3 py-3 text-xs sm:px-5 sm:py-5 sm:text-sm">
                      <p className="whitespace-no-wrap">
                        {operation.otRoomNumber}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="border-b border-gray-200 bg-white px-3 py-3 text-center text-xs text-red-600 sm:px-5 sm:py-5 sm:text-sm"
                  >
                    No more operations
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center border-t bg-white bg-opacity-30 backdrop-blur-md shadow-lg px-5 py-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm">
            Showing {startIndex + 1} to {currentOperations.length + startIndex}{" "}
            of {filteredOperations.length} Entries
          </span>
          <div className="mt-2 inline-flex sm:mt-0">
            <button
              className={`mr-2 h-8 w-8 rounded-full border text-xs font-semibold text-gray-600 transition duration-150 hover:bg-gray-100 sm:h-12 sm:w-12 sm:text-sm ${
                hasPrevPage ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => hasPrevPage && setCurrentPage(currentPage - 1)}
              disabled={!hasPrevPage}
            >
              Prev
            </button>
            <button
              className={`h-8 w-8 rounded-full border text-xs font-semibold text-gray-600 transition duration-150 hover:bg-gray-100 sm:h-12 sm:w-12 sm:text-sm ${
                hasNextPage ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => hasNextPage && setCurrentPage(currentPage + 1)}
              disabled={!hasNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddOperation={handleAddOperation}
        operationsList={operationsList} // Pass the list of operations
      />
    </div>
  );
};

export default OperationList;
