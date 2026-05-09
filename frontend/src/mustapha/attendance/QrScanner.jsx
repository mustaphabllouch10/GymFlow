import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner({ onScanSuccess }) {

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 40,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log("Scanned:", decodedText);

        onScanSuccess(decodedText);

        scanner.clear(); 
      },
      (error) => {
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return <div id="qr-reader" style={{ width: "300px" }} />;
}