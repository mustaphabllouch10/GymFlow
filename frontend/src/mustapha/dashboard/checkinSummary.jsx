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
    <div className="rounded-2xl px-5 py-4 bg-white border border-gray-200 text-gray-900">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <FiClock className="text-lg text-gray-400" />
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Last Five Check-ins
        </span>
      </div>

      {/* Check-ins list */}
      <div className="flex flex-col gap-4">
        {checkinSummary.map((checkin) => (
          <div
            key={checkin.id}
            className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {checkin.member_name}
              </p>

              <p className="text-xs text-gray-400">
                In:{" "}
                {new Date(checkin.check_in_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400">
                Out:
              </p>

              <p className="text-sm text-gray-700">
                {checkin.check_out_time
                  ? new Date(
                      checkin.check_out_time
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Still inside"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}