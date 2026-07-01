import { useState , useEffect} from "react";
import axios from "axios";
import Sidebar from "./mustapha/sidebar/sidebar";
import TopBar from "./mustapha/topbar/topbar";
import Members from "./mustapha/members/members";
import Member from "./mustapha/members/selectedMember/member";
import Attendance from "./mustapha/attendance/attendance";
import QrScanner from "./mustapha/QrScanner/Qrscanner";
import Login from "./mustapha/login/login";
import Logout from "./mustapha/login/logout";
import Dashboard from "./mustapha/dashboard/dashboard";
import Subscriptions from "./mustapha/subscriptions/subscriptions";
import { Routes, Route , Navigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { PiUsersThreeBold } from "react-icons/pi";
import { BiLayer } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineCreditCard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BsWallet2 } from "react-icons/bs";
import { LuScanLine } from "react-icons/lu";
import { useLocation } from "react-router-dom";




export default function App() {

  const [isloggedIn, setIsLoggedIn] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {

      if (localStorage.getItem("token")){ 
      setIsLoggedIn(true);

  } else {

      setIsLoggedIn(false);

  }
 }, [isloggedIn]);




  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const getUser = async () => {
          try {
              setLoginLoading(true);
              const { data } = await axios.get(
                  "http://localhost:8000/api/role",
                  {
                      headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`, 
                      },
                  }
              ); 

              setUserData(data);

          } catch (error) {
              console.error("Error occurred during getting user:", error);
          } finally {
              setLoginLoading(false);
          }
      };

      getUser();
}, [isloggedIn]);


  // things i need to add : an error page , and an anothorization page 

  const userRole = userData?.user?.role || null;
  let navItems = [];
  if(userRole === "admin"){

    navItems = [
            { id: "dashboard",     label: "Dashboard", sectionComponents: <Dashboard />, icon: <RiDashboardLine size={20} /> },
            { id: "members",       label: "Members", sectionComponents: <Members />, icon: <PiUsersThreeBold size={20} /> },
            { id: "subscriptions", label: "Subscriptions", sectionComponents: <Subscriptions />, icon: <MdOutlineCreditCard size={20} /> },
            { id: "plans",      label: "plans", sectionComponents: "", icon: <BiLayer size={20} /> },
            { id: "attendance",    label: "Attendance", sectionComponents: <Attendance />, icon: <IoCalendarClearOutline size={20} /> },
            { id: "checkin",    label: "Check In", sectionComponents: <QrScanner />, icon: <LuScanLine size={20} /> },
            { id: "employees",    label: "Employees", sectionComponents: "", icon: <LuUsers size={20} /> },
            { id: "settings",    label: "Settings", sectionComponents: "", icon: <IoSettingsOutline size={20} /> },
    ]; 

  }else if (userRole === "user"){

    navItems = [
            { id: "members",       label: "Members", sectionComponents: <Members />, icon: <PiUsersThreeBold size={20} /> },
            { id: "subscriptions", label: "Subscriptions", sectionComponents: <Subscriptions />, icon: <MdOutlineCreditCard size={20} /> },
            { id: "attendance",    label: "Attendance", sectionComponents: <Attendance />, icon: <IoCalendarClearOutline size={20} /> },
            { id: "checkin",    label: "Check In", sectionComponents: <QrScanner />, icon: <LuScanLine size={20} /> },
            { id: "settings",    label: "Settings", sectionComponents: "", icon: <IoSettingsOutline size={20} /> },
    ];

  }

 

    const location = useLocation();
    const currentPath = location.pathname;
    console.log("Current Path:", currentPath);

  if (loginLoading || logoutLoading) {

    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl"/>
          <p className="text-sm text-gray-500">
              {loginLoading ? "Logging in..." : "Logging out..."}
        </p>
      </div>
    );
  }

  return (
    ( isloggedIn ?  
    <div className="flex h-screen">
      <div className="w-[270px]">
          <Sidebar currentPath={currentPath} navItems={navItems}  userData={userData} />
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
              <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} setLogoutLoading={setLogoutLoading} />} />
              <Route path="/members/:id" element={<Member />} />
            </Routes>
          </div>
      </div>
    </div>
    : 
        <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} userRole={userRole} setLoginLoading={setLoginLoading}  />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes> )
  )
}