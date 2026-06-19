function getInitials(name = "") {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "?";
}

function StatusBadge({ status }) {
    const styles = {
        present: "bg-green-50 text-green-700",
        absent: "bg-red-50 text-red-600",
    };
    const dots = {
        present: "bg-green-500",
        absent: "bg-red-500",
    };
    const key = ["present", "absent"].includes(status) ? status : null;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium capitalize ${
                key ? styles[key] : "bg-gray-100 text-gray-500"
            }`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${key ? dots[key] : "bg-gray-400"}`} />
            {status || "—"}
        </span>
    );
}

export default function AttendanceTable({ attendances }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-y-auto max-h-[60vh]">
                <table className="min-w-full">
                    <thead className="sticky top-0 bg-gray-50 z-10">
                        <tr>
                            {["Member", "Date", "Check-in Time", "Check-out Time", "Status"].map((h) => (
                                <th
                                    key={h}
                                    className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                        {attendances && attendances.length > 0 ? (
                            attendances.map((attendance) => {
                                const name = attendance.member?.name || "—";
                                return (
                                    <tr
                                        key={attendance.id || attendance._id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 shrink-0 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                                                    {getInitials(name)}
                                                </div>
                                                <span className="font-semibold text-gray-900 text-sm">{name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 font-mono text-sm text-gray-500">
                                            {attendance.check_in_date || "—"}
                                        </td>
                                        <td className="px-5 py-4 font-mono text-sm text-gray-500">
                                            {attendance.check_in_time || "—"}
                                        </td>
                                        <td className="px-5 py-4 font-mono text-sm text-gray-500">
                                            {attendance.check_out_time || "—"}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={attendance.status} />
                                        </td>
                                    </tr>
                                );
                            })
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
        </div>
    );
}