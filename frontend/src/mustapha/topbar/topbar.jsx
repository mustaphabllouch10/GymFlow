import "./topbar.css";

export default function TopBar({ activeSection }) {

    return(
        <div className="topbar">
            <h2>{activeSection}</h2>
        </div>
    )
}

// there is a lot to add to this component,
//  but for now it will just display the name of the active section. I will add more functionality to it later,
//  such as a search bar, notifications, and user profile.
