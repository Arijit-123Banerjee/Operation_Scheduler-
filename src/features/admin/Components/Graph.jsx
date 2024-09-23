import {
  FaUserMd,
  FaUserInjured,
  FaCalendarCheck,
  FaAmbulance,
} from "react-icons/fa";

import StatCard from "./StatCard";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import useGraphStore from "../../../zustand/useGraphStore";

const iconMap = {
  FaUserMd: FaUserMd,
  FaUserInjured: FaUserInjured,
  FaCalendarCheck: FaCalendarCheck,
  FaAmbulance: FaAmbulance,
};

const Graph = () => {
  const { data } = useGraphStore();

  return (
    <div className="bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] p-4 sm:p-6 md:p-8 rounded-lg shadow-xl ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 md:mb-8 text-[#0284c7]">
        Welcome Admin
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
        {data.map((item) => (
          <StatCard key={item.name} {...item} icon={iconMap[item.icon]} />
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
