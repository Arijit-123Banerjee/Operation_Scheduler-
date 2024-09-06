import { FaUserMd, FaUser, FaExclamationTriangle } from "react-icons/fa";
import OperationList from "./OperationList";
import DoctorList from "./DoctorList";

const Card = () => {
  return (
    <div>
      <div className="m-10 grid gap-5 sm:grid-cols-3 mx-auto max-w-screen-lg">
        {/* Doctors Count Card */}
        <div className="px-6 py-8 bg-white shadow-lg rounded-lg flex items-center space-x-4">
          <div className="p-4 bg-blue-500 text-white rounded-full shadow-md">
            <FaUserMd className="h-10 w-10" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Doctors Count</p>
            <p className="text-xl font-semibold">150</p>
          </div>
        </div>

        {/* Patient Count Card */}
        <div className="px-6 py-8 bg-white shadow-lg rounded-lg flex items-center space-x-4">
          <div className="p-4 bg-green-500 text-white rounded-full shadow-md">
            <FaUser className="h-10 w-10" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Patient Count</p>
            <p className="text-xl font-semibold">1.2k</p>
          </div>
        </div>

        {/* Emergencies Card */}
        <div className="px-6 py-8 bg-white shadow-lg rounded-lg flex items-center space-x-4">
          <div className="p-4 bg-red-500 text-white rounded-full shadow-md">
            <FaExclamationTriangle className="h-10 w-10" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Emergencies</p>
            <p className="text-xl font-semibold">8</p>
          </div>
        </div>
      </div>
      <div className="h-[60vh] overflow-hidden">
        <OperationList />
      </div>
      <DoctorList />
    </div>
  );
};

export default Card;
