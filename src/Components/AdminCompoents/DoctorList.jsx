import React from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. John Smith",
    image:
      "https://images.unsplash.com/photo-1590098719884-1e4aa144dfb5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    status: "Present",
    contact: "+1 123 456 7890",
  },
  {
    id: 2,
    name: "Dr. Emily Davis",
    image:
      "https://images.unsplash.com/photo-1527363121637-1a622f5aab32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.2,
    status: "Absent",
    contact: "+1 987 654 3210",
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    image:
      "https://images.unsplash.com/photo-1507120410846-1f342e6e6f38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    status: "Present",
    contact: "+1 555 666 7777",
  },
  // Add more doctors as needed
];

const DoctorList = () => {
  const handleAddDoctor = () => {
    // Logic to add a new doctor would go here
    console.log("Add Doctor button clicked!");
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Doctors List</h2>
        <button
          onClick={handleAddDoctor}
          className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-green-700"
        >
          Add Doctor
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-3 py-3 sm:px-5 sm:py-4">Photo</th>
                <th className="px-3 py-3 sm:px-5 sm:py-4">Name</th>
                <th className="px-3 py-3 sm:px-5 sm:py-4">Rating</th>
                <th className="px-3 py-3 sm:px-5 sm:py-4">Status</th>
                <th className="px-3 py-3 sm:px-5 sm:py-4">Contact</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {doctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="px-3 py-4 sm:px-5 sm:py-5">
                    <img
                      src={doctor.image}
                      alt={`${doctor.name}`}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-3 py-4 sm:px-5 sm:py-5">
                    <p className="font-semibold">{doctor.name}</p>
                  </td>
                  <td className="px-3 py-4 sm:px-5 sm:py-5">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          fill={
                            index < Math.round(doctor.rating)
                              ? "currentColor"
                              : "none"
                          }
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className={`h-5 w-5 ${
                            index < Math.round(doctor.rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.02 6.195a1 1 0 00.95.69h6.518c.958 0 1.356 1.224.588 1.81l-5.28 3.834a1 1 0 00-.364 1.118l2.02 6.195c.3.921-.755 1.688-1.538 1.118l-5.28-3.834a1 1 0 00-1.175 0l-5.28 3.834c-.783.57-1.838-.197-1.538-1.118l2.02-6.195a1 1 0 00-.364-1.118L2.492 11.62c-.768-.586-.37-1.81.588-1.81h6.518a1 1 0 00.95-.69l2.02-6.195z"
                          />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm">
                        {doctor.rating} stars
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-4 sm:px-5 sm:py-5">
                    <span
                      className={`font-medium ${
                        doctor.status === "Present"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 sm:px-5 sm:py-5">
                    <p>{doctor.contact}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
