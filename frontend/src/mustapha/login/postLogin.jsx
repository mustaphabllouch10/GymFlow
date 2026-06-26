import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function PostLogin({ loginData , setHandleLogin, setIsLoggedIn, setLoading , setResponseMessage }) {

        const navigate = useNavigate();
        
        const checkLoginStatus = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/login" , loginData );
                    setResponseMessage(response.data.message);


                if (response.status === 200) {
                    
                    const token = response.data.access_token;
                    localStorage.setItem("token", token);
                    
                    console.log("Login successful:", response.data);
                    setIsLoggedIn(true);
                     
                    navigate("/dashboard"); 
                     
                }

            } catch (error) {
                console.error("Error checking login status:", error);
            } finally {
                setLoading(false)
                setHandleLogin(false) 
            }
        };


            checkLoginStatus();
        

        
    
        
}