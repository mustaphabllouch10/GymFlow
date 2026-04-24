

export default function Table({ members, searchTerm }) {
                console.log("Rendering Table with members:", members, "and searchTerm:", searchTerm);


    return (
        <div className="relative">
            <table className="min-w-full border border-gray-200 rounded-lg text-base">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    </tr>
                </thead>
            </table>
            <div className="overflow-y-auto" style={{ maxHeight: '62vh' }}>
                <table className="min-w-full border border-t-0 border-gray-200 rounded-b-lg text-base">
                    <tbody className="bg-white divide-y divide-gray-200">
                        {members && members.length > 0 ? (
                            members.map((member) => (
                                <tr key={member.id || member._id} className="hover:bg-gray-50">
                                    <td className="px-5 py-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className="font-semibold text-black">{member.name || member.fullName || '—'}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap text-gray-500">{member.email || '—'}</td>
                                    <td className="px-5 py-3 whitespace-nowrap text-gray-500">{member.phone || '—'}</td>
                                    <td className="px-5 py-3 whitespace-nowrap">
                                        {member.status === 'Active' ? (
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Active</span>
                                        ) : member.status === 'Expired' ? (
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Expired</span>
                                        ) : (
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{member.status || '—'}</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap text-gray-500">{member.joined_date || member.createdAt || '—'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                    <td colSpan="5" className="text-center text-gray-400 py-8">No members found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}