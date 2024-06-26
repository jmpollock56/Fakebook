import React, { useState } from "react";
import "../styles/CreatePostPopUp.css";
import { v4 as uuidv4 } from "uuid";

export default function CreatePostPopUp({ close, user, updatePosts }) {

  const [postContent, setPostContent] = useState("");
  let post_id = uuidv4();

  function handlePostCreation(e){
    e.preventDefault();
    const newPost = {post_id: post_id, content: postContent, user_id: user.user_id};
    updatePosts(newPost);
    close();
  }

 
  
  return (
    <div className="background">
      <div className="pop-up-container">
        <div className="top">
          <div className="pop-up-title"><b>Create post</b></div>
          <button className="close-popup" onClick={close}>X</button>
        </div>

        <div className="profile">
          <img className="size-8 rounded-full mr-1" src={(user.pfp) ? user.pfp : "/profile_pictures/default_pfp.png"} alt="profile" />
          <div className="profile-name">{`${user.first_name} ${user.last_name}`}</div>
        </div>

        <form onSubmit={handlePostCreation} method="post" className="post-form">
          <textarea onChange={(e) =>{setPostContent(e.target.value)}} name="post" value={postContent} cols="30" rows="10" className="post-content-area" placeholder="What's on your mind?" autoFocus></textarea>
          <input type="submit" value="Post" className="submit-post"/>
        </form>
      </div>
    </div>

  );
}