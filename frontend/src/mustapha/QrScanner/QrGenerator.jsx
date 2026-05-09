import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QrGenerator() {
    const [text, setText] = useState("");
    const [qrUrl, setQrUrl] = useState(null);
    const debounceRef = useRef(null);

    useEffect(() => {
        if (!text.trim()) {
            setQrUrl(null);
            return;
        }

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            try {
                const url = await QRCode.toDataURL(text, {
                    width: 280,
                    margin: 2,
                    color: { dark: "#000000", light: "#ffffff" },
                });
                setQrUrl(url);
            } catch (err) {
                console.error("QR generation error:", err);
            }
        }, 300);

        return () => clearTimeout(debounceRef.current);
    }, [text]);

    const handleDownload = () => {
        if (!qrUrl) return;
        const a = document.createElement("a");
        a.href = qrUrl;
        a.download = "qrcode.png";
        a.click();
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-lg mx-auto px-4">

            {/* Input */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-500">Text or URL</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text or URL to generate a QR code…"
                    rows={3}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-gray-400 transition-colors resize-none"
                />
            </div>

            {/* QR preview */}
            <div className={`w-full rounded-xl border-2 transition-all flex items-center justify-center ${
                qrUrl ? "border-black p-6" : "border-dashed border-gray-200"
            }`}>
                {qrUrl ? (
                    <img src={qrUrl} alt="Generated QR code" className="w-48 h-48" />
                ) : (
                    <div className="flex flex-col items-center justify-center h-48 gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3z"/><path d="M17 17h4"/><path d="M17 21v-4"/></svg>
                        <p className="text-sm text-gray-400">Your QR code will appear here</p>
                    </div>
                )}
            </div>

            {/* Download */}
            <button
                onClick={handleDownload}
                disabled={!qrUrl}
                className="flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-black text-white border-black hover:bg-gray-800"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download QR code
            </button>

        </div>
    );
}
