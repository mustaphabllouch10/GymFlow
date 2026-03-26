import "./sidebar.css"
import { FiUser } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";



export default function SidebarFooter() {

    return(
        <div className="sidebar-footer">
            <div className="user">

                <FiUser className="user-icon"/>
                <div className="user-info">
                    <p className="user-name">John Doe</p>
                    <p className="user-role">Admin</p>
                </div>

            </div>

            <div className="logout">
                <button className="logout-button">
                    <span>
                        <LuLogOut className="logout-icon" />
                    </span>
                    <span className="logout-text">Logout</span>
                </button>

            </div>
        </div>
              
    )
}