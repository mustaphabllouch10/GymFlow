import { useState, useEffect } from "react";
import axios from "axios";

export default function SubSummary() {

    const [subSummary, setSubSummary] = useState();

    useEffect(() => {
        const fetchSubSummary = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dashboard/sub-summary' , 
                    {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
                );
                setSubSummary(response.data);
                
            } catch (error) {
                console.error('Error fetching sub summary:', error);
            }
        };

        fetchSubSummary();
    }, []);


    return (
        <div>
            <h2>subs about to expire</h2>
            {subSummary?.map((sub) => (
                <p key={sub.id}>Member: {sub.end_date}, Check-in Time: {sub.type}, Check-out Time: {sub.price}</p>
            ))}
        </div>
    );

}