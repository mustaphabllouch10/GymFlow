import {useState} from "react";
import Fetching from "./fetching";
import { useEffect } from "react";
import Table from "../components/table";
import AddMember from "./addMember";
import Search from "./search";

export default function Members() {

    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    



    return(
        <div className="members">

          <div>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
                Add Member
            </button>
          </div>

          

          <Table members={members} searchTerm={searchTerm} />


            <Fetching setMembers={setMembers} searchTerm={searchTerm} />


            </div>
            
    )


}