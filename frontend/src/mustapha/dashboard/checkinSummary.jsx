import { useState, useEffect } from "react";
import axios from "axios";

export default function CheckinSummary() {

    const [checkinSummary, setCheckinSummary] = useState();

    useEffect(() => {
        const fetchCheckinSummary = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dashboard/checkin-summary' ,
                    {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
                );
                setCheckinSummary(response.data);
                
            } catch (error) {
                console.error('Error fetching check-in summary:', error);
            }
        };

        fetchCheckinSummary();
    }, []);


    return (
        <div>
            <h2>last five check-ins</h2>
            {checkinSummary?.map((checkin) => (
                <p key={checkin.id}>Member: {checkin.member_name}, Check-in Time: {checkin.check_in_time}, Check-out Time: {checkin.check_out_time}</p>
            ))}
        </div>
    );

}