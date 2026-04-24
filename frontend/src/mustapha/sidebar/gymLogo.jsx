import "./sidebar.css";
import { CgGym } from "react-icons/cg";

export default function GymLogo() {

    return(
        <div className="gym-logo">
            <CgGym size={32} className="bg-[#111111] text-white p-1 rounded-lg" />
            <h1 className="gym-name">GymFlow</h1>
        </div>  
    )
}