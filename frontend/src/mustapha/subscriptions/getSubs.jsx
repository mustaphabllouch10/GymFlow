import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GetSubs({ subscriptions, setSubscriptions , setIsLoading }) {

    useEffect(() => {
        const fetchSubscriptions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/api/subscriptions' ,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                setSubscriptions(response.data);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubscriptions();
        console.log('Subscriptions fetched:', subscriptions);
    }, []);

    return null ;
}