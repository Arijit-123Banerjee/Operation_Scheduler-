import React, { useState, useEffect } from "react";
import { FaUserMd, FaPhone, FaStar, FaPlus } from "react-icons/fa";
import DoctorsAddModal from "./DoctorsAddModal";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebaseConfig";
import Spinner from "../../components/Spinner";

const DoctorCard = ({
  name,
  profession,
  contact,
  rating,
  description,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 mb-4 transition-transform duration-200 hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-2 text-[#0284c7]">{name}</h3>
      <p className="text-gray-600 mb-2">
        <FaUserMd className="inline mr-2" />
        {profession}
      </p>
      <p className="text-gray-600 mb-2">
        <FaPhone className="inline mr-2" />
        {contact}
      </p>
      <div className="flex items-center mb-2">
        <FaStar className="text-yellow-400 mr-1" />
        <span>{rating}</span>
      </div>
      <p className="text-gray-700 w-96 max-sm:w-56">{description}</p>
    </div>
  );
};

const Doctors = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      const doctors = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDoctorsData(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleAddDoctor = async (newDoctor) => {
    setIsLoading(true);
    try {
      let imageUrl = null;
      if (newDoctor.image) {
        const imageRef = ref(storage, `doctor-images/${newDoctor.image.name}`);
        await uploadBytes(imageRef, newDoctor.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const doctorData = {
        ...newDoctor,
        image: imageUrl,
      };

      await addDoc(collection(db, "doctors"), doctorData);
      await fetchDoctors();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding doctor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#0284c7]">Doctors</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0284c7] hover:bg-[#0273a1] text-white font-bold py-2 px-4 rounded flex items-center"
          disabled={isLoading}
        >
          <FaPlus className="mr-2" />
          Add Doctor
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorsData.map((doctor, index) => (
          <DoctorCard key={index} {...doctor} />
        ))}
      </div>
      <DoctorsAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddDoctor={handleAddDoctor}
      />
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div>
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
