import Camera from "./camera";
import { useState } from "react";
import PostCheckin from "./PostCheckin";
import { useEffect } from "react";

export default function QrScanner() {
    const [scannedText, setScannedText] = useState(null);
    const [state, setState] = useState(null);

    useEffect(() => {
    if (scannedText) {
        console.log("Updated scannedText:", scannedText);
    }
}, [scannedText]);

    return (
        <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto px-4">

            {/* Mode toggle */}
            <div className="flex gap-2">
                <button
                    onClick={() => { setScannedText(null); setState("checkin"); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${
                        state === "checkin"
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                    Check in
                </button>
                <button
                    onClick={() => { setScannedText(null); setState("checkout"); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${
                        state === "checkout"
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Check out
                </button>
            </div>

            {/* Scanner area */}
            <div className={`w-full rounded-xl border-2 overflow-hidden transition-all ${
                state ? "border-black" : "border-dashed border-gray-200"
            }`}>
                {state ? (
                    <Camera
                        onScanSuccess={(decodedText) => {
                            
                            setScannedText(decodedText);
                            console.log("Scanned:", scannedText);

                        }}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-72 gap-3 bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3z"/><path d="M17 17h4"/><path d="M17 21v-4"/></svg>
                        <p className="text-sm text-gray-400">Select a mode to activate the camera</p>
                    </div>
                )}
            </div>
            <PostCheckin scannedText={scannedText} state={state}  />

            {/* Result */}
            {scannedText && (
                <div className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <div>
                        <p className="text-xs text-gray-400 mb-0.5">Scanned result</p>
                        <p className="text-sm font-medium text-gray-900">{scannedText}</p>
                    </div>
                    <button
                        onClick={() => setScannedText(null)}
                        className="ml-auto text-gray-300 hover:text-gray-500 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
            )}
        
        </div>
    );
}