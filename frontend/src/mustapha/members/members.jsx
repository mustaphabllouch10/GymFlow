import {useState} from "react";
import Fetching from "./fetching";
import { useEffect } from "react";
import Table from "./table";
import AddMember from "./addMember";
import Search from "./search";
import Export from "./export";
import Member from "./selectedMember/member";

export default function Members() {

    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMember, setSelectedMember] = useState(null);

    



    return(
        (selectedMember) ? (
            <Member member={selectedMember} setSelectedMember={setSelectedMember} />
        ) : (
            <div className="members">

          <div className="flex items-center justify-between gap-4 mb-6 w-full">
            <div className="flex-1">
              <Search searchTerm={searchTerm}  setSearchTerm={setSearchTerm} />
            </div>
            <div>
              <Export />
            </div>
            <div>
              <AddMember />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow mx-4 my-8 md:mx-12 md:my-12 w-auto max-w-full overflow-auto" style={{ maxHeight: '100vh' }}>
            <Table members={members} searchTerm={searchTerm} setSelectedMember={setSelectedMember} />
          </div>

          <Fetching setMembers={setMembers} searchTerm={searchTerm} />
        </div>) 
    )
}