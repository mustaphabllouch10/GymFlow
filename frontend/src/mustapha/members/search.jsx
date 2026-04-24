

export default function Search({ searchTerm, setSearchTerm }) {
    return ( 
        <div className="relative w-2/3 max-w-xs ml-12 mt-4 mb-0"> 
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"> 
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"> 
                    <circle cx="11" cy="11" r="8" /> 
                    <line x1="21" y1="21" x2="16.65" y2="16.65" /> 
                </svg> 
            </span> 
            <input 
                type="text" 
                placeholder="Search ..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-[#111111] shadow-sm transition placeholder-gray-400" 
            /> 
        </div> 
    ); 
}