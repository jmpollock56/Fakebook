import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FriendPanel.css";

export default function FriendPanel({ friend, toFriendProfile, currentUser }){

  const [isCurrentFriend, setIsCurrentFriend] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() =>{
    const checkIfCurrentFriend = () => {
      currentUser.userFriends.map((userFriend) => {

        if(userFriend === friend.user_id || currentUser.user_id === friend.user_id){
          console.log(userFriend);
          setIsCurrentFriend(true);
        }
      })
    }
    checkIfCurrentFriend();
  })

  

  return (
    <div className="panel-container" onClick={() =>{ toFriendProfile(friend.user_id) }}>
      <div className="left-panel">
        <img className="friend-picture" src={(friend.user_pfp) ? friend.user_pfp : "/profile_pictures/default_pfp.png"} alt="pfp" />
        <div className="friend-left-name">{friend.name}</div>
      </div>

     
     <div className="friend-options">...</div> 
      
      
     
    </div>
  );
}