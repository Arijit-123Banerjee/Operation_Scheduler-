import React, { useState } from "react";

const OperationModal = ({ isOpen, onClose, onSubmit }) => {
  const [newOperation, setNewOperation] = useState({
    patientName: "",
    date: "",
    time: "",
    status: "Scheduled",
    doctorName: "",
    otRoom: "",
  });

  const handleInputChange = (e) =>
    setNewOperation((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newOperation);
    setNewOperation({
      patientName: "",
      date: "",
      time: "",
      status: "Scheduled",
      doctorName: "",
      otRoom: "",
    });
  };

  const inputField = (name, type, placeholder, required = true) => (
    <input
      type={type}
      name={name}
      value={newOperation[name]}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:border-[#0284c7] transition-all duration-200"
      required={required}
    />
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4 sm:p-0"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-[#0284c7]">
          New Operation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {inputField("patientName", "text", "Patient Name")}
          {inputField("date", "date", "Date")}
          {inputField("time", "time", "Time")}
          <select
            name="status"
            value={newOperation.status}
            onChange={handleInputChange}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:border-[#0284c7] transition-all duration-200"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
          </select>
          {inputField("doctorName", "text", "Doctor Name")}
          {inputField("otRoom", "text", "OT Room")}

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#0284c7] hover:bg-[#0273a1] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperationModal;
