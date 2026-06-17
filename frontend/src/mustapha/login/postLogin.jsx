import { useEffect, useState } from "react";
import axios from "axios";

export default function PostLogin({ loginData , setHandleLogin }) {
    
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                await axios.get("sanctum/csrf-cookie");

                const response = await axios.post(
                    "http://localhost:8000/api/login" , 
                loginData , 
                {withCredentials: true}
                );

                if (response.status === 200) {
                    console.log("Login successful:", response.data);
                    setHandleLogin(false);
                }

            } catch (error) {
                console.error("Error checking login status:", error);
            }
        }}, []);
    

}