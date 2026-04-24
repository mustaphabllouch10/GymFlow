
export default function AddMember({ onClick }) {
    return (
        <button
            className="flex items-center gap-2 px-4 py-2 mr-12 mt-4 mb-0 rounded-lg bg-[#111111] text-white font-semibold shadow hover:bg-[#23272f] transition-colors duration-150 "
            onClick={onClick}
        >
            <span>Add Member</span>
        </button>
    );
}
