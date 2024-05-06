import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FriendProfileDisplay.css";

export default function FriendProfileDisplay({ friend, setSelectedUser, toFriendProfile }){
  
 
  return(
    <div className="friend-container" onClick={toFriendProfile}>
      <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="friend-photo"/>
      <div className="friend-name">{friend.name}</div>
    </div>
  );
}