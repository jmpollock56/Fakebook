import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { IoSettingsSharp } from "react-icons/io5";
import { FaCircleQuestion } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { BiSolidMoon } from "react-icons/bi";
import { IoLogOutSharp } from "react-icons/io5";

import "../styles/ProfileIconDropdown.css";

export default function ProfileIconDropdown(){

  const navigateTo = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchCurrentUser = () => {
      const loggedInUser = localStorage.getItem('currentUser');
      
      if(loggedInUser !== null){
        const foundUser = JSON.parse(loggedInUser);
        setCurrentUser(foundUser);
      } else {
        console.log("loggedInUser in null!!!!");
      }
    }
    fetchCurrentUser();
  },[]);

  function logOut(){
    localStorage.clear();
    navigateTo('/');
  }


  return (
    <div className="drop-down-container">

      <div className="main-profile" onClick={()=>{navigateTo(`/user/${currentUser.user_id}`)}}>
        <img className="size-8 rounded-full mr-2" src={(currentUser.pfp) ? currentUser.pfp : "/profile_pictures/default_pfp.png"} alt="profile" />
        <div className="profile-name">{`${currentUser.first_name} ${currentUser.last_name}`}</div>
      </div>

      <hr />

      <div className="drop-down-options">

        <div className="settings-container">
          <div className="settings-left">
            <IoSettingsSharp className="settings-icon"/>
            <div className="settings-text">Settings & privacy</div>
          </div>
         
          <IoIosArrowForward />
        </div>

        <div className="settings-container">
          <div className="settings-left">
            <FaCircleQuestion className="settings-icon"/>
            <div className="settings-text">Help & support</div>
          </div>
          <IoIosArrowForward />
        </div>

        <div className="settings-container">
          <div className="settings-left">
            <BiSolidMoon className="settings-icon"/>
            <div className="settings-text">Display & accessibility</div>
          </div>
          <IoIosArrowForward />
        </div>

        <div className="settings-container">
          <div className="settings-left">
            <FaCircleQuestion className="settings-icon"/>
            <div className="settings-text">Give feedback</div>
          </div>
          
        </div>

        <div className="settings-container" onClick={logOut}>
          <div className="settings-left">
            <IoLogOutSharp className="settings-icon"/>
            <div className="settings-text">Log out</div>
          </div>
          
        </div>
      </div>
    </div>
  );
}