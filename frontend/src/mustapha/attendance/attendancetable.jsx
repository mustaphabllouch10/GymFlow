import React from "react";

export default function AttendanceTable({ attendances }) {
  return (
    <div className="overflow-y-auto max-h-[55vh]">
      <table className="min-w-full border border-gray-200 rounded-lg text-base w-full">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-in Time</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-out Time</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {attendances && attendances.length > 0 ? (
            attendances.map((attendance) => (
              <tr key={attendance.id || attendance._id} className="hover:bg-gray-50">
                <td className="px-5 py-3">{attendance.member?.name || '—'}</td>
                <td className="px-5 py-3">{attendance.check_in_date || '—'}</td>
                <td className="px-5 py-3">{attendance.check_in_time || '—'}</td>
                <td className="px-5 py-3">{attendance.check_out_time || '—'}</td>
                <td className="px-5 py-3">
              {attendance.status === 'present' ? (
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">Present</span>
                ) : attendance.status === 'absent' ? (
                  <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">Absent</span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{member.status || '—'}</span>
              )}                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-400 py-8">
                No attendance records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
