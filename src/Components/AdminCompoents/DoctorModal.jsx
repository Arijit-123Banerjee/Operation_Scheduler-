// DoctorModal.js
import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button"; // Adjust the import path as needed

const DoctorModal = ({ isOpen, onClose, onSave, doctor }) => {
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    rating: "",
    status: "Present",
    contact: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (doctor) {
      setNewDoctor({
        name: doctor.name || "",
        rating: doctor.rating || "",
        status: doctor.status || "Present",
        contact: doctor.contact || "",
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const validateDoctor = () => {
    // Check if any field is empty
    const emptyFields = Object.values(newDoctor).some(
      (value) => value.trim() === ""
    );
    if (emptyFields) {
      setError("All fields must be filled out.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validateDoctor()) {
      onSave(newDoctor);
      setNewDoctor({
        name: "",
        rating: "",
        status: "Present",
        contact: "",
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-11/12 sm:w-1/2">
        <h3 className="text-lg font-semibold mb-4">
          {doctor ? "Edit Doctor" : "Add New Doctor"}
        </h3>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Doctor Name"
            className="w-full px-4 py-2 border rounded"
            value={newDoctor.name}
            onChange={handleChange}
          />
          <input
            name="rating"
            type="number"
            step="0.1"
            max="5"
            placeholder="Rating (0.0 - 5.0)"
            className="w-full px-4 py-2 border rounded"
            value={newDoctor.rating}
            onChange={handleChange}
          />
          <select
            name="status"
            className="w-full px-4 py-2 border rounded"
            value={newDoctor.status}
            onChange={handleChange}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <input
            name="contact"
            type="text"
            placeholder="Contact Number"
            className="w-full px-4 py-2 border rounded"
            value={newDoctor.contact}
            onChange={handleChange}
          />
        </div>
        <div className="mt-6 flex gap-4">
          <Button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {doctor ? "Save Changes" : "Add Doctor"}
          </Button>
          <Button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;
