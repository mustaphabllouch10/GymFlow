import { useEffect } from "react";
import axios from "axios";


export default function Fetching({ setMembers, searchTerm }) {
    

        useEffect(() => {
        // fetch members data from the backend and set it to state
        axios.get("http://localhost:8000/api/members?search=" + searchTerm)
            .then(response => {
                setMembers(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching members data:", error);
            });

    }, [searchTerm]);



}