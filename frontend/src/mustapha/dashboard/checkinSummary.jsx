import { useState, useEffect } from "react";
import axios from "axios";
import { FiClock } from "react-icons/fi";

export default function CheckinSummary() {
  const [checkinSummary, setCheckinSummary] = useState([]);

  useEffect(() => {
    const fetchCheckinSummary = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/dashboard/checkin-summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setCheckinSummary(data);
      } catch (error) {
        console.error("Error fetching check-in summary:", error);
      }
    };

    fetchCheckinSummary();
  }, []);

  return (
    <div className="rounded-2xl px-5 py-4 bg-white border border-gray-200 text-gray-900 mt-5">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FiClock className="text-lg text-gray-400" />
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Recent Check-ins
        </span>
      </div>

      <div>
        {checkinSummary.map((checkin) => {
          const initials = checkin.member_name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2);

          const isInside = !checkin.check_out_time;

          return (
            <div
              key={checkin.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                
                {/* Black avatar */}
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                  {initials}
                </div>

                {/* Name */}
                <p className="font-medium text-sm text-gray-900">
                  {checkin.member_name}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2">

                {/* Time */}
                <span className="text-sm text-gray-400">
                  {checkin.check_in_time.slice(0, 5)}
                </span>

                {/* Status */}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isInside
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {isInside ? "In" : "Out"}
                </span>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}