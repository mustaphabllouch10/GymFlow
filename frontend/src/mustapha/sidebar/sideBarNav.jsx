import { useState } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineCreditCard } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";
import { LuScanLine } from "react-icons/lu";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function SideBarNav({ currentPath, navItems }) {




    return (
        <nav className="sidebar-nav">
            
            {navItems.map((item) => (
                <Link to={`/${item.id}`} key={item.id}>
                    <button
                        key={item.id}
                        className={`sidebar__item ${currentPath === `/${item.id}` ? "sidebar__item--active" : ""}`
                        }>

                    <span className="sidebar__icon">{item.icon}</span>
                    <span className="sidebar__label">{item.label}</span>

                </button>
                </Link>
            ))}
        </nav>
    );
}