import React, { useState } from "react";
import FriendPanel from "./FriendPanel";
import "../styles/ProfileFriendsTab.css";
import { useSearchParams } from "react-router-dom";

export default function ProfileFriendsTab({ friends, toFriendProfile, currentUser }) {


  return (
    <div className="bottom-profile-container">
      <div className="friend-tab-container">
        <h2>Friends</h2>
        <div className="friends-main-container">
          {friends.map((friend, i) => {
            return <FriendPanel key={i} friend={friend} toFriendProfile={toFriendProfile} currentUser={currentUser} />
          })}
        </div>
      </div>
    </div>

  );
}