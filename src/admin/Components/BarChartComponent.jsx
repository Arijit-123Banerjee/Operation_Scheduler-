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
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <FaChartBar className="text-xl sm:text-2xl text-indigo-600 mr-2" />
        <h3 className="text-xl sm:text-2xl font-semibold text-indigo-800">
          Statistics Overview
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" tick={{ fill: "#4a5568", fontSize: "12px" }} />
          <YAxis tick={{ fill: "#4a5568", fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f7fafc",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="value" fill="#667eea" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
