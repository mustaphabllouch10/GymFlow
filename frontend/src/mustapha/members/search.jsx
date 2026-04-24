

export default function Search({ searchTerm, setSearchTerm }) {
    

    return(
        <div className="search">
            <input 
                type="text" 
                placeholder="Search ..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}