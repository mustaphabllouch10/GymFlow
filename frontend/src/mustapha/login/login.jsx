import {useState} from "react";
import PostLogin from "./postLogin";

export default function Login() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [handleLogin, setHandleLogin] = useState(false);

    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        />
                    </div>
                    <button type="submit"
                     className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                     onClick={() => {
                        setHandleLogin(true)}}
                     >Login</button>
                </form>
            </div>

            {handleLogin && 
            <PostLogin loginData={loginData} setHandleLogin={setHandleLogin} />
            }
        </div>
    );
}