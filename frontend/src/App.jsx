
// import "./App.css";
import { useState } from "react";
import Sidebar from "./mustapha/sidebar/sidebar";
import TopBar from "./mustapha/topbar/topbar";
import Members from "./mustapha/members/members";
import { Routes, Route } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineCreditCard } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";
import { LuScanLine } from "react-icons/lu";
import { useLocation } from "react-router-dom";




export default function App() {
  
    const navItems = [
            { id: "dashboard",     label: "Dashboard", sectionComponents: "" , icon: <RiDashboardLine size={20} /> },
            { id: "members",       label: "Members", sectionComponents: <Members />, icon: <PiUsersThreeBold size={20} /> },
            { id: "subscriptions", label: "Subscriptions", sectionComponents: "", icon: <MdOutlineCreditCard size={20} /> },
            { id: "payments",      label: "Payments", sectionComponents: "", icon: <BsWallet2 size={20} /> },
            { id: "attendance",    label: "Attendance", sectionComponents: "", icon: <LuScanLine size={20} /> },
    ];

    const location = useLocation();
    const currentPath = location.pathname;
    console.log("Current Path:", currentPath);

  return (
    <div className="flex h-screen">
      <div className="w-[270px]">
          <Sidebar currentPath={currentPath} navItems={navItems} />
      </div>

      <div className="flex-1 bg-[#f5f5f5] flex flex-col h-screen overflow-hidden">
          <TopBar currentPath={currentPath} />
          <div className="flex-1 overflow-auto">
            {/* Routes : */}
            <Routes>
              {navItems.map((item) => (
                <Route
                  key={item.id}
                  path={`/${item.id}`}
                  element={item.sectionComponents || <div className="p-8 text-gray-500">{item.label} page coming soon.</div>}
                />
              ))}
            </Routes>
          </div>
      </div>
    </div>
  )
}