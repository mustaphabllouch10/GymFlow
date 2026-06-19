import { useState } from "react";
import FetchingAttendence from "./featchingAttendence";
import AttendanceTable from "./attendancetable";

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filters, setFilters] = useState({
    member: "",
    dateFrom: "",
    dateTo: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* Filters card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-wrap gap-4 items-end">

        {/* Member Name */}
        <div className="flex flex-col gap-2 min-w-[180px]">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Member Name
          </label>
          <div className="bg-gray-50 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-gray-900/10 transition-shadow">
            <input
              type="text"
              name="member"
              value={filters.member}
              onChange={handleInputChange}
              placeholder="Search by name"
              className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Date From */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Date From
          </label>
          <div className="bg-gray-50 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-gray-900/10 transition-shadow">
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleInputChange}
              className="w-full bg-transparent font-mono text-sm text-gray-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Date To */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Date To
          </label>
          <div className="bg-gray-50 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-gray-900/10 transition-shadow">
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleInputChange}
              className="w-full bg-transparent font-mono text-sm text-gray-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Status
          </label>
          <div className="bg-gray-50 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-gray-900/10 transition-shadow">
            <select
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              className="bg-transparent text-sm text-gray-900 focus:outline-none pr-1"
            >
              <option value="">All</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <FetchingAttendence setAttendanceData={setAttendanceData} filters={filters} />
      <AttendanceTable attendances={attendanceData} />

    </div>
  );
}