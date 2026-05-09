import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function Camera({ onScanSuccess }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    const startScanner = async () => {
      const el = document.getElementById("qr-reader");
      if (!el) return;

      try {
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        const devices = await Html5Qrcode.getCameras();
        if (!devices || devices.length === 0) return;

        const cameraId = devices[devices.length - 1].id;

        await scanner.start(
          cameraId,
          {
            fps: 30,
            qrbox: { width: 250, height: 250 },
          },
          async (decodedText) => {
            try {
              await scanner.stop();
              scannerRef.current = null;
            } catch (e) {}
            onScanSuccess(decodedText);
          },
          () => {}
        );
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    const timeout = setTimeout(startScanner, 100);

    return () => {
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
        #qr-reader__dashboard { display: none !important; }
        #qr-reader__status_span { display: none !important; }
        #qr-reader video { width: 100% !important; height: 320px !important; object-fit: cover !important; }
        #qr-reader__scan_region { border: none !important; }
        #qr-reader__scan_region img { display: none !important; }
      `}</style>
    </div>
  );
}