

export default function Table({ members, searchTerm }) {
                console.log("Rendering Table with members:", members, "and searchTerm:", searchTerm);


    return (
        <div className="overflow-y-auto max-h-[62vh]">
  <table className="min-w-full border border-gray-200 rounded-lg text-base w-full">
    
    <thead className="bg-gray-50 sticky top-0 z-10">
      <tr>
        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
      </tr>
    </thead>

    <tbody className="bg-white divide-y divide-gray-200">
      {members && members.length > 0 ? (
        members.map((member) => (
          <tr key={member.id || member._id} className="hover:bg-gray-50">
            <td className="px-5 py-3">{member.name || member.fullName || '—'}</td>
            <td className="px-5 py-3">{member.email || '—'}</td>
            <td className="px-5 py-3">{member.phone || '—'}</td>
            <td className="px-5 py-3">
              {member.status === 'Active' ? (
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">Active</span>
              ) : member.status === 'Expired' ? (
                <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">Expired</span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{member.status || '—'}</span>
              )}
            </td>
            <td className="px-5 py-3">{member.joined_date || member.createdAt || '—'}</td>
          </tr>
        ))
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
    );
}