import React, { useState } from "react";
import { Button } from "@/Components/ui/button"; // Update import path as needed

const Modal = ({ isOpen, onClose, onAddOperation, operationsList }) => {
  const [newOperation, setNewOperation] = useState({
    id: "",
    patientName: "",
    operationName: "",
    doctorName: "",
    operationDate: "",
    operationTime: "",
    otRoomNumber: "",
    anesthesiologistName: "",
    nurses: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOperation((prev) => ({ ...prev, [name]: value }));
  };

  const validateOperation = () => {
    // Check if any field is empty
    const emptyFields = Object.values(newOperation).some(
      (value) => value.trim() === ""
    );
    if (emptyFields) {
      setError("All fields must be filled out.");
      return false;
    }

    // Check for conflict
    const conflict = operationsList.some(
      (operation) =>
        operation.operationDate === newOperation.operationDate &&
        operation.operationTime === newOperation.operationTime &&
        operation.doctorName === newOperation.doctorName &&
        operation.otRoomNumber === newOperation.otRoomNumber
    );

    if (conflict) {
      setError(
        "Operation with the same date, time, doctor, and OT room already exists. Please choose another date or OT room."
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validateOperation()) {
      onAddOperation(newOperation);
      setNewOperation({
        id: "",
        patientName: "",
        operationName: "",
        doctorName: "",
        operationDate: "",
        operationTime: "",
        otRoomNumber: "",
        anesthesiologistName: "",
        nurses: "",
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-11/12 sm:w-1/2">
        <h3 className="text-lg font-semibold mb-4">Add New Operation</h3>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            name="id"
            type="text"
            placeholder="ID"
            className="w-full px-4 py-2 border rounded"
            value={newOperation.id}
            onChange={handleChange}
          />
          <input
            name="patientName"
            type="text"
            placeholder="Patient Name"
            className="w-full px-4 py-2 border rounded"
            value={newOperation.patientName}
            onChange={handleChange}
          />
          <input
            name="operationName"
            type="text"
            placeholder="Operation Name"
            className="w-full px-4 py-2 border rounded"
            value={newOperation.operationName}
            onChange={handleChange}
          />
          <input
            name="doctorName"
            type="text"
            placeholder="Doctor Name"
            className="w-full px-4 py-2 border rounded"
            value={newOperation.doctorName}
            onChange={handleChange}
          />
          <input
            name="operationDate"
            type="date"
            placeholder="Operation Date"
            className="w-full px-4 py-2 border rounded"
            value={newOperation.operationDate}
            onChange={handleChange}
          />
          <input
            name="operationTime"
            type="time"
            placeholder="Operation Time"
            className="w-full px-4 py-2 border rounded"
            value={newOperation.operationTime}
            onChange={handleChange}
          />
          <input
            name="otRoomNumber"
            type="text"
            placeholder="OT Room Number"
            className="w-full px-4 py-2 border rounded"
            value={newOperation.otRoomNumber}
            onChange={handleChange}
          />
          <input
            name="anesthesiologistName"
            type="text"
            placeholder="Anesthesiologist Name"
            className="w-full px-4 py-2 border rounded"
            value={newOperation.anesthesiologistName}
            onChange={handleChange}
          />
          <textarea
            name="nurses"
            placeholder="Nurses (comma separated)"
            className="w-full px-4 py-2 border rounded"
            value={newOperation.nurses}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <Button onClick={onClose} className="bg-gray-500">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 text-white">
            Create Operation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
