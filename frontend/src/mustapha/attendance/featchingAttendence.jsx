import { useEffect } from "react";
import axios from "axios";

export default function FetchingAttendence({ setAttendanceData, filters }) {
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.member)   params.append("member",    filters.member);
    if (filters.dateFrom) params.append("date_from", filters.dateFrom);
    if (filters.dateTo)   params.append("date_to",   filters.dateTo);
    if (filters.status)   params.append("status",    filters.status);

    axios
      .get(`http://localhost:8000/api/attendance?${params.toString()}` , 
    {
      headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
    }}
    )
      .then((response) => {
        setAttendanceData(response.data.data || response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, [filters]);

  return null;
}