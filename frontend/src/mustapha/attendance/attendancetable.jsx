export default function AttendanceTable({ attendances }) {
  return (
    <div className="overflow-y-auto max-h-[60vh]">
      <table className="min-w-full">
        <thead className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <tr>
            {["Member", "Date", "Check-in Time", "Check-out Time", "Status"].map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {attendances && attendances.length > 0 ? (
            attendances.map((attendance) => (
              <tr
                key={attendance.id || attendance._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-4 text-sm text-gray-900 font-medium">
                  {attendance.member?.name || "—"}
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">
                  {attendance.check_in_date || "—"}
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">
                  {attendance.check_in_time || "—"}
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">
                  {attendance.check_out_time || "—"}
                </td>
                <td className="px-5 py-4">
                  {attendance.status === "present" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                      Present
                    </span>
                  ) : attendance.status === "absent" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                      Absent
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                      {attendance.status || "—"}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-400 text-sm py-12">
                No attendance records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}