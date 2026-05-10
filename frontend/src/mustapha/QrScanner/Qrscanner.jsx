import { useState } from "react";
import Camera from "./camera";
import PostCheckin from "./PostCheckin";
import CheckInPopup from "./CheckInPopup";
import CheckOutPopup from "./CheckOutPopup";

export default function QrScanner() {
  const [scannedText, setScannedText] = useState(null);
  const [state, setState]             = useState(null);
  const [popup, setPopup]             = useState(null);

  function handleSuccess(memberData) {
    setPopup({ type: state, member: memberData });
  }

  function handleClose() {
    setPopup(null);
    setScannedText(null);
    setTimeout(() => setState(null), 50);
  }

  function selectMode(mode) {
    setScannedText(null);
    setPopup(null);
    setState(mode);
  }

  return (
    // relative so the absolute popup is scoped to this section
    <div className="relative flex items-center justify-center min-h-[calc(100vh-80px)] px-4">

      <div className="flex flex-col gap-4 w-full max-w-xl">

        {/* Mode toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => selectMode("checkin")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${
              state === "checkin"
                ? "bg-black text-white border-black"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            </svg>
            Check in
          </button>

          <button
            onClick={() => selectMode("checkout")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${
              state === "checkout"
                ? "bg-black text-white border-black"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Check out
          </button>
        </div>

        {/* Scanner area */}
        <div className={`w-full rounded-xl border-2 overflow-hidden transition-all ${
          state ? "border-black" : "border-dashed border-gray-200"
        }`}>
          {state ? (
            <Camera
              key={state}
              onScanSuccess={(decodedText) => setScannedText(decodedText)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-72 gap-3 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                <path d="M14 14h3v3h-3z"/><path d="M17 17h4"/><path d="M17 21v-4"/>
              </svg>
              <p className="text-sm text-gray-400">Select a mode to activate the camera</p>
            </div>
          )}
        </div>

        <PostCheckin
          scannedText={scannedText}
          state={state}
          onSuccess={handleSuccess}
        />

        
      </div>

      {/* Popups — absolute so they center within this section, not the full screen */}
      {popup?.type === "checkin" && (
        <CheckInPopup member={popup.member} onClose={handleClose} />
      )}
      {popup?.type === "checkout" && (
        <CheckOutPopup member={popup.member} onClose={handleClose} />
      )}
    </div>
  );
}