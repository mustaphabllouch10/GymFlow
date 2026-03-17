import CheckIn from "./checkin";
import GenerateQR from "./QRcodeGenerator";

export default function Attendance() {
  return (
    <div>
      <h1>Attendance</h1>
      <CheckIn />
      <h1>generate QR Code</h1>
    <GenerateQR />
    </div>
  );
}

