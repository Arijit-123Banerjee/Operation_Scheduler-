// BarChartComponent.js
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChartBar } from "react-icons/fa";

const BarChartComponent = ({ data }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg  ">
      <div className="flex items-center mb-4">
        <FaChartBar className="text-xl sm:text-2xl text-[#0284c7] mr-2" />
        <h3 className="text-xl sm:text-2xl font-semibold text-[#0284c7]">
          Statistics Overview
        </h3>
      </div>
      <div>
        {" "}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#4a5568", fontSize: "12px" }}
            />
            <YAxis tick={{ fill: "#4a5568", fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f0f9ff",
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#0284c7",
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", color: "#0284c7" }}
            />
            <Bar dataKey="value" fill="#0284c7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;
