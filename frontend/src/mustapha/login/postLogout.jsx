import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostLogout({ setIsLoggedIn }) {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await axios.post("http://localhost:8000/api/logout", {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
            } catch (error) {
                console.error("Error occurred during logout:", error);
            } finally {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                navigate("/login");
            }
        };

        performLogout();
    }, [navigate, setIsLoggedIn]);

    return (
        <div>
            logging out...
        </div>
    );
}
