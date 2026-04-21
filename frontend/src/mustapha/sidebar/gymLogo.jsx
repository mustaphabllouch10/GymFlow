import "./sidebar.css";
import { CgGym } from "react-icons/cg";

export default function GymLogo() {

    return(
        <div className="gym-logo">
            <CgGym className="gym-icon"/>
            <h1 className="gym-name">GymFlow</h1>
        </div>  
    )
}