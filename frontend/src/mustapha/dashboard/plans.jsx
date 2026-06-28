import { useState, useEffect } from "react";
import axios from "axios";

export default function Plans() {

    const [plans, setPlans] = useState();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dashboard/plans' , 
                    {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
                );
                setPlans(response.data);
                
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlans();
    }, []);


    return (
        <div>
            <h2>Plans</h2>
            {plans?.map((plan) => (
                <p key={plan.type}>{plan.type}: {plan.count}</p>
            ))}
        </div>
    );

}