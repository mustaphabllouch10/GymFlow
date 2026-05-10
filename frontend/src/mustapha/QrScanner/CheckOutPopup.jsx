import { useEffect } from "react";

export default function CheckOutPopup({ member, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    // absolute instead of fixed — centers within the relative parent section
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 rounded-xl"
        onClick={onClose}
        style={{ animation: "fadeIn 0.15s ease" }}
      />

      {/* Card */}
      <div
        className="relative bg-white rounded-xl border border-gray-200 shadow-lg p-8 flex flex-col items-center gap-5 w-[340px]"
        style={{ animation: "slideUp 0.25s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          Checked Out
        </span>

        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xl font-semibold select-none">
          {member?.name ? member.name.charAt(0).toUpperCase() : "?"}
        </div>

        <div className="text-center">
          <p className="text-base font-semibold text-gray-900">
            {member?.name ?? "Member"}
          </p>
          <p className="text-sm text-gray-400 mt-0.5">
            Check-out time:{" "}
            <span className="text-gray-600 font-medium">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </p>
        </div>

        <div className="w-full border-t border-gray-100" />

        <div className="w-full">
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full"
              style={{ animation: "shrink 4s linear forwards" }}
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Closing automatically…</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(12px) scale(0.98) }
          to   { opacity:1; transform:translateY(0)   scale(1) }
        }
        @keyframes shrink  { from { width:100% } to { width:0% } }
      `}</style>
    </div>
  );
}