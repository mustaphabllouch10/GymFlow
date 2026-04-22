// import "./sidebar.css"
import { FiUser } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";




export default function SidebarFooter() {

    return(
        <div className="w-full border-t border-gray-200 shadow-[0_-1px_4px_-2px_rgba(230,228,228,0.637)] flex flex-col gap-4 mt-auto pt-8 pb-8 px-0 bg-white text-sm">
            <div className="flex items-center gap-3 px-4"> 
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300">
                    <FiUser className="text-xl text-gray-600"/>
                </span>
                <div>
                    <p className="font-semibold text-gray-800 text-sm leading-tight">John Doe</p>
                    <p className="text-xs text-gray-400 leading-tight">Admin</p>
                </div>
            </div>
            <div className="px-4">
                <button className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-sm">
                    <LuLogOut className="text-lg" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
              
    )
}