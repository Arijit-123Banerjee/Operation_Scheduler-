import React, { useState } from "react";
import VideoSection from "../../components/VideoSection.jsx";
import AddPatientModal from "./AddPatientModal.jsx";
const UserFeature = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-sky-600 to-sky-400 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            World-Class Operations Spectacular Is Here
          </h1>
          <p className="text-lg mb-8">
            Experience the best medical care with cutting-edge technology and
            world-renowned doctors. Your health is our priority.
          </p>
          <div className="space-x-0 sm:space-x-4 flex flex-col sm:flex-row items-center justify-center">
            <button
              onClick={openModal}
              className="bg-white text-sky-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition mb-4 sm:mb-0"
            >
              Add Patient
            </button>
            <button className="bg-white text-sky-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">
              Book a Room
            </button>
          </div>
        </div>
      </div>
      <VideoSection />
      {isModalOpen && <AddPatientModal closeModal={closeModal} />}
    </>
  );
};

export default UserFeature;
