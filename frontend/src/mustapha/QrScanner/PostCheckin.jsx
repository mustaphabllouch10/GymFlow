import { useEffect } from "react";
import axios from "axios";

export default function PostCheckin({ state, scannedText }) {

    useEffect(() => {
        if (!scannedText || !state) return;

        if (state === "checkin") {
            axios.post("http://localhost:8000/api/checkin", {
                member_id: scannedText,
            });

            console.log("Checked in member ID:", scannedText);
        }

        if (state === "checkout") {
            axios.post("http://localhost:8000/api/checkout", {
                member_id: scannedText,
            });

            console.log("Checked out member ID:", scannedText);
        }

    }, [scannedText, state]);

    return (
        <div>
        </div>
    );
}