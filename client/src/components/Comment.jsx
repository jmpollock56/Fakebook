import React, { useEffect, useState } from "react";
import "../styles/comment.css";

export default function Comment({ comment }) {
  const [commentAge, setCommentAge] = useState(0);

  useEffect(() => {
    const now = new Date();
    const commentDate = new Date(comment.comment_create_date);
    let age = now.getHours() - commentDate.getHours();
    setCommentAge(age);
  });

  console.log(commentAge);
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
        <div className="comment-age">{commentAge}h</div>
        <button className="like-btn">Like</button>
        <button className="reply-btn">Reply</button>
      </div>
    </div>
  );
}