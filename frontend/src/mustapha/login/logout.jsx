import PostLogout from "./postLogout";
import LogoutPopUp from "./logoutPopUp";
import { useState } from "react";


export default function Logout({ setIsLoggedIn , setLogoutLoading }) {

    const [ confirmLogout, setConfirmLogout ] = useState(false);

    

    return (
        <div>
            {confirmLogout ? (
                <PostLogout setIsLoggedIn={setIsLoggedIn} setLogoutLoading={setLogoutLoading} />
            ) : (
                <LogoutPopUp confirmLogout={confirmLogout} setConfirmLogout={setConfirmLogout} />
            )}
        </div>
    )
}