import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { CiHome } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { GrGroup } from "react-icons/gr";
import { CgMenuGridO } from "react-icons/cg";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import ProfileIconDropdown from "../components/ProfileIconDropdown";
import '../styles/navbar.css';


export default function NavBar() {


  const [isDropDownMenu, setIsDropDownMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigateTo = useNavigate();


  useEffect(() => {
    const fetchCurrentUser = () => {

      const loggedInUser = localStorage.getItem('currentUser');

      if (loggedInUser !== null) {
        const foundUser = JSON.parse(loggedInUser);
        setCurrentUser(foundUser);
      } else {
        console.log("loggedInUser in null!!!!");
      }
    }
    fetchCurrentUser();

  }, []);


  return (
    <header className="header-container">
      <nav className="nav-container">

        <div className="left-nav">
          <img onClick={() => { navigateTo('/home') }} className="nav-logo" src="/profile_pictures/fb_logo.png" alt="..." />
          <div className="search-container">
            <img src="/search.png" alt="search-icon" className="search-icon"/>
            <input className="nav-search" type="text" placeholder="Search Fakebook" />
          </div>

        </div>

        <div className="center-nav">

          <div onClick={() => { navigateTo('/home') }} className="nav-icon">
            <CiHome className="inner-nav-icon" />
          </div>

          <div className="nav-icon">
            <FaUserFriends className="inner-nav-icon" />
          </div>

          <div className="nav-icon">
            <MdOndemandVideo className="inner-nav-icon" />
          </div>

          <div className="nav-icon">
            <CiShop className="inner-nav-icon" />
          </div>

          <div className="nav-icon">
            <GrGroup className="inner-nav-icon" />
          </div>

        </div>

        <div className="right-nav">

          <div className="right-nav-icon">
            <CgMenuGridO className="other-icons" />
          </div>

          <div className="right-nav-icon">
            <BiMessageRoundedDetail className="other-icons" />
          </div>

          <div className="right-nav-icon">
            <FaRegBell className="other-icons" />
          </div>


          <div className="profile-nav" onClick={() => { setIsDropDownMenu(!isDropDownMenu) }}>
            <img className="profile-icon" src={(currentUser.pfp) ? currentUser.pfp : "/profile_pictures/default_pfp.png"} alt="profile" />
            <div className="profile-arrow">
              <IoIosArrowDown className="h-3 w-3" />
            </div>
            {(isDropDownMenu) ? <ProfileIconDropdown className="profile-drop-down" /> : ""}
          </div>

        </div>
      </nav>
    </header>
  );
}