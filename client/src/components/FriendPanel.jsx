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
        <img className="friend-picture" src="https://i.stack.imgur.com/l60Hf.png" alt="pfp" />
        <div className="friend-left-name">{friend.name}</div>
      </div>

     
     <div className="friend-options">...</div> 
      
      
     
    </div>
  );
}