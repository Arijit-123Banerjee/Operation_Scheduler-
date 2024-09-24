import React, { useState } from "react";
import useAmbulanceStore from "../../zustand/useAmbulanceStore";
import { FaAmbulance, FaDollarSign, FaList, FaPhoneAlt } from "react-icons/fa";

const BookAmbulance = () => {
  const { ambulances, bookAmbulance } = useAmbulanceStore();
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  console.log(ambulances);

  const handleBookNow = (ambulance) => {
    bookAmbulance(ambulance.id);
    setSelectedAmbulance(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Book Ambulance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ambulances.map((ambulance) => (
          <div
            key={ambulance.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={ambulance.image}
              alt={ambulance.id}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center mb-2">
                <FaDollarSign className="text-green-500 mr-2" />
                <p className="font-semibold">Price: ${ambulance.price}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaAmbulance className="text-red-500 mr-2" />
                <p>Status: {ambulance.isBooked ? "Booked" : "Available"}</p>
              </div>
              <div className="flex items-center mb-4">
                <FaPhoneAlt className="text-gray-500 mr-2" />
                <p>Contact: {ambulance.contactNumber}</p>
              </div>
              <button
                onClick={() => handleBookNow(ambulance)}
                disabled={ambulance.isBooked}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                  ambulance.isBooked
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {ambulance.isBooked ? "Already Booked" : "Book Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookAmbulance;
