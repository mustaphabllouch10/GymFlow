import { useEffect } from "react";
import axios from "axios";

export default function Fetching({ setMembers, searchTerm, setIsLoading }) {
    useEffect(() => {
        setIsLoading(true);

        axios.get("http://localhost:8000/api/members?search=" + searchTerm,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then(response => {
                setMembers(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching members data:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [searchTerm, setMembers, setIsLoading]);
}


