import { useState } from "react";
import Fetching from "./fetching";
import Table from "./table";
import AddMember from "./addMember";
import Search from "./search";
import Export from "./export";

export default function Members() {

    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddMember, setShowAddMember] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    



    return(
            <div className="members">

          <div className="flex items-center justify-between gap-4 mb-6 w-full">
            <div className="flex-1">
              <Search searchTerm={searchTerm}  setSearchTerm={setSearchTerm} />
            </div>
            <div>
              <Export />
            </div>
            <div>
            <button
            className="flex items-center gap-2 px-4 py-2 mr-12 mt-4 mb-0 rounded-lg bg-[#111111] text-white font-semibold shadow hover:bg-[#23272f] transition-colors duration-150 "
            onClick={() => setShowAddMember(true)}
              >
                <span>Add Member</span>
           </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow mx-4 my-8 md:mx-12 md:my-12 w-auto max-w-full overflow-auto" style={{ maxHeight: '100vh' }}>
            <Table members={members} searchTerm={searchTerm} isLoading={isLoading} />
          </div>

          <Fetching setMembers={setMembers} searchTerm={searchTerm} setIsLoading={setIsLoading} />
          {showAddMember && (<AddMember />)}
        </div>) 
    
}