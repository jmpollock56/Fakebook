import React, { useContext, useEffect, useState, useMemo } from "react";
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
   <header className="bg-white h-10 w-full fixed box-content p-2 z-10 shadow-xl">
    <nav className="flex justify-between items-center w-[98%] h-[100%] mx-auto">

      <div className="flex items-center justify-evenly">
        <img onClick={() => {navigateTo('/home')}}  className="size-10 cursor-pointer mr-2" src="/profile_pictures/fb_logo.png" alt="..." />
        <input className="rounded-full p-1 bg-[#dfe3ee] pl-5" type="text" placeholder="Search Fakebook"/>
      </div>

      <div className="flex items-center h-full w-[50%] justify-center">

        <div onClick={() => {navigateTo('/home')}} className="flex justify-center h-9 w-28 items-center hover:bg-[#dfe3ee] rounded-md cursor-pointer">
          <CiHome className="size-6"/> 
        </div>

        <div className="flex justify-center items-center h-9 w-28 hover:bg-[#dfe3ee] rounded-md cursor-pointer">
          <FaUserFriends className="size-6"/>
        </div>

        <div className="flex justify-center items-center  h-9 w-28 hover:bg-[#dfe3ee] rounded-md cursor-pointer">
          <MdOndemandVideo className="size-6"/>
        </div>

        <div className="flex justify-center items-center  h-9 w-28 hover:bg-[#dfe3ee] rounded-md cursor-pointer">
          <CiShop className="size-6"/>
        </div>

        <div className="flex justify-center items-center  h-9 w-28 hover:bg-[#dfe3ee] rounded-md cursor-pointer">
         <GrGroup className="size-5"/>
        </div>
            
      </div>

      <div className="flex items-center"> 

        <div className="flex items-center justify-center size-10 rounded-full bg-[#dfe3ee] hover:bg-[#cdd5ec] cursor-pointer">
          <CgMenuGridO className="size-7"/>
        </div>

        <div className="flex items-center justify-center size-10 rounded-full bg-[#dfe3ee] ml-2 hover:bg-[#cdd5ec] cursor-pointer">
          <BiMessageRoundedDetail className="size-7"/>
        </div>

        <div className="flex items-center justify-center size-10 rounded-full bg-[#dfe3ee] ml-2 hover:bg-[#cdd5ec] cursor-pointer">
          <FaRegBell className="size-7"/>
        </div>
        

        <div className="relative ml-2 cursor-pointer" onClick={() => {setIsDropDownMenu(!isDropDownMenu)}}>
          <img className="size-10 rounded-full" src={(currentUser.pfp) ? currentUser.pfp : "/profile_pictures/default_pfp.png"} alt="profile" />
          <div className="absolute bottom-0 right-0 rounded-full bg-white">
            <IoIosArrowDown className="h-3 w-3"/>
          </div>
          {(isDropDownMenu) ? <ProfileIconDropdown className="profile-drop-down"/> : ""}
        </div>

      </div>
    </nav>
   </header>
  );
}