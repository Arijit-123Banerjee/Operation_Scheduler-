// PieChartComponent.js
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChartPie } from "react-icons/fa";

const PieChartComponent = ({ data }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <FaChartPie className="text-xl sm:text-2xl text-indigo-600 mr-2" />
        <h3 className="text-xl sm:text-2xl font-semibold text-indigo-800">
          Distribution
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#f7fafc",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
