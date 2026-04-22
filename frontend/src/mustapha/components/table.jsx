

export default function Table({ members, searchTerm }) {
                console.log("Rendering Table with members:", members, "and searchTerm:", searchTerm);


    return(

                <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members && members.length > 0 ? (
                  members.map((member) => (
                    <tr key={member.id || member._id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{member.name || member.fullName || '—'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">{member.phone || '—'}</td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        {member.status === 'Active' ? (
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Active</span>
                        ) : member.status === 'Expired' ? (
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Expired</span>
                        ) : (
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{member.status || '—'}</span>
                        )}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">{member.joined_date || member.createdAt || '—'}</td>
                      <td className="px-5 py-3 whitespace-nowrap flex gap-2">
                        <button className="delete-btn bg-red-50 hover:bg-red-100 p-1.5 rounded transition" title="Delete">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-red-600">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14H6L5 6"/>
                            <path d="M10 11v6"/>
                            <path d="M14 11v6"/>
                            <path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-400 py-8">No members found.</td>
                  </tr>
                )}
              </tbody>
            </table>
        
    )
}