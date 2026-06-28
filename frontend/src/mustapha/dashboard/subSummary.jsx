import { useState, useEffect } from "react";
import axios from "axios";
import { FiCalendar } from "react-icons/fi";

export default function SubSummary() {
  const [subSummary, setSubSummary] = useState([]);

  useEffect(() => {
    const fetchSubSummary = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/dashboard/sub-summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setSubSummary(data);
      } catch (error) {
        console.error("Error fetching sub summary:", error);
      }
    };

    fetchSubSummary();
  }, []);

  const getDaysLeft = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);

    const diff = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    if (diff <= 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return `${diff} days`;
  };

  const getBadgeStyle = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);

    const diff = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    if (diff <= 1) {
      return "bg-red-100 text-red-700";
    }

    return "bg-orange-100 text-orange-700";
  };

  return (
    <div className="rounded-2xl px-5 py-4 bg-white border border-gray-200 text-gray-900 mt-5">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FiCalendar className="text-lg text-gray-400" />
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Expiring Subscriptions
        </span>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-3 text-xs font-medium text-gray-400 border-b border-gray-100 pb-2 mb-2">
        <span>Member</span>
        <span>Plan</span>
        <span className="text-right">Expires</span>
      </div>

      {/* Table rows */}
      <div className="space-y-1">
        {subSummary.map((sub) => (
          <div
            key={sub.id}
            className="grid grid-cols-3 items-center py-2 border-b border-gray-100 last:border-0"
          >
            {/* Member */}
            <p className="font-medium text-sm truncate">
              {sub.member_name}
            </p>

            {/* Plan */}
            <p className="text-sm text-gray-600">
              {sub.type}
            </p>

            {/* Expire badge */}
            <div className="flex justify-end">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeStyle(
                  sub.end_date
                )}`}
              >
                {getDaysLeft(sub.end_date)}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}