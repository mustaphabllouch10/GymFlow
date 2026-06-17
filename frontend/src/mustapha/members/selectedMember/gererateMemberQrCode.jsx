import {QRCode} from "react-qr-code";

export default function GenerateQr({ id }) {
  return (
    <div>
      <QRCode value={id || ""} />
    </div>
  );
}