import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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

import { useNavigate } from "react-router-dom";

export default function Table({ members, searchTerm, isLoading }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-y-auto max-h-[62vh]">
                <table className="min-w-full text-base w-full">

                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th className="px-5 py-3">Member</th>
                            <th className="px-5 py-3">Email</th>
                            <th className="px-5 py-3">Phone</th>
                            <th className="px-5 py-3">Status</th>
                            <th className="px-5 py-3">Join Date</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="px-5 py-16">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-gray-400" />
                                        <p className="text-sm text-gray-400">Loading members...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            members?.map((member) => {
                            const name = member.name || "—";

                            return (
                                <tr
                                    key={member.id}
                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => {
                                        navigate(`/members/${member.id}`, {
                                            state: { member, members },
                                        });
                                    }}
                                >
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                                                {getInitials(name)}
                                            </div>
                                            <span>{name}</span>
                                        </div>
                                    </td>

                                    <td className="px-5 py-3">
                                        {member.email || "—"}
                                    </td>

                                    <td className="px-5 py-3">
                                        {member.phone || "—"}
                                    </td>

                                    <td className="px-5 py-3">
                                        <StatusBadge status={member.status} />
                                    </td>

                                    <td className="px-5 py-3">
                                        {member.joined_date || "—"}
                                    </td>
                                </tr>
                            );
                        })
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
