import axios from "axios";


export default function Export(){

    const exportMembers = async () => {
        const response = await axios.get("http://localhost:8000/api/exportMembers",
            {responseType: 'blob' }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = "members.xlsx";
        link.click();
    };
    
    return(
        <div>

            <button
                className="flex items-center gap-2 px-4 py-2 mr-2 mt-4 mb-0 rounded-lg bg-white text-black font-semibold shadow hover:bg-gray-100 transition-colors duration-150 border border-gray-300"
                onClick={exportMembers}
            >
                                {/* New Export/Download Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5m0 0l5-5m-5 5V4" />
                                </svg>
                Export
            </button>

        </div>
        
    )

}