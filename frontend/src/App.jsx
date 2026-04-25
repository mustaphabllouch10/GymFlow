// import "./App.css";
import { useState } from "react";
import Sidebar from "./mustapha/sidebar/sidebar"
import TopBar from "./mustapha/topbar/topbar";
import Members from "./mustapha/members/members";
import { Routes, Route } from "react-router-dom";


export default function App() {

  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="flex h-screen">
      <div className="w-[270px]">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      <div className="flex-1 bg-[#f5f5f5] flex flex-col h-screen overflow-hidden">
          <TopBar activeSection={activeSection} />
          <div className="flex-1 overflow-auto">
            {/* Routes : */}
            <Routes>
              <Route path="/members" element={<Members />} />
            </Routes>
          </div>
      </div>
    </div>
  )
}