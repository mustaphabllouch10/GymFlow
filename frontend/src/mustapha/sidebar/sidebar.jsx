import "./sidebar.css";
import GymLogo from "./gymLogo";
import SideBarNav from "./sideBarNav";
import SidebarFooter from "./sidebarFooter";


export default function Sidebar({ activeSection, setActiveSection }) {

  return (
    <div className="sidebar">
        <GymLogo />
        <SideBarNav activeSection={activeSection} setActiveSection={setActiveSection} />
        <SidebarFooter />
    </div>   
    )
}