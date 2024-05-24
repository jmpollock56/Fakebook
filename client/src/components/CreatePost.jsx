import React from "react";
import "../styles/CreatePost.css";

export default function CreatePost({ handlePostCreation, user}){
  
 

  return (
    <div className="create-post-container"> 
      <div className="create-post-top">
        <img src={(user.pfp) ? user.pfp : "/profile_pictures/default_pfp.png"}/>
        <input type="text" placeholder={`What's on your mind, ${user.first_name}?`} onClick={handlePostCreation}/>
      </div>
      
      <hr />
      
      <div className="create-post-bottom">
        <div className="create-post-option">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png" alt="" />
          <div>Live Video</div>
        </div>
        <div className="create-post-option">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" alt="" />
          <div>Photo/video</div>
        </div>
        <div className="create-post-option">
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png" alt="" />
          <div>Feeling/activity</div>
        </div>
      </div>
      
    </div>
  );
}