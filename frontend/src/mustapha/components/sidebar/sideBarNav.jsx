import { useState } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineCreditCard } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";
import { LuScanLine } from "react-icons/lu";
import "./sidebar.css";

export default function SideBarNav() {

    const [activeItem, setActiveItem] = useState("dashboard");

        const navItems = [
  { id: "dashboard",     label: "Dashboard",     icon: <RiDashboardLine size={20} /> },
  { id: "members",       label: "Members",        icon: <PiUsersThreeBold size={20} /> },
  { id: "subscriptions", label: "Subscriptions",  icon: <MdOutlineCreditCard size={20} /> },
  { id: "payments",      label: "Payments",       icon: <BsWallet2 size={20} /> },
  { id: "attendance",    label: "Attendance",     icon: <LuScanLine size={20} /> },
    ];

    return (
        <nav className="sidebar-nav">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`sidebar__item ${activeItem === item.id ? "sidebar__item--active" : ""}`}
                    onClick={() => setActiveItem(item.id)}>

                    <span className="sidebar__icon">{item.icon}</span>
                    <span className="sidebar__label">{item.label}</span>

                </button>
            ))}
        </nav>
    );
}