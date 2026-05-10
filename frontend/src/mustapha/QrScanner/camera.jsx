import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function Camera({ onScanSuccess }) {
  const scannerRef = useRef(null);
  const onScanRef  = useRef(onScanSuccess);
  const didScan    = useRef(false); // prevent double-firing

  useEffect(() => {
    onScanRef.current = onScanSuccess;
  }, [onScanSuccess]);

  useEffect(() => {
    let cancelled = false;
    didScan.current = false;

    const startScanner = async () => {
      if (cancelled) return;

      // If a stale instance is attached to the DOM element, clear it first
      const el = document.getElementById("qr-reader");
      if (!el) return;
      el.innerHTML = "";

      try {
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        const devices = await Html5Qrcode.getCameras();
        if (!devices || devices.length === 0) {
          console.warn("No cameras found");
          return;
        }
        if (cancelled) return;

        const backCamera = devices.find((d) =>
          /back|rear|environment/i.test(d.label)
        );
        const cameraId = (backCamera || devices[devices.length - 1]).id;

        await scanner.start(
          cameraId,
          { fps: 100, qrbox: { width: 250, height: 250 } },
          async (decodedText) => {
            // Guard: only fire once per mount
            if (didScan.current) return;
            didScan.current = true;

            try { await scanner.stop(); } catch (_) {}
            scannerRef.current = null;
            onScanRef.current?.(decodedText);
          },
          () => {}
        );
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    const timeout = setTimeout(startScanner, 150);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ height: "320px", overflow: "hidden", position: "relative" }}>
      <div id="qr-reader" style={{ width: "100%", height: "100%" }} />
      <style>{`
        #qr-reader__dashboard       { display: none !important; }
        #qr-reader__status_span     { display: none !important; }
        #qr-reader video            { width: 100% !important; height: 320px !important; object-fit: cover !important; }
        #qr-reader__scan_region     { border: none !important; }
        #qr-reader__scan_region img { display: none !important; }
      `}</style>
    </div>
  );
}