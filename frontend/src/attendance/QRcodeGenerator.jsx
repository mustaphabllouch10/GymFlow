import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function GenerateQR() {
  const [text, setText] = useState("");

  const downloadQR = () => {
  const canvas = document.querySelector("canvas");
  const url = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = url;
  link.download = "qr-code.png";
  link.click();
};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>QR Code Generator</h2>

      <input
        type="text"
        placeholder="Enter text or ID"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <QRCodeCanvas value={text || "empty"} size={200} />
        <button onClick={downloadQR}>Download QR Code</button>
      </div>
    </div>
  );
}