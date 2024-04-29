import React from "react";
import "../styles/FriendProfileDisplay.css";

export default function FriendProfileDisplay(){
  return(
    <div className="friend-container">
      <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="friend-photo"/>
      <div className="friend-name">Friend Name</div>
    </div>
  );
}