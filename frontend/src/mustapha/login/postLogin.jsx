import { useEffect, useState } from "react";
import axios from "axios";



export default function PostLogin({ loginData , setHandleLogin, setIsLoggedIn }) {
        
        const checkLoginStatus = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/login" , loginData );

                if (response.status === 200) {

                    const token = response.data.access_token;
                    localStorage.setItem("token", token);
                    
                    console.log("Login successful:", response.data);
                    setIsLoggedIn(true);
                    setHandleLogin(false);  
                     
                }

            } catch (error) {
                console.error("Error checking login status:", error);
            }
        };


            checkLoginStatus();
        

        
    
        
}