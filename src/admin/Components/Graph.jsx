// Graph.js
import React from "react";
import {
  FaUserMd,
  FaUserInjured,
  FaCalendarCheck,
  FaAmbulance,
} from "react-icons/fa";
import StatCard from "./StatCard";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";

const Graph = () => {
  const data = [
    { name: "Total Doctors", value: 50, icon: FaUserMd, color: "#3498db" },
    {
      name: "Total Patients",
      value: 90,
      icon: FaUserInjured,
      color: "#e74c3c",
    },
    {
      name: "Appointments Today",
      value: 25,
      icon: FaCalendarCheck,
      color: "#2ecc71",
    },
    { name: "Emergencies", value: 3, icon: FaAmbulance, color: "#f39c12" },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-indigo-800">
        Welcome Admin
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
        {data.map((item) => (
          <StatCard key={item.name} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-32">
        <BarChartComponent data={data} />
        <PieChartComponent data={data} />
      </div>
    </div>
  );
};

export default Graph;
