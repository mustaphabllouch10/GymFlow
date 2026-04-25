import "./topbar.css";

export default function TopBar({ currentPath }) {

    const path = currentPath;
    const label = path.replace("/", "").charAt(0).toUpperCase() + path.slice(2);

    return(
        <div className="topbar">
            <h2>{label}</h2>
        </div>
    )
}

// there is a lot to add to this component,
//  but for now it will just display the name of the active section. I will add more functionality to it later,
//  such as a search bar, notifications, and user profile.
