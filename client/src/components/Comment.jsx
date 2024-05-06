import React, { useEffect, useState } from "react";
import "../styles/comment.css";
import { BiLogIn } from "react-icons/bi";

export default function Comment({ comment }) {
  const [commentAge, setCommentAge] = useState("");

  useEffect(() => {
    const now = new Date();
    const commentDate = new Date(comment.comment_create_date);
    let timeDiff = now.getTime() - commentDate.getTime();
    let daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    if(daysDiff > 0){
      let age = `${daysDiff}d`;
      setCommentAge(age);
    } else if((now.getHours() - commentDate.getHours()) < 1){
      let age = `${now.getMinutes() - commentDate.getMinutes()}m`
      setCommentAge(age);
    } else {
      let age = `${now.getHours() - commentDate.getHours()}h`;
      setCommentAge(age);
    }
    
  });

  
  return (
    <div className="comment-container">
      <div className="comment-upper-container">
        <img src="https://i.stack.imgur.com/l60Hf.png" alt="pfp" className="pfp" />
        <div className="comment-main-container">
          <div className="comment-user-name"><b>{comment.user_name}</b></div>
          <div className="comment-content">{comment.comment_content}</div>
        </div>
      </div>

      <div className="comment-lower-container">
        <div className="comment-age">{commentAge}</div>
        <button className="like-btn">Like</button>
        <button className="reply-btn">Reply</button>
      </div>
    </div>
  );
}