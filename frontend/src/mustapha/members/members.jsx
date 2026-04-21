import {useState} from "react";
import Fetching from "./fetching";
import "./members.css";
import { useEffect } from "react";
import AddMember from "./addMember";

export default function Members() {

    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    



    return(
        <div className="members">
          <AddMember />


            <Fetching setMembers={setMembers}/>

            <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Member</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Join Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="member-cell">
              <span class="member-name">John Doe</span>
            </div>
          </td>
          <td>+1234567890</td>
          <td><span class="badge badge-active">Active</span></td>
          <td>2025-01-15</td>
          <td class="actions">
            <button class="delete-btn" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div class="member-cell">
              <span class="member-name">Jane Smith</span>
            </div>
          </td>
          <td>+0987654321</td>
          <td><span class="badge badge-expired">Expired</span></td>
          <td>2025-02-20</td>
          <td class="actions">
            <button class="delete-btn" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
            
        </div>
    )


}