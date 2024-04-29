import React, { useContext, useState, useMemo } from "react";
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

  const navigateTo = useNavigate();

   

  return (
   <header className="bg-sky-500 w-full fixed box-content p-2 z-10 shadow-xl">
    <nav className="flex justify-between items-center w-[98%] mx-auto">

      <div className="flex items-center justify-evenly">
        <img className="size-8 cursor-pointer mr-2" src="./fb_logo.png" alt="..." />
        <input className="rounded-full p-1" type="text" placeholder="Search Fakebook"/>
      </div>

      <div className="flex items-center h-full w-[50%] justify-center">

        <div onClick={() => {navigateTo('/home')}} className="flex justify-center h-8 w-28 items-center hover:bg-sky-400 rounded-md cursor-pointer">
          <CiHome className="size-5"/> 
        </div>

        <div className="flex justify-center items-center h-8 w-28 hover:bg-sky-400 rounded-md cursor-pointer">
          <FaUserFriends className="size-5"/>
        </div>

        <div className="flex justify-center items-center  h-8 w-28 hover:bg-sky-400 rounded-md cursor-pointer">
          <MdOndemandVideo className="size-5"/>
        </div>

        <div className="flex justify-center items-center  h-8 w-28 hover:bg-sky-400 rounded-md cursor-pointer">
          <CiShop className="size-5"/>
        </div>

        <div className="flex justify-center items-center  h-8 w-28 hover:bg-sky-400 rounded-md cursor-pointer">
         <GrGroup className="size-5"/>
        </div>
            
      </div>

      <div className="flex items-center"> 

        <div className="flex items-center justify-center size-8 rounded-full bg-sky-400 hover:bg-sky-300 cursor-pointer">
          <CgMenuGridO className="size-5"/>
        </div>

        <div className="flex items-center justify-center size-8 rounded-full bg-sky-400 ml-2 hover:bg-sky-300 cursor-pointer">
          <BiMessageRoundedDetail className="size-5"/>
        </div>

        <div className="flex items-center justify-center size-8 rounded-full bg-sky-400 ml-2 hover:bg-sky-300 cursor-pointer">
          <FaRegBell className="w-5  h-5"/>
        </div>
        

        <div className="relative ml-2 cursor-pointer" onClick={() => {setIsDropDownMenu(!isDropDownMenu)}}>
          <img className="size-8 rounded-full" src="https://practicaltyping.com/wp-content/uploads/2019/06/Hinata.PNG.png" alt="profile" />
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