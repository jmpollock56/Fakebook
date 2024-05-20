import React from "react";

export default function CreatePost({ handlePostCreation, user}){
  
 

  return (
    <div className="flex flex-col h-20 justify-center bg-white box-content p-6 rounded-md shadow-md"> 
      <div className="flex flex-row items-center justify-evenly w-full mb-5">
        <img className="size-8 rounded-full" src={(user.pfp) ? user.pfp : "/profile_pictures/default_pfp.png"}/>
        <input className="w-[90%] rounded-full box-content p-2 bg-[#dfe3ee]" type="text" placeholder={`What's on your mind, ${user.first_name}?`} onClick={handlePostCreation}/>
      </div>
      
      <hr />
      
      <div className="flex flex-row justify-around mt-3">
        <div className="w-1/3 text-center cursor-pointer hover:bg-[#dfe3ee] box-content p-1 rounded-md">Live Video</div>
        <div className="w-1/3 text-center cursor-pointer hover:bg-[#dfe3ee] box-content p-1 rounded-md">Photo/video</div>
        <div className="w-1/3 text-center cursor-pointer hover:bg-[#dfe3ee] box-content p-1 rounded-md">Feeling/activity</div>
      </div>
      
    </div>
  );
}