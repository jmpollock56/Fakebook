import React, { useEffect, useState } from "react";
import "../styles/comment.css";
import { BiLogIn } from "react-icons/bi";

export default function Comment({ comment }) {
  const [commentAge, setCommentAge] = useState("");
  
  useEffect(() => {
      let now = new Date();
      let commentDate = new Date(comment.comment_create_date);
      let timeDiff = now.getTime() - commentDate.getTime();
      let daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      let hoursDiff = Math.floor(timeDiff / (1000 * 3600));
      let minutesDiff = Math.floor(timeDiff / (1000 * 60));


      if (daysDiff > 0) {
        let age = `${daysDiff}d`;
        setCommentAge(age);
      } else if (hoursDiff > 0) {
          let age = `${hoursDiff}h`;
          setCommentAge(age);
      } else {
          let age = `${minutesDiff}m`;
          setCommentAge(age);
      }
    
  },[]);

  
  return (
    <div className="comment-container">
      <div className="comment-upper-container">
        <img src={(comment.user_pfp) ? comment.user_pfp : "/profile_pictures/default_pfp.png"} alt="pfp" className="pfp" />
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