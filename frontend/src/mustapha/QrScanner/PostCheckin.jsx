import { useEffect, useRef } from "react";
import axios from "axios";

export default function PostCheckin({ state, scannedText, onSuccess }) {
  const lastScanned = useRef(null);
  const lastState   = useRef(null);

  useEffect(() => {
    if (!scannedText || !state) return;

    // Reset guard when mode switches
    if (lastState.current !== state) {
      lastScanned.current = null;
      lastState.current   = state;
    }

    // Don't re-fire for the exact same scan in the same mode
    if (lastScanned.current === scannedText) return;
    lastScanned.current = scannedText;

    // Show popup instantly — don't wait for the API
    if (onSuccess) onSuccess({ name: "Member" });

    const endpoint =
      state === "checkin"
        ? "http://localhost:8000/api/checkin"
        : "http://localhost:8000/api/checkout";

    // API call runs in background — updates popup name when it resolves
    axios
      .post(endpoint, { member_id: scannedText })
      .then((response) => {
        console.log(`${state} success:`, response.data);

        const member =
          response.data?.member ??
          response.data?.data ??
          (response.data?.name ? response.data : null);

        // Update popup with real member name if available
        if (member && onSuccess) onSuccess(member);
      })
      .catch((error) => {
        console.error(`${state} failed:`, error);
      });

  }, [scannedText, state]);

  return null;
}