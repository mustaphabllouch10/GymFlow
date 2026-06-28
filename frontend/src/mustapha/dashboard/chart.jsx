import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiTrendingUp } from "react-icons/fi";

export default function Chart() {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/dashboard/chart",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setChart(data);
      } catch (error) {
        console.error("Error fetching chart:", error);
      }
    };

    fetchChart();
  }, []);

  return (
    <div className=" rounded-2xl px-5 py-4 bg-white border border-gray-200 text-gray-900 mt-5">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <FiTrendingUp className="text-lg text-gray-400" />
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Attendance Trend
        </span>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chart}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e5e5"
            />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={4}
            />

            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={28}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="count"
              name="Check-ins"
              stroke="#2a78d6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}