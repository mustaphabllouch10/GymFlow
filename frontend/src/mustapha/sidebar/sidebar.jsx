import "./sidebar.css";
import GymLogo from "./gymLogo";
import SideBarNav from "./sideBarNav";
import SidebarFooter from "./sidebarFooter";


export default function Sidebar({ currentPath , navItems}) {

  return (
    <div className="sidebar">
        <GymLogo />
        <SideBarNav currentPath={currentPath} navItems={navItems} />
        <SidebarFooter />
    </div>   
    )
}