
// import "./App.css";
import { useState , useEffect} from "react";
import Sidebar from "./mustapha/sidebar/sidebar";
import TopBar from "./mustapha/topbar/topbar";
import Members from "./mustapha/members/members";
import Attendance from "./mustapha/attendance/attendance";
import QrScanner from "./mustapha/QrScanner/Qrscanner";
import Login from "./mustapha/login/login";
import Logout from "./mustapha/login/logout";
import { Routes, Route , Navigate } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineCreditCard } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";
import { LuScanLine } from "react-icons/lu";
import { useLocation } from "react-router-dom";




export default function App() {

  const [isloggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
  if (localStorage.getItem("token")){ 
  setIsLoggedIn(true);
  } else {
  setIsLoggedIn(false);
  }
}, []);


  // things i need to add : an error page , and an anothorization page 
  
    const navItems = [
            { id: "dashboard",     label: "Dashboard", sectionComponents: "" , icon: <RiDashboardLine size={20} /> },
            { id: "members",       label: "Members", sectionComponents: <Members />, icon: <PiUsersThreeBold size={20} /> },
            { id: "subscriptions", label: "Subscriptions", sectionComponents: "", icon: <MdOutlineCreditCard size={20} /> },
            { id: "payments",      label: "Payments", sectionComponents: "", icon: <BsWallet2 size={20} /> },
            { id: "attendance",    label: "Attendance", sectionComponents: <Attendance />, icon: <LuScanLine size={20} /> },
            { id: "checkin",    label: "Check In", sectionComponents: <QrScanner />, icon: <LuScanLine size={20} /> },
    ];  

    const location = useLocation();
    const currentPath = location.pathname;
    console.log("Current Path:", currentPath);

  return (
    ( isloggedIn ?  
    <div className="flex h-screen">
      <div className="w-[270px]">
          <Sidebar currentPath={currentPath} navItems={navItems} setIsLoggedIn={setIsLoggedIn} />
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
              <Route path="*" element={<div className="p-8 text-gray-500">Page not found.</div>} />
              <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
          </div>
      </div>
    </div>
    : 
        <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes> )
  )
}