import { useState } from "react";
import GenerateQr from "./gererateMemberQrCode";

export default function Member({ member, setSelectedMember }) {
  const [showQr, setShowQr] = useState(false);

  const initials = (member?.name || member?.fullName || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isActive = member?.status?.toLowerCase() === "active";

  const handleDownloadQr = () => {
    const canvas = document.querySelector("#qr-popup canvas");
    const svg = document.querySelector("#qr-popup svg");

    if (canvas) {
      const link = document.createElement("a");
      link.download = `${member?.name || "member"}-qr.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } else if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.download = `${member?.name || "member"}-qr.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    // This wrapper should be placed inside your main content area (after the sidebar),
    // NOT wrapping the entire page including sidebar/topbar
    <div className="relative flex items-start justify-center pt-6 p-6 bg-gray-100 min-h-full">

      <div className="bg-white rounded-2xl w-full max-w-lg shadow-sm border border-gray-100">

        {/* Header */}
        <div className="flex items-center gap-4 px-8 py-4 border-b border-gray-100">
          <button
            onClick={() => setSelectedMember(null)}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            ← Back
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Member Profile</h2>
        </div>

        <div className="px-8 py-5">
          {/* Identity */}
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white text-xl font-semibold shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {member?.name || member?.fullName || "—"}
              </p>
              <span className={`inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full text-xs font-medium ${isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-400"}`} />
                {member?.status || "—"}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="col-span-2 bg-gray-50 rounded-xl px-4 py-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Email</p>
              <p className="text-sm font-medium text-gray-800 font-mono">{member?.email || "—"}</p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Phone</p>
              <p className="text-sm font-medium text-gray-800 font-mono">{member?.phone || "—"}</p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Join Date</p>
              <p className="text-sm font-medium text-gray-800 font-mono">{member?.joined_date || "—"}</p>
            </div>
          </div>

          <hr className="border-gray-100 mb-5" />

          {/* QR Trigger */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Member QR Code</p>
            <button
              onClick={() => setShowQr(true)}
              className="w-full py-3.5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-sm font-medium text-gray-500 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3"/>
                <rect x="18" y="14" width="3" height="3"/><rect x="14" y="18" width="3" height="3"/>
                <rect x="18" y="18" width="3" height="3"/>
              </svg>
              View QR Code
            </button>
          </div>
        </div>
      </div>

      {/* QR Modal — scoped to content area only via absolute positioning */}
      {showQr && (
        <div
          className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-4 rounded-none"
          onClick={(e) => e.target === e.currentTarget && setShowQr(false)}
        >
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] w-full max-w-xs p-6 flex flex-col items-center gap-4">

            {/* Modal Header */}
            <div className="w-full flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Member QR Code</h3>
                <p className="text-xs text-gray-400 mt-0.5">{member?.name || member?.fullName}</p>
              </div>
              <button
                onClick={() => setShowQr(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all text-sm"
              >
                ✕
              </button>
            </div>

            {/* QR Code */}
            <div id="qr-popup" className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-center">
              <GenerateQr id={member.id} />
            </div>

            <p className="text-xs text-gray-400 font-mono tracking-wider">ID · {member?.id}</p>

            {/* Actions */}
            <div className="flex gap-2 w-full">
              <button
                onClick={() => setShowQr(false)}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
              >
                Close
              </button>
              <button
                onClick={handleDownloadQr}
                className="flex-1 py-2 rounded-xl bg-gray-900 text-sm font-medium text-white hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
