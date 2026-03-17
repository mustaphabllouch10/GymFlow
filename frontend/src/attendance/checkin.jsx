import { useEffect , useState } from "react";
import {Html5QrcodeScanner} from "html5-qrcode";
import "./checkin.css";
import { LuScanLine } from "react-icons/lu";

export default function CheckIn() {
    const [type, setType] = useState("checkin");

    const handleAction = (actionType) => {
        setType(actionType);
    }

    useEffect(() => {

        const Scanner = new Html5QrcodeScanner(
            "qr-reader",
             {fps: 100, qrbox: 300},
             false
            );

            Scanner.render((decodedText , decodedResult) => {
            alert(`decoded Text = ${decodedText}`);
            console.log(`decoded Result = ${decodedResult}`);
        });

    }, []);



        


  return (
    <div>
        <button
        onClick={() => handleAction("checkin")}
        style={{
          padding: "12px 25px",
          marginRight: "10px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Check In
      </button>

      <button
        onClick={() => handleAction("checkout")}
        style={{
          padding: "12px 25px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Check Out
      </button>
      <p>{type}</p>

      <LuScanLine />
      <h2>Check In</h2>
      {/* Placeholder for check-in functionality */}



      <div className="ID-checkin">
        <input type="text" placeholder="Enter Member ID" />
      </div>
      <p>enter member ID or scan QR code to register attendance.</p>
      <h2>QR Code Scanner</h2>
      <div id="qr-reader" style={{ width: "300px", margin: "auto" }} />
    </div>
  );
}


