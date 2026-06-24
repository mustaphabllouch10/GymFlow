import { useState , useEffect} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import PostLogin from "./postLogin";


export default function Login({ setIsLoggedIn }) {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [handleLogin, setHandleLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
    if (handleLogin) {
        setLoading(true);
    }
    }, [handleLogin]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-2xl shadow-sm w-full max-w-md overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                    <p className="text-sm text-gray-400 mt-1">Enter your credentials to continue</p>
                </div>

                {/* Body */}
                <form
                    className="px-8 py-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setHandleLogin(true);
                    }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-xs font-semibold text-gray-400 tracking-wide uppercase mb-2"
                        >
                            Email
                        </label>
                        <div className="bg-gray-50 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gray-900/10 transition-shadow">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full bg-transparent font-mono text-sm text-gray-900 focus:outline-none placeholder:text-gray-400"
                                placeholder="you@example.com"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-xs font-semibold text-gray-400 tracking-wide uppercase mb-2"
                        >
                            Password
                        </label>
                        <div className="bg-gray-50 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gray-900/10 transition-shadow flex items-center justify-between">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full bg-transparent font-mono text-sm text-gray-900 focus:outline-none placeholder:text-gray-400"
                                placeholder="••••••••"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                            {showPassword ? (
                                <IoEyeOffOutline
                                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <IoEyeOutline className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl hover:bg-gray-800 active:bg-black transition-colors "
                    >
                        {loading ?  <AiOutlineLoading3Quarters className="animate-spin block mx-auto text-2xl" /> : "Login" }
                    </button>
                </form>
            </div>

            {handleLogin && (
                
                <PostLogin
                    setIsLoggedIn={setIsLoggedIn}
                    loginData={loginData}
                    setHandleLogin={setHandleLogin}
                    setLoading={setLoading}
                />
            )}
        </div>
    );
}