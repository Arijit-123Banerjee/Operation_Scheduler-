import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const DoctorsAddModal = ({ isOpen, onClose, onAddDoctor }) => {
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    profession: "",
    contact: "",
    rating: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDoctor({ ...newDoctor, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDoctor(newDoctor);
    setNewDoctor({
      name: "",
      profession: "",
      contact: "",
      rating: "",
      description: "",
      image: null,
    });
    onClose();
  };

  const inputField = (name, type, placeholder, required = true) => (
    <input
      type={type}
      name={name}
      value={newDoctor[name]}
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0284c7]">
            Add New Doctor
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {inputField("name", "text", "Doctor's Name")}
          {inputField("profession", "text", "Profession")}
          {inputField("contact", "text", "Contact")}
          {inputField("rating", "number", "Rating (0-5)", false)}
          <textarea
            name="description"
            value={newDoctor.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:border-[#0284c7] transition-all duration-200"
            rows="3"
            required
          ></textarea>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Doctor's Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e0f2fe] file:text-[#0284c7] hover:file:bg-[#f0f9ff]"
              required
            />
          </div>
          {newDoctor.image && (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(newDoctor.image)}
                alt="Selected"
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          )}

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
              className="w-full sm:w-auto bg-[#0284c7] hover:bg-[#0272a3] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorsAddModal;
