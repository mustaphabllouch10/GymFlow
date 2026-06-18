import { useEffect, useState } from "react";
import axios from "axios";

export default function PostLogin({ loginData , setHandleLogin }) {



    // fix the state in app.jsx and this is not working yet ,
    //  i think its something in the back end , 
    
    
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                console.log("Login data:");
                await axios.get("http://localhost:8000/anctum/csrf-cookie");
                
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
    
        return (
            <div>
                <p>Logging in...</p>
            </div>
        )
}