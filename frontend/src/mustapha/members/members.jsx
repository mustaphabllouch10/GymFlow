import {useState} from "react";
import Fetching from "./fetching";
import { useEffect } from "react";
import AddMember from "./addMember";
import Table from "../components/table";

export default function Members() {

    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    



    return(
        <div className="members">
          <AddMember />
          <Table members={members} searchTerm={searchTerm} />


            <Fetching setMembers={setMembers}/>


            </div>
            
    )


}