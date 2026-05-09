
import { useState } from "react";
import FeatchingAttendence from "./featchingAttendence";
import AttendanceTable from "./attendancetable";

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filters, setFilters] = useState({
    member: "",
    dateFrom: "",
    dateTo: "",
    status: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4">
      {/* Filters UI */}
      <div className="flex flex-wrap gap-4 mb-6 items-end bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-black mb-1">Member Name</label>
          <input
            type="text"
            name="member"
            value={filters.member}
            onChange={handleInputChange}
            placeholder="Search by name"
            className="px-3 py-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-black mb-1">Date From</label>
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-black mb-1">Date To</label>
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-black mb-1">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>
      </div>
      <FeatchingAttendence setAttendanceData={setAttendanceData} filters={filters} />
      <AttendanceTable attendances={attendanceData} />
    </div>
  );
}