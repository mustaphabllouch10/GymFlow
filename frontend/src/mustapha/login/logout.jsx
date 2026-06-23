import PostLogout from "./postLogout";

export default function Logout({ setIsLoggedIn }) {
    return (
        <div>
            <PostLogout setIsLoggedIn={setIsLoggedIn} />
        </div>
    )
}