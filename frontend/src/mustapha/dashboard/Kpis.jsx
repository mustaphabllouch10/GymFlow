import { useState, useEffect } from "react";
import axios from "axios";

export default function Kpis() {

    const [kpis, setKpis] = useState();

    useEffect(() => {
        const fetchKpis = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dashboard/summary');
                setKpis(response.data);
                console.log("KPIs data:", response.data);
                
            } catch (error) {
                console.error('Error fetching KPIs:', error);
            }
        };

        fetchKpis();
    }, []);


    return (
        <div>
            <h2>KPIs</h2>
            <p>Active Members: {kpis?.activeMembersCount}</p>
            <p>About to Expire Subscriptions: {kpis?.aboutToExpireSubscriptionsCount}</p>
            <p>Today's Attendance: {kpis?.todayAttendanceCount}</p>
            <p>Active Attendance: {kpis?.activeAttendanceCount}</p>
        </div>
    );

}