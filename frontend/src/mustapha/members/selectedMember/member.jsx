

export default function Member({ member, setSelectedMember }) {
    return(
        <div>
            <button onClick={() => setSelectedMember(null)}>back</button>
            <h2>Selected Member</h2>
            {member && (
                <div>
                    <p><strong>Name:</strong> {member.name || member.fullName || '—'}</p>
                    <p><strong>Email:</strong> {member.email || '—'}</p>
                    <p><strong>Phone:</strong> {member.phone || '—'}</p>
                    <p><strong>Status:</strong> {member.status || '—'}</p>
                    <p><strong>Join Date:</strong> {member.joinDate || '—'}</p>
                </div>
            )}
        </div>
    );
}