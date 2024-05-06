import React from "react";
import "../styles/ProfileHoverPopUp.css";

export default function ProfileHoverPopUp(){
  return (
    <div className="pop-up-container">
      <div className="top-id-container">
        <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="friend-photo"/>
        <div className="user-name">User name</div>
      </div>
    </div>
  );
}