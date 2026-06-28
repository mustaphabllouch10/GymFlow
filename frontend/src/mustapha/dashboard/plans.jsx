import { useState, useEffect } from "react";
import axios from "axios";
import { FiClipboard } from "react-icons/fi";

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/dashboard/plans",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPlans(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-red-500",
  ];

  return (
    <div className="rounded-2xl px-5 py-4 bg-white border border-gray-200 text-gray-900 mt-5">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <FiClipboard className="text-lg text-gray-400" />
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Plans
        </span>
      </div>

      {/* Plans list */}
      <div className="flex flex-col gap-4">
        {plans.map((plan, index) => (
          <div
            key={plan.type}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              
              {/* Colored square */}
              <div
                className={`w-3 h-3 rounded-sm ${
                  colors[index % colors.length]
                }`}
              />

              <span className="text-sm text-gray-700">
                {plan.type}
              </span>
            </div>

            <span className="font-semibold text-gray-900">
              {plan.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}