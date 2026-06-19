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
        active: "bg-green-50 text-green-700",
        inactive: "bg-gray-100 text-gray-500",
        expired: "bg-red-50 text-red-700",
    };
    const dots = {
        active: "bg-green-500",
        inactive: "bg-gray-400",
        expired: "bg-red-500",
    };
    const key = ["active", "inactive", "expired"].includes(status) ? status : null;

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

export default function Table({ members, searchTerm, setSelectedMember }) {
    console.log("Rendering Table with members:", members, "and searchTerm:", searchTerm);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-y-auto max-h-[62vh]">
                <table className="min-w-full text-base w-full">

                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 tracking-wide uppercase">Member</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 tracking-wide uppercase">Email</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 tracking-wide uppercase">Phone</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 tracking-wide uppercase">Status</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 tracking-wide uppercase">Join Date</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                        {members && members.length > 0 ? (
                            members.map((member) => {
                                const name = member.name || member.fullName || "—";
                                return (
                                    <tr
                                        key={member.id || member._id}
                                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => setSelectedMember(member)}
                                    >
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 shrink-0 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                                                    {getInitials(name)}
                                                </div>
                                                <span className="font-semibold text-gray-900">{name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 font-mono text-sm text-gray-600">{member.email || "—"}</td>
                                        <td className="px-5 py-3 font-mono text-sm text-gray-600">{member.phone || "—"}</td>
                                        <td className="px-5 py-3">
                                            <StatusBadge status={member.status} />
                                        </td>
                                        <td className="px-5 py-3 font-mono text-sm text-gray-500">{member.joined_date || member.createdAt || "—"}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-400 py-8">
                                    No members found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}